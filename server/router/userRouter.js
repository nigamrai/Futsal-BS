import express from 'express';
//import express from "express";
import { editUser, getProfile, getUserDetails, login, logout, removeUser, signup } from '../controllers/userController.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';




const userRoutes = express.Router();

userRoutes.post('/signup',signup);
userRoutes.get('/me', isLoggedIn,getProfile);
userRoutes.post('/login',login);
userRoutes.post('/getUsers',isLoggedIn,getUserDetails);
userRoutes.delete('/removeUser/:userId',isLoggedIn,removeUser);
userRoutes.put('/edit/:userId',editUser);
userRoutes.get('/logout',logout);

export default userRoutes;

