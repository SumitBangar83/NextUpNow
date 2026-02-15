import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
const router = express.Router();

// Registration route
router.post('/signup', registerUser);
// Login route
router.post('/signin', loginUser);

export default router;