import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";

const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };

    // Define expiration durations
    const accessTokenDuration = 15 * 60; // 15 minutes in seconds
    const refreshTokenDuration = 30 * 24 * 60 * 60; // 30 days in seconds

    // Calculate expiration times
    const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Current time in UNIX timestamp
    const accessTokenExpiresAt = currentTimeInSeconds + accessTokenDuration;
    const refreshTokenExpiresAt = currentTimeInSeconds + refreshTokenDuration;

    // Generate Access Token
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: `${accessTokenDuration}s` }
    );

    // Generate Refresh Token
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: `${refreshTokenDuration}s` }
    );

    // Check if a token already exists for the user
    const existingToken = await UserToken.findOne({ userId: user._id });
    if (existingToken) {
      // Delete the existing token
      await UserToken.deleteOne({ userId: user._id });
    }

    // Save the new refresh token
    await new UserToken({ userId: user._id, token: refreshToken }).save();

    return {
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
    };
  } catch (err) {
    console.error("Error generating tokens:", err.message);
    throw new Error("Token generation failed");
  }
};

export default generateTokens;
