import express from 'express';
//import express from "express";
import { getProfile, login, signup } from '../controllers/userController.js';
import upload from '../middlewares/multer.middlewares.js';



const userRoutes = express.Router();

userRoutes.post('/signup',upload.single('avatar'), signup);
userRoutes.get('/me', getProfile);
userRoutes.post('/login',login);

export default userRoutes;

