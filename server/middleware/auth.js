import jwt from "jsonwebtoken";
import isTokenExpired from "../utils/isTokenExpired.js";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";

const auth = async (req, res, next) => {
  try {
    let accessToken = req.headers["authorization"]?.split(" ")[1]; // Bearer token
    const refreshToken = req.cookies.refreshToken;

    // If no tokens are provided, deny access
    if (!refreshToken) {
      return res.status(403).json({
        error: true,
        message: "Access Denied! No Token Provided.",
      });
    }

    // If access token is missing, fall back to cookie-based access token
    if (!accessToken) {
      accessToken = req.cookies.accessToken;
    }

    // If the access token is expired, regenerate it using the refreshToken
    if (isTokenExpired(accessToken)) {
      if (!refreshToken) {
        return res.status(403).json({
          error: true,
          message: "Access Denied! Refresh Token Missing.",
        });
      }

      // Verify the refresh token
      const { error, message, tokenDetails } = await verifyRefreshToken(
        refreshToken
      );
      if (error) {
        return res.status(403).json({
          error: true,
          message: message || "Invalid Refresh Token.",
        });
      }
      const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
      // Generate Access Token
      const newAccessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "15m" }
      );
      // Store the new access token in cookies
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      // Attach user details to request for further use in subsequent middleware/handlers
      req.user = tokenDetails;

      // Allow the request to proceed
      return next();
    }

    // If the access token is valid, continue as normal
    if (accessToken) {
      const tokenDetails = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_PRIVATE_KEY
      );
      req.user = tokenDetails;
      return next();
    }

    // If no valid access token found
    return res.status(403).json({
      error: true,
      message: "Access Denied! Invalid or Missing Tokens.",
    });
  } catch (error) {
    console.error("Authentication Middleware Error:", error.message);
    return res.status(403).json({
      error: true,
      message: "Access Denied! Invalid Token.",
    });
  }
};

export default auth;
