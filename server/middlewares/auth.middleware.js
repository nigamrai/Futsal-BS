import JwtService from '../utils/JwtUtil.js';
import AppError from "../utils/errorUtil.js";
const isLoggedIn=async(req,res,next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        throw new Error();
    }
    
    const userDetails=await JwtService.verifyAccessToken(token);
    if(!userDetails){
        throw new Error();
    }
    req.user=userDetails;
    next();
}catch(error){
    res.status(401).json({message:"Invalid Token Hi"});
}
}
const authorizedRoles=(...roles)=>async(req,res,next)=>{
    const currentUserRole=req.user.role;
    if(!roles.includes(currentUserRole)){
        return next(new AppError(403, "You do not have permission to access this route"));
    }
    next();
}
export { authorizedRoles, isLoggedIn };

