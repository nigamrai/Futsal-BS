import { model, Schema } from "mongoose";

const bookingSchema=new Schema({
    time:{
        type:String,
        required:[true,"Time is Required"]
    },
    date:{
        type:String,
        required:[true,"Date is required"]
    },
    day:{
        type:String,
        required:[true,"Day is required"]
    },
    phoneNumber:{
        type:String,
        required:[true,"Phone Number is required"]
    },
    status:{
        type:Boolean,
        default:true
    },
    amount:{
        type:Number
    },
    transaction_code: String,
    paymentMethod:{
        type:String
    },
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    paymentId:{type:Schema.Types.ObjectId,ref:'Payment'}
    

},{timeStamps:true});
const Booking=model("Booking",bookingSchema,"bookings");
export default Booking;