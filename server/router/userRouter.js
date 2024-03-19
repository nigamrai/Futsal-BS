import express from 'express';
//import express from "express";
import { getProfile, login, signup } from '../controllers/userController.js';




const userRoutes = express.Router();

userRoutes.post('/signup',signup);
userRoutes.get('/me', getProfile);
userRoutes.post('/login',login);

export default userRoutes;

