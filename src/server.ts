import './config';
import { createServer } from 'http';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import routes from './constants/routes';
// import route from './constants/routes';
// import apiLogger from './middleware/api_logger';
import apiRouter from './routes/api/api';
import restRouter from './routes/rest/rest';
import webRouter from './routes/web/web';
// import { connectSocket } from './utils/helper/socketHelper';
// import { startCronJobs } from './workers/cron';

// Create an instance of express to serve our end points testing.
const app = express();
const server = createServer(app);

// connectSocket(server);

app.set('trust proxy', 1);

// Use the cors middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ type: 'application/json' }));
// app.use(apiLogger);

//Database Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL as string);
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => {
  console.info('✅ Connected To Database');
  // startCronJobs();
});

//setup view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//router
app.use(routes.home, webRouter);
app.use(routes.api, apiRouter);
app.use(routes.rest, restRouter);

server.listen(process.env.PORT, () =>
  console.info(
    `✅ ${process.env.NODE_ENV} Server Started on port:  ${process.env.PORT}`
  )
);
