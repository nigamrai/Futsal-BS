import User from "../models/userModel.js";
import AppError from "../utils/errorUtil.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import bcrypt from "bcrypt";
import JwtService from "../utils/JwtUtil.js";

import Joi from "joi";

const signup = async (req, res, next) => {
    const { fullName, mobile, email, password, confirmPassword, role } = req.body

    const registerSchema = Joi.object({
        fullName:Joi.string().min(5).max(50).trim().required(),
        mobile:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required(),
        confirmPassword:Joi.ref('password'),
        role:Joi.string().required()
    })
    const {error} = registerSchema.validate(req.body);
    if(error){
        return next(error);
    }
    
  

    const emailExists = await User.findOne({email})

    if (emailExists) {
        return next(new AppError('Email already exists', 400));
    }
    const numberExists=await User.findOne({mobile});
    if(numberExists){
        return next(new AppError('Number already exists'),400);
    }
    

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        fullName,
        mobile,
        email,
        password: hashedPassword,
       
        role
    });

    console.log(user);

    if (!user) {
        return next(AppError('User signup failed please try again', 400))
    }
    
    await user.save();

    user.password = undefined;

    
    res.status(201).json({
        success: true,
        message: 'user signup successfully',
        user
    })
}

const getProfile = (req, res) => {
   
}
const login=async(req,res,next)=>{
    const {email,password}=req.body;
    //Validate the incoming data
    const userSchema=Joi.object({
        email:Joi.string().email().trim().required(),
        password:Joi.string().pattern(new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          )).required()
    })
    const {error}=userSchema.validate(req.body);
    if(error){
        return next(error);
    }
   try{
     //check if the user with given email exists or not 
     const user=await User.findOne({email}).select('+password');
     if(!user){
         return next(new AppError('User not found',400));
     }
     //Check the hashed password with the database password
     const match=await bcrypt.compare(password,user.password);
    //if it does not match, return an error or else respond with json data
     if(!match){
        return next(new AppError('Password does not match. Try again!!'));
     }
     const {accessToken,refreshToken}=JwtService.generateTokens({
        _id:user._id,
        activated:false
     })
     await JwtService.storeRefreshToken(refreshToken,user._id);
     res.status(200).json({
        success:'true',
        message:"User logged in succesfully",
        accessToken
     })
   }catch(error){
        return next(error);
   }

}

const  getUserDetails= async(req, res, next) => {
    try{ 
        const users = await User.find({});
        if(!users) {
            return next(
                new AppError('No any users', 400)
            )
        }

        res.status(200).json({
            sucess: true,
            message: 'Users Details fetched successfully',
            users
        })

    }catch(e){
        return next(
            new AppError(e.message, 500)
         )

    }        
}

//delete case
const removeUsers = async (req, res, next) => {
    try{
        
        const users = await User.find({});
        if(!users){
            return next(
                new AppError('Course with given id doesnot exist', 500)
            )
        }

        await user.findByIdAndDelete(id);  //course delete part

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
            users
        })

    }catch(e){
        return next(
            new AppError(e.message, 500)
        )
    }
}
export { 
    signup,
    getProfile,
    login,
    getUserDetails,
    removeUsers
 }