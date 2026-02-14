import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
const router = express.Router();

// Registration route
router.post('/registerUser', registerUser);
// Login route
router.post('/loginUser', loginUser);

export default router;