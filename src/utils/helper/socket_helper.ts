// import { Server } from 'socket.io';
// import user_controller from '../../controllers/user_controller';

// let io: Server;

// const connectSocket = (server: any) => {
//   io = new Server(server, {
//     cors: {
//       origin: '*',
//       methods: ['GET', 'POST'],
//     },
//   });

//   io.on('connection', (socket) => {
//     //console.log('soket connected');

//     // socket.on('disconnect', () => {
//     //   //console.log('soket disconnected');
//     // });

//     socket.on('update_table_settings', (payload) => {
//       user_controller.updateTableSetting(payload);
//       io.emit('update_table_settings', payload);
//     });
//   });
// };

// export { connectSocket, io };
