import { } from 'dotenv/config';
import jwt from "jsonwebtoken";
import Token from "../models/token.model.js";

class JwtUtil{
    generateTokens(payload){
        
        const accessToken=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5s'});
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
    async verifyAccessToken(accessToken){
        return jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    }
    async findRefreshToken(userId, refreshToken) {
        return await Token.findOne({
            userId: userId,
            token: refreshToken,
        });
    }
    async updateRefreshToken(userId, refreshToken) {
        return await Token.updateOne(
            { userId: userId },
            { token: refreshToken }
        );
    }
    async removeToken(refreshToken) {
        return await Token.deleteOne({ token: refreshToken });
    }

    

}

const JwtService=new JwtUtil();
export default JwtService;