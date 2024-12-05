import UserToken from "../models/UserToken.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = async (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

  try {
    // Find the token in the database
    const tokenDocument = await UserToken.findOne({ token: refreshToken });
    if (!tokenDocument) {
      throw new Error("Invalid Refresh Token");
    }

    // Verify the token using JWT
    const tokenDetails = jwt.verify(refreshToken, privateKey);

    return {
      tokenDetails,
      error: false,
      message: "Valid Refresh Token",
    };
  } catch (err) {
    return {
      error: true,
      message: err.message || "Invalid Refresh Token",
    };
  }
};

export default verifyRefreshToken;
