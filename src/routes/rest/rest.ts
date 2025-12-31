import express from 'express';
import route from '../../constants/routes';
import v1Router from './v1';

const router = express.Router();
router.use(route.v1, v1Router);

export default router;
