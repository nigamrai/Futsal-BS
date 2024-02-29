//const mongoose = require("mongoose")
import mongoose from "mongoose";

mongoose.set('strictQuery', false);
const connectToDB = async () => {
    try{
        const { connection } = await mongoose.connect(
            process.env.MONGODB_URI || `mongodb://localhost:27017/test`
        );
        if( connection ){
            console.log (`Connection to MongoDB: ${connection .host}`);
        }
    }catch (error){
        console.log("MONGODB CONNECTION error", error);
        process.exit(1);
    }
}
export default connectToDB;

