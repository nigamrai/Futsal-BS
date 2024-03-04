import jwt from "jsonwebtoken";
import {} from 'dotenv/config';
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

}

const JwtService=new JwtUtil();
export default JwtService;