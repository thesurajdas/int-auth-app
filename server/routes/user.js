import { Router } from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";
import User from "../models/User.js";

const router = Router();

router.get(
  "/me",
  auth,
  roleCheck(["user"]),
  async (req, res) => {
    const data = await User.findOne({ _id: req.user._id });
    const userData = {
      name: data.name,
      email: data.email,
      roles: data.roles,
    };
    res
      .status(200)
      .json({ error: false, message: "User Authenticated.", data: userData });
  }
);

export default router;
