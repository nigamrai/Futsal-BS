import express from 'express';
import { getBookings, newBooking } from '../controllers/bookingController.js';
const router=express.Router();
router.post('/create',newBooking);
router.get('/getBookings',getBookings);
router.get('/timeSchedule')
export default router;