import express from 'express';
//import express from "express";
import { confirm, editUser, getProfile, getUserDetails, login, logout, removeUser, setPassword, signup } from '../controllers/userController.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';




const userRoutes = express.Router();

userRoutes.post('/signup',signup);
userRoutes.get('/me', isLoggedIn,getProfile);
userRoutes.post('/login',login);
userRoutes.post('/getUsers',isLoggedIn,getUserDetails);
userRoutes.delete('/removeUser/:userId',isLoggedIn,removeUser);
userRoutes.put('/edit',editUser);
userRoutes.get('/logout',logout);
userRoutes.post("/set-password",setPassword);
userRoutes.get(`/confirm/:token`,confirm);


export default userRoutes;

