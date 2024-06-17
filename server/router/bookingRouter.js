import express from 'express';
import { deleteBooking, editBooking, getBookings, newBooking } from '../controllers/bookingController.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
const router=express.Router();
router.post('/create',isLoggedIn,newBooking);
router.get('/getBookings',getBookings);
router.delete('/removeBooking/:id',isLoggedIn,deleteBooking);
router.put('/edit/:id',isLoggedIn,editBooking);
export default router;