import jwt from "jsonwebtoken";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";
import { refreshTokenBodyValidation } from "../utils/validationSchema.js";

export const createAccessToken = async (req, res) => {
  try {
    const { error } = refreshTokenBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const { tokenDetails } = await verifyRefreshToken(req.body.refreshToken);

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
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: true, message: "Invalid refresh token" });
  }
};
