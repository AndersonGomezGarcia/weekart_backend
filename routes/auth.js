import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// POST /auth/login
router.post('/login', authController.login);

// POST /auth/register
router.post('/register', authController.register);

// POST /auth/logout
router.post('/logout', authController.logout);

export default router;
