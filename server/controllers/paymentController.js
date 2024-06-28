import Payment from "../models/payment.model.js";
import AppError from "../utils/errorUtil.js";

   
 const createPayment=async(req,res,next)=>{
    try{
    console.log(req.book);
    req.body.userId=req.book.userId;
    req.body.source_payment_id=req.body.refId;
    req.body.amount=req.body.amt;
    req.body.bookingId=req.book._id;
        const product=new Payment(req.body);
        const createdPayment=await product.save();
        res.status(200).json({
            success:true,
            message:"Payment successful",
            createdPayment
        })
    }catch(error){
        return next(new AppError("Payment could not be created",500));
    }
}
export { createPayment };

