import { Schema, model } from 'mongoose';
const paymentSchema=Schema({
    amount:{
        type:String,
        required:true
    },
    payment_status:{
        enum:['HALF','FULL']
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    source_payment_id:{
        type:String
    },
    bookingId:{
        type:Schema.Types.ObjectId,
        ref:'Booking'
    },
    status:{
        type:Boolean,
        default:true
    }
},{timestamps:true});
const Payment=model("Payment",paymentSchema,'payments');
export default Payment;
