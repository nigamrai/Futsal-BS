import express from 'express';
import { deleteBooking, getBookings, newBooking } from '../controllers/bookingController.js';
const router=express.Router();
router.post('/create',isLoggedIn,newBooking);
router.get('/getBookings',isLoggedIn,getBookings);
;
router.delete('/removeBooking/:bookingId',deleteBooking);
export default router;