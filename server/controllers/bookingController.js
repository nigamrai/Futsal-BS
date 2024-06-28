import * as crypto from "crypto";
import Joi from "joi";
import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import User from "../models/userModel.js";
import AppError from "../utils/errorUtil.js";
import sendEmail from "../utils/sendEmail.js";
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
  const { date, day, time, phoneNumber, userId, paymentMethod, paymentAmount } =
    req.body;

  const bookingSchema = Joi.object({
    date: Joi.string().required(),
    day: Joi.string().required(),
    time: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    userId: Joi.string(),
    paymentMethod: Joi.string(),
    paymentAmount: Joi.number(),
  });

  const { error } = bookingSchema.validate({
    date,
    day,
    time,
    phoneNumber,
    userId,
    paymentMethod,
    paymentAmount,
  });
  if (error) {
    return next(error);
  }

  let session = null; // Define session variable outside the try-catch block

  try {
    // Start a session
    session = await mongoose.startSession();
    session.startTransaction();

    // Check if booking exists
    const exists = await Booking.findOne({
      date: date,
      time: time,
      status: true,
      transaction_code: { $exists: true },
    }).session(session);

    if (exists) {
      await session.abortTransaction();
      session.endSession();
      return next(new AppError("Already booked", 400));
    }

    // Create a new booking
    const booked = await Booking.create(
      [
        {
          date,
          day,
          time,
          phoneNumber,
          userId,
          paymentMethod,
          amount: paymentAmount,
        },
      ],
      { session: session }
    );
    console.log(booked[0].userId);
    const user = await User.findById(booked[0].userId);
    console.log(user);
    if (user.role=="USER") {
      booked[0].status = false;
      await booked[0].save();
      console.log(booked[0]);
    }
    
    if(req.body.email){
      const subject = "Bookings Added";
      const message = `Hello,<br/>
            New booking has been added with the following details:<br/>
            1. Time:${booked[0].time}<br/>
            2. Date:${booked[0].date}<br/>
            3. Day:${booked[0].day}<br/>
            Thank you,<br/>
            Bhatbhateni Futsal`;

    try {
      await sendEmail(req.body.email, subject, message);
    } catch (error) {
      console.log(error.message);
    }
    }
    const signature = createSignature(
      `total_amount=${booked[0].amount},transaction_uuid=${booked[0]._id},product_code=EPAYTEST`
    );
    console.log("Hi");
    console.log(booked[0]._id);
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
      formData,
    });
  } catch (error) {
    // If an error occurs, abort the transaction
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

    console.error("Error creating booking:", error);
    return next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      status: true,
    }).populate("userId");
    if (!bookings) {
      return next(new AppError("No data", 401));
    }
    res.status(200).json({
      success: true,
      message: "All bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    return next(error);
  }
};
const updateBookingAfterPayment = async (req, res, next) => {
  try {
    console.log(req.body);
    const booking = await Booking.findById(req.transaction_uuid).populate(
      "userId"
    );

    booking.transaction_code = req.transaction_code;
    booking.status=true;
    booking.save();

    const email = booking.userId.email;
    const subject = "Bookings Added";
    const message = `Hello ${booking.userId.fullName},<br/>
            New booking has been added with the following details:<br/>
            1. Time:${booking.time}<br/>
            2. Date:${booking.date}<br/>
            3. Day:${booking.day}<br/>
            4. Amount paid:${booking.amount}<br/>
            Thank you,<br/>
            Bhatbhateni Futsal`;

    try {
      await sendEmail(email, subject, message);
    } catch (error) {
      console.log(error.message);
    }

    res.redirect("http://localhost:5173/home#timetable");
  } catch (err) {
    res.status(400).json({ error: err?.message || "No Orders found" });
  }
};
const deleteBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);

    const booking = await Booking.findById(id).populate("userId");
    await Booking.findByIdAndUpdate(id, { status: false });

    console.log(booking);
    const email = booking.userId.email;
    const subject = "Bookings Deleted or canceled";
    const message = `Hello ${booking.userId.fullName},<br/>
            Booking with the following details is deleted or canceled:<br/>
            1. Time:${booking.time}<br/>
            2. Date:${booking.date}<br/>
            3. Day:${booking.day}<br/>
            4. Amount paid:${booking.amount}<br/>
            Thank you,<br/>
            Bhatbhateni Futsal`;

    try {
      await sendEmail(email, subject, message);
    } catch (error) {
      console.log(error.message);
    }
    res.redirect("http://localhost:5173/home#timetable");
  } catch (error) {
    return res.status(400).json({ error: error?.message || "Delete failed" });
  }
};

const editBooking = async (req, res) => {
  try {
    const { time } = req.body;
    console.log(time,req.params.id);
    const booking=await Booking.findById(req.params.id).populate("userId");
    const oldBooking=booking;
    booking.time=time;
    booking.save();
    const email = booking.userId.email;
    const subject = "Booking edited";
    const message = `Hello ${booking.userId.fullName},<br/>
            Booking with the following details is edited :<br/>
            1. Time:${oldBooking.time}<br/>
            2. Date:${oldBooking.date}<br/>
            3. Day:${oldBooking.day}<br/>
            4. Amount paid:${booking.amount}<br/>
            and the new edited time is ${booking.time}<br/>
            Thank you,<br/>
            Bhatbhateni Futsal`;

    try {
      await sendEmail(email, subject, message);
    } catch (error) {
      console.log(error.message);
    }

    res.status(200).json({
      success: true,
      message: "Booking edited successfully",
    });
  } catch (error) {
    console.error(error);
  }
};
export {
  createSignature,
  deleteBooking,
  editBooking,
  getBookings,
  newBooking,
  updateBookingAfterPayment
};

