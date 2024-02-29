import userModel from "../models/userSchema.js";
import emailValidator from "email-validator";
const signup = async (req, res, next) => {
    const { name, number, email, password, confirmPassword, role } = req.body;
    console.log(name, number, email, password, confirmPassword, role);

    if (!name || !number || !email || !password || !confirmPassword || !role) {
        return res.status(200).json({
            success: false,
            message: "Every field is required"
        })    
    }

    const validEmail = emailValidator.validate(email);
    if(!validEmail) {
        return res.status(200).json({
            success: false,
            message: "Please provide a valid email id"
        })      
    }

    if(password !== confirmPassword) {
        return res.status(200).json({
            success: false,
            message: "Please provide a valid email id"
        })   
    }
    
    if (!number || isNaN(number)) {
        return res.status(200).json({
            success: false,
            message: "Please provide a valid number"
        });
      }
    try {
        const userInfo = userModel(req.body);
        const result = await userInfo.save(); //save data in database

        return res.status(200).json({
            success: true,
            data: result,
            name,
            number,
            email,
            password,
            confirmPassword,
            role
        });
    } catch(e) {
        if(e.coed === 11000) {
            return res.status(400).json({
                success: false,
                message: "Account alread exists with provided email id"
            })
        }
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
  
}
export { signup }