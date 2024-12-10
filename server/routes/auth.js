import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import {
  loginBodyValidation,
  registerBodyValidation,
} from "../utils/validationSchema.js";
import generateTokens from "../utils/generateToken.js";

const router = Router();
router.post("/register", async (req, res) => {
  try {
    const { error } = registerBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: true, message: "User with given email already exist" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const userData = await new User({
      ...req.body,
      password: hashPassword,
    }).save();
    const {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    } = await generateTokens(userData);
    res.status(201).json({
      error: false,
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Invaild email address!" });
    }
    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifiedPassword) {
      return res
        .status(401)
        .json({ error: true, message: "Invaild password!" });
    }

    //Generate Access and refresh Token
    const {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    } = await generateTokens(user);

    // Set HTTP-only cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure HTTPS in production
      sameSite: "lax", // Adjust based on your app's needs
      maxAge: 14 * 60 * 1000, // 14 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure HTTPS in production
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.cookie("isAuth", true, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production", // Ensure HTTPS in production
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      error: false,
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      message: "Login successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "internal Server Error",
    });
  }
});

router.delete("/logout", async (req, res) => {
  try {
    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("isAuth");

    res.status(200).json({ error: false, message: "Logged out successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

export default router;
