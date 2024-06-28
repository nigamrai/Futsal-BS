import bcrypt from "bcrypt";
import * as crypto from 'crypto';
import Joi from "joi";
import User from "../models/userModel.js";
import JwtService from "../utils/JwtUtil.js";
import AppError from "../utils/errorUtil.js";
import sendEmail from "../utils/sendEmail.js";
const cookieOptions={
  maxAge:7*24*60*60*1000,
  httpOnly:true,
  secure:true
}
const signup = async (req, res, next) => {
  const { fullName, mobile, email,status } = req.body;

  const registerSchema = Joi.object({
    fullName: Joi.string().min(5).max(50).trim().required(),
    mobile: Joi.string().required(),
    email: Joi.string().email().required(),
    status:Joi.boolean()
  });
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  
  const emailExists = await User.findOne({ email, status: true });

 
  if (emailExists) {
    return next(new AppError("Email already exists", 400));
  }
  const numberExists = await User.findOne({ mobile,status:true});
  if (numberExists) {
    return next(new AppError("Number already exists"), 400);
  }
 
 
  let user = await User.create({
    fullName,
    mobile,
    email,
    status
  });
  if (user) {
    const passwordToken=await user.generateSetPasswordToken();
    await user.save();
    const setPasswordURL=`$http://localhost:5173/set-password/${passwordToken}`;
    const subject="Set Password";
    const message=`You can set your password by clicking <a href=${setPasswordURL} target="_blank">Set Password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${setPasswordURL} If you have not requested this, kindly ignore.`
    try{
      await sendEmail(email,subject,message);
      res.status(201).json({
        success: true,
        message: "Set password url sent successfully",
        user
      });
    }catch(error){
      const id=user._id;
      console.log(id);
      await User.findByIdAndDelete(id)
      console.log(error.message);
    }
  }else{
   
    return next(AppError("User signup failed please try again", 400));
  }  
};
const setPassword=async(req,res)=>{
  const {password,token}=req.body;

  try{
    const setPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
    const user=await User.findOne({ setPasswordToken,setPasswordExpiry:{$gt:Date.now()}});
    if(!user){
      await User.findOneAndDelete({setPasswordToken})
      return next(new AppError('Token is invalid or expired,please try again',400))
    }
    const hashPassword=await bcrypt.hash(password,10);  
    user.password=hashPassword;
    user.status=true;
    user.setPasswordToken=undefined;
    user.setPasswordExpiry=undefined;
    await user.save();
    user.password=undefined;
    res.status(200).json({
      success:true,
      message:"Password set successfully",
      user
    })
  }catch(error){
    
  }

}
const confirm=async(req,res,next)=>{
  const {token:setPasswordToken}=req.params;
  try{
    const user=await User.findOne({setPasswordToken,status:true});

    if(!user){
      return next(new AppError("You have not set password. Please set password first",400))
    }
    res.status(200).json({
      success:true,
      message:"Successfully confirmed"
    })
  }catch(error){
    console.log(error);
  }
}
const getProfile = (req, res) => {};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  //Validate the incoming data
  const userSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
      )
      .required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    return next(error);
  }
 
  try {
    //check if the user with given email exists or not
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("User not found", 400));
    }
    //Check the hashed password with the database password
    const match = await bcrypt.compare(password, user.password);
    //if it does not match, return an error or else respond with json data
    if (!match) {
      return next(new AppError("Password does not match. Try again!!"));
    }
    const { accessToken, refreshToken } = JwtService.generateTokens({
      _id: user._id,
      role:user.role
    });
    await JwtService.storeRefreshToken(refreshToken, user._id);
    res.cookie('token',accessToken,cookieOptions);
    res.cookie('refreshToken',refreshToken,cookieOptions);
    res.status(200).json({
      success: "true",
      message: "Logged in succesfully",
      accessToken,
      user
    });
  } catch (error) {
    return next(error);
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const users = await User.find({status:true});
    if (!users) {
      return next(new AppError("No any users", 400));
    }

    res.status(200).json({
      sucess: true,
      message: "Users Details fetched successfully",
      users,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

//delete case
const removeUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user=await User.findById(userId);
    await User.findByIdAndUpdate(userId,{status:false});
    const email = user.email;
    const subject = "Account deleted";
    const message = `Hello ${user.fullName},<br/>
            You account has been deleted.<br/>
            Thank you,<br/>
            Bhatbhateni Futsal`;

    try {
      await sendEmail(email, subject, message);
    } catch (error) {
      console.log(error.message);
    }


    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    }) // No content - successful deletion
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const editUser = async (req, res) => {
  try{
    const {fullName,mobile,userId}=req.body;
     await User.findByIdAndUpdate(userId,{fullName,mobile});
    res.status(200).json({
      success:true,
      message:"User edited successfully"
    })
  }catch(error) {
    console.error(error);
  }
}
const logout=async(req,res)=>{
  const { refreshToken } = req.cookies;
  // delete refresh token from db
  await JwtService.removeToken(refreshToken);
  // delete cookies
  res.clearCookie('refreshToken');
  res.clearCookie('token');

  
  res.status(200).json({
    success:true,
    message:"Logged out successfully"
  })
}
export { confirm, editUser, getProfile, getUserDetails, login, logout, removeUser, setPassword, signup };

