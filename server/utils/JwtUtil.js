import { } from 'dotenv/config';
import jwt from "jsonwebtoken";
import Token from "../models/token.model.js";

class JwtUtil{
    generateTokens(payload){
        
        const accessToken=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
        const refreshToken=jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1y'});
        return {accessToken,refreshToken};
    }
    async storeRefreshToken(token,userId){
        try{
            await Token.create({
                userId,
                token
            })
        }catch(error){
            console.log(error.message);
        }
    }
    async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    }
    

}

const JwtService=new JwtUtil();
export default JwtService;