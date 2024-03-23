import Joi from "joi";
import Booking from "../models/booking.model.js";
import AppError from '../utils/errorUtil.js';
const newBooking=async(req,res,next)=>{
    const{date,day,time,duration,phoneNumber}=req.body;
    const bookingSchema=Joi.object({
        date:Joi.string().required(),
        day:Joi.string().required(),
        time:Joi.number().required(),
        duration:Joi.number().required(),
        phoneNumber:Joi.string().min(10).max(14).required()
    })
    const {error}=bookingSchema.validate(req.body);
    if(error){
        return next(error);
    }
    const exists = await Booking.find({$and:[{date:date},{time:time}]});

    if (exists.length > 0) {
        return next(new AppError("Already booked", 400));
    }
    const booked=await Booking.create({
        date,
        day,
        time,
        duration,
        phoneNumber
    })
    res.status(200).json({
        success:true,
        message:"Booked successfully",
        booked
    })
}
const getBookings=async(req,res,next)=>{
    try{
        const bookings=await Booking.find({});
        if(!bookings){
            return next(new AppError('No data',400))
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
export { getBookings, newBooking };

