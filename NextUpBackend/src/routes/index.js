import express from 'express';
import authRoutes from './authRoutes.js'; // importing the auth routes
import taskRoutes from './taskRoutes.js'
import serverCheck from '../controllers/serverController.js';
const router = express.Router();

router.use('/auth', authRoutes);

router.use('/task', taskRoutes)

router.use('/server', serverCheck)


export default router;



