import express from 'express';
import { getBookings, newBooking } from '../controllers/bookingController.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
const router=express.Router();
router.post('/create',isLoggedIn,newBooking);
router.get('/getBookings',isLoggedIn,getBookings);

export default router;