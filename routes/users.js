// Importing Express and creating a router
import express from 'express';
const router = express.Router();

// Importing controllers
import { signup, login } from '../controllers/users.js';

// Define routes
router.post('/signup', signup);
router.post('/login', login);

// Export the router
export default router;
