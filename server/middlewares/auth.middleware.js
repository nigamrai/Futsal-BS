import JwtService from '../utils/JwtUtil.js';
import AppError from "../utils/errorUtil.js";
const isLoggedIn=async(req,res,next)=>{
    
    const {token}=req.cookies;
    if(!token){
        return next(new AppError(401,'Unauthenticated, please login again'))
    }
    const userDetails=await JwtService.verifyRefreshToken(token);
    req.user=userDetails;
    next();
}
export default isLoggedIn;