import express from 'express';
import { deleteBooking, updateBookingAfterPayment } from '../controllers/bookingController.js';
import { handleEsewaFailed, handleEsewaSuccess } from '../controllers/esewaController.js';
const router=express.Router();
router.get("/success", handleEsewaSuccess,updateBookingAfterPayment );
router.get("/failed/:id",handleEsewaFailed,deleteBooking)
export default router;