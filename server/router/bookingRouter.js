import express from 'express';
import { getBookings, newBooking, removeBooking } from '../controllers/bookingController.js';
const router=express.Router();
router.post('/create',newBooking);
router.get('/getBookings',getBookings);
router.get('/timeSchedule');
router.delete('/removeBooking/:bookingId',removeBooking);
export default router;