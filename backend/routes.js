import express from 'express';
import { createProperty, getProperties, getUserProperties } from './controllers/propertyController.js';
import { register, login } from './controllers/userController.js';
import auth from './middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/properties', getProperties);
router.get('/properties/my', auth, getUserProperties);
// Protected routes
router.post('/properties', auth, createProperty);

export default router;