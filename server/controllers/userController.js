import User from "../models/userModel.js";
import AppError from "../utils/errorUtil.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import bcrypt from "bcrypt";
const signup = async (req, res, next) => {
    const { fullName, mobile, email, password, confirmPassword, role } = req.body

    if (!fullName || !mobile || !email || !password || !confirmPassword || !role) {
        return next(new AppError('ALL fields  are required', 400));
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        return next(new AppError('Email already exists', 400));
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        fullName,
        mobile,
        email,
        password: hashedPassword,
        avatar: {
            public_id: email,
            secure_url: 'https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png' 
        },
        role
    });
    if (req.file) {
        try{
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "FBS",
                width: 250,
                height:250,
                gravity: "face",
                crop: "fill",
            });
            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
                //remove file from server
                fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (error) {
          return next(new AppError('fila not uploaded', 400));
        }
    }
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
export { 
    signup,
    getProfile
 }