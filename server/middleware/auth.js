import jwt from "jsonwebtoken";
import isTokenExpired from "../utils/isTokenExpired.js";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "15m",
  });
};

const setAccessTokenCookie = (res, token) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
};

const auth = async (req, res, next) => {
  try {
    let accessToken =
      req.headers["authorization"]?.split(" ")[1] || req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (accessToken && !isTokenExpired(accessToken)) {
      const tokenDetails = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_PRIVATE_KEY
      );
      req.user = tokenDetails;
      return next();
    }

    if (!refreshToken) {
      return res.status(403).json({
        error: true,
        message: "Access Denied! Refresh Token Missing.",
      });
    }

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
    const newAccessToken = generateAccessToken(payload);
    setAccessTokenCookie(res, newAccessToken);
    req.user = tokenDetails;

    return next();
  } catch (error) {
    console.error("Authentication Middleware Error:", error.message);
    return res.status(403).json({
      error: true,
      message: "Access Denied! Invalid Token.",
    });
  }
};

export default auth;
