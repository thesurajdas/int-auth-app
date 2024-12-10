import { Router } from "express";
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
        { expiresIn: "15m" }
      );
      res.status(200).json({
        error: false,
        accessToken,
        message: "Access Token created successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({ error: true, message: "Invalid refresh token" });
    });
});

export default router;
