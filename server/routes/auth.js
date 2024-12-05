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
    await new User({ ...req.body, password: hashPassword }).save();
    res
      .status(201)
      .json({ error: false, message: "Account created successfully!" });
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
    const { accessToken, refreshToken } = await generateTokens(user);
    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
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

export default router;
