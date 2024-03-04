import { Schema, model } from "mongoose";

const tokenSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,ref:'User'
    },
    token:{
        type:String,
        required:[true,"Token is required"]
    }
})
const Token=model('Token',tokenSchema,'tokens');
export default Token;