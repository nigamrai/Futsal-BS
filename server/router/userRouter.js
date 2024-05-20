import express from 'express';
//import express from "express";
import { getProfile, getUserDetails, login, logout, removeUser, signup } from '../controllers/userController.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';




const userRoutes = express.Router();

userRoutes.post('/signup',signup);
userRoutes.get('/me', isLoggedIn,getProfile);
userRoutes.post('/login',login);
userRoutes.post('/getUsers',isLoggedIn,authorizedRoles(["SUPERADMIN"]),getUserDetails);
userRoutes.put('/removeUser/:userId',isLoggedIn,authorizedRoles(["SUPERADMIN"]),removeUser);
userRoutes.get('/logout',logout);

export default userRoutes;

