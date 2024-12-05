import { Router } from "express";
import UserToken from "../models/UserToken.js";
import jwt from "jsonwebtoken";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";
import { refreshTokenBodyValidation } from "../utils/validationSchema.js";

const router = Router();

router.post("/", (req, res) => {
  const { error } = refreshTokenBodyValidation(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });
  }
  verifyRefreshToken(req.body.refreshToken)
    .then(({ tokenDetails }) => {
      const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "14m" }
      );
      res.status(200).json({
        error: false,
        accessToken,
        message: "Access Token created successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({ error: true, message: "Invalid refresh token" })});
});

router.delete("/", async (req, res) => {
  try {
    const { error } = refreshTokenBodyValidation(req.body);
    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }
    const userToken = await UserToken.findOne({ token: req.body.refreshToken });
    if (!userToken) {
      return res.status(200).json({
        error: false,
        message: "Logout successfully",
      });
    }
    await UserToken.deleteOne({ token: req.body.refreshToken });
    res.status(200).json({
      error: false,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

export default router;
