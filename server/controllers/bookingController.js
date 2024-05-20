import Joi from "joi";
import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import AppError from '../utils/errorUtil.js';
const createSignature = (message) => {
    const secret = "8gBm/:&EnhH.1/q"; //different in production
    // Create an HMAC-SHA256 hash
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(message);
  
    // Get the digest in base64 format
    const hashInBase64 = hmac.digest("base64");
    return hashInBase64;
  };
const newBooking = async (req, res, next) => {
    const { date, day, time, duration, phoneNumber, userId ,paymentMethod,paymentAmount} = req.body;

    const bookingSchema = Joi.object({
        date: Joi.string().required(),
        day: Joi.string().required(),
        time: Joi.string().required(),
        duration: Joi.number().required(),
        phoneNumber: Joi.string().min(10).max(14).required(),
        userId: Joi.string(),
        paymentMethod:Joi.string(),
        paymentAmount:Joi.number()
    });

    const { error } = bookingSchema.validate({date,day,time,duration,phoneNumber,userId,paymentMethod,paymentAmount});
    if (error) {
        return next(error);
    }

    let session = null; // Define session variable outside the try-catch block

    try {
        // Start a session
        session = await mongoose.startSession();
        session.startTransaction();
    
        // Check if booking exists
        const exists = await Booking.findOne({ date: date, time: time,status:true,  transaction_code: { $exists: true }}).session(session);
    
        if (exists) {
            await session.abortTransaction();
            session.endSession();
            return next(new AppError("Already booked", 400));
        }
    
        // Create a new booking
        const booked = await Booking.create(
            [{ date, day, time, duration, phoneNumber, userId ,paymentMethod,amount:paymentAmount}],
            { session: session }
        );
        // console.log(booked);
        // Create signature
        const signature = createSignature(
            `total_amount=${booked[0].amount},transaction_uuid=${booked[0]._id},product_code=EPAYTEST`
        );
    
        const formData = {
            amount: booked[0].amount,
            failure_url: `http://localhost:5002/api/esewa/failed/${booked[0]._id}`,
            product_delivery_charge: "0",
            product_service_charge: "0",
            product_code: "EPAYTEST",
            signature: signature,
            signed_field_names: "total_amount,transaction_uuid,product_code",
            success_url: "http://localhost:5002/api/esewa/success",
            tax_amount: "0",
            total_amount: booked[0].amount,
            transaction_uuid: booked[0]._id,
        };
        // console.log(formData);
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
    
        res.status(200).json({
            success: true,
            message: "Booked successfully",
            booked,
            formData
        });
    } catch (error) {
        // If an error occurs, abort the transaction
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
    
        console.error('Error creating booking:', error);
        return next(error);
    }
    
};

const getBookings=async(req,res,next)=>{
    try{
        const bookings=await Booking.find({status:true, transaction_code: { $exists: true }});
        if(!bookings){
            return next(new AppError('No data',401))
        }
        res.status(200).json({
            success:true,
            message:"All bookings fetched successfully",
            bookings
        })
    }catch(error){  
        return next(error);
    }
}
const updateBookingAfterPayment=async(req,res,next)=>{
    try {
        console.log(req.body);
        const booking = await Booking.findById(req.transaction_uuid);
    
        booking.transaction_code = req.transaction_code;
    
        booking.save();
        res.redirect("http://localhost:5173/home#timetable");
      } catch (err) {
        return res.status(400).json({ error: err?.message || "No Orders found" });
      }
}
const deleteBooking=async(req,res,next)=>{
    try{
        const id=req.booking._id;
        await Booking.findByIdAndUpdate(id,{
            status:false
        });
        
        res.redirect("http://localhost:5173/home#timetable");
    }catch(error){
        return res.status(400).json({error:error?.message || "Delete failed"})
    }
}

export { createSignature, deleteBooking, getBookings, newBooking, updateBookingAfterPayment };

