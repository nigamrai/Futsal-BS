import express from 'express';
//import express from "express";
import { editUser, getProfile, getUserDetails, login, removeUser, signup } from '../controllers/userController.js';




const userRoutes = express.Router();

userRoutes.post('/signup',signup);
userRoutes.get('/me', getProfile);
userRoutes.post('/login',login);
userRoutes.post('/getUsers',getUserDetails);
userRoutes.delete('/removeUser/:userId',removeUser);
userRoutes.put('/edit/:userId',editUser);

export default userRoutes;

