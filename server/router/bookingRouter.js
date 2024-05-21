import express from 'express';
import { deleteBooking, getBookings, newBooking } from '../controllers/bookingController.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
const router=express.Router();
router.post('/create',isLoggedIn,newBooking);
router.get('/getBookings',getBookings);
router.delete('/removeBooking/:bookingId',isLoggedIn,deleteBooking);
export default router;