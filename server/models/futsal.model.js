import { model, Schema } from 'mongoose';


const futsalSchema=new Schema({
    futsalName:{
        type:String,
        required:[true,'Futsal Name is required'],
        minLength:[5,'Futsal Name must be greater than 5 characters'],
        maxLength:[50,"Futsal name must be less than 50 characters"],
        trim:true,
        unique:[true,'Already registered']   
    },
    futsalPhoneNumber:{
        type:String,
        required:[true,'Futsal phone number is required'],
        minLength:[10,'Phone number must be of 10 digits'],
        unique:[true,"Already registered"]
    },
    futsalEmail:{
        type:String,
        required:[true,'Futsal email is required'],
        unique:[true,'Already registered']
    },
    futsalAddress:{
        type:String,
        required:[true,'Futsal Address is required'],
        trim:true
    },
    futsalPrice:{
        morning:{
            type:Number,
            required:[true,'Morning price is required']
        },
        day:{
            type:Number,
            required:[true,'Day price is required']
        },
        evening:{
            type:Number,
            required:[true,'Evening price is required']
        }
    },
    futsalOpeningTime:{
        type:String,
        required:[true,"Futsal opening time is required"],

    },
    futsalClosingTime:{
        type:String,
        required:[true,"Futsal closing time is required"]
    },
    futsalOpenStatus:{
        type:String,
        enum:["OPEN","CLOSED"],
        default:"OPEN"
    },
    status:{
        type:Boolean
    }
},{timestamps:true});
const Futsal=model('Futsal',futsalSchema,'futsals');
export default Futsal;