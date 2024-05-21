import User from "../models/userModel.js";
import JwtService from "../utils/JwtUtil.js";

async function refresh(req, res) {
  // get refresh token from cookie
  const { refreshToken: refreshTokenFromCookie } = req.cookies;
  // check if token is valid

  let userData;
  try {
    userData = await JwtService.verifyRefreshToken(refreshTokenFromCookie);
  } catch (err) {
    console.log("Hello");
    return res.status(401).json({ message: "Invalid Token 1" ,success:false});
  }
  // Check if token is in db
  try {
    const token = await JwtService.findRefreshToken(
      userData._id,
      refreshTokenFromCookie
    );
    if (!token) {
      return res.status(401).json({ message: "Invalid token 2" });
    }
  } catch (err) {
    
    return res.status(500).json({ message: "Internal error" });
  }
  // check if valid user
  const user = await User.findOne({ _id: userData._id });
  if (!user) {
    return res.status(404).json({ message: "No user" });
  }
  // Generate new tokens
  const { refreshToken, accessToken } = JwtService.generateTokens({
    _id: userData._id,
    role:userData.role
  });

  console.log(`New:${refreshToken}`);
  // Update refresh token
  try {
    await JwtService.updateRefreshToken(userData._id, refreshToken);
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
  // put in cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
  });

  res.cookie("token", accessToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
  });
  // response
 
  res.json({ user, auth: true });
}
export default refresh;
