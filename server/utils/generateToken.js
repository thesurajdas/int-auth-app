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

    // Check if a token already exists for the user and delete it
    // const existingToken = await UserToken.findOne({ userId: user._id });
    // if (existingToken) {
    //   await UserToken.deleteOne({ userId: user._id });
    // }

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

function generateOTP(digits) {
  if (!digits || digits < 1) {
    throw new Error("Number of digits must be a positive integer");
  }
  const min = Math.pow(10, digits - 1); // Smallest number with the given digits
  const max = Math.pow(10, digits) - 1; // Largest number with the given digits
  return Math.floor(min + Math.random() * (max - min + 1));
}

function generateStringToken() {
  const randomPart = Math.random().toString(36).substring(2, 15);
  const timestampPart = Date.now().toString(36);
  return randomPart + timestampPart;
}

export { generateTokens, generateOTP, generateStringToken };
