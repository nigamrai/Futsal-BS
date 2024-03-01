import express from 'express';
//import express from "express";
import { getProfile, signup } from '../controllers/userController.js';
import upload from '../middlewares/multer.middlewares.js';



const userRoutes = express.Router();

userRoutes.post('/signup',upload.single('avatar'), signup);
userRoutes.get('/me', getProfile);

export default userRoutes;

