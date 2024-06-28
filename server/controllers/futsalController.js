import Futsal from "../models/futsal.model.js";
import AppError from "../utils/errorUtil.js";

const createFutsal=async(req,res,next)=>{

}
const getFutsalDetail=async(req,res,next)=>{
    try{
        const futsalEmail='bhatbhateni@gmail.com'
        const futsal=await Futsal.findOne({futsalEmail});
        if(!futsal){
            return next(new AppError('Futsal with given email does not exist',400))
        }
    
        res.status(200).json({
            success:true,
            message:"Futsal detail fetched successfully",
            futsal
        })
    }catch(error){
        console.log(error);
    }
}




export { createFutsal, getFutsalDetail };

