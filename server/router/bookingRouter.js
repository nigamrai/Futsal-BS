import express from 'express';
import { getBookings, newBooking, removeBooking } from '../controllers/bookingController.js';
const router=express.Router();
router.post('/create',isLoggedIn,newBooking);
router.get('/getBookings',isLoggedIn,getBookings);
;
router.delete('/removeBooking/:bookingId',removeBooking);
export default router;