import express from 'express';
//import express from "express";
import { getProfile, getUserDetails, login, removeUsers, signup } from '../controllers/userController.js';




const userRoutes = express.Router();

userRoutes.post('/signup',signup);
userRoutes.get('/me', getProfile);
userRoutes.post('/login',login);
userRoutes.post('/getUsers',getUserDetails);
userRoutes.post('/removeUsers',removeUsers)

export default userRoutes;

