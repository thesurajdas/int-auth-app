import { Router } from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";
import User from "../models/User.js";

const router = Router();

// get one user
router.get("/me", auth, roleCheck(["user"]), async (req, res) => {
  const data = await User.findOne({ _id: req.user._id });
  const userData = {
    name: data.name,
    email: data.email,
    roles: data.roles,
  };
  res
    .status(200)
    .json({ error: false, message: "User Authenticated.", data: userData });
});

// get all users with server side pagination without password field
router.get("/", auth, roleCheck(["admin"]), async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  
  // Get total count of users for pagination
  const totalCount = await User.countDocuments({});

  const data = await User.find({}, { password: 0 })
    .skip(skip)
    .limit(limit);
  
  res.status(200).json({
    error: false,
    message: "All Users.",
    data,
    totalCount
  });
});


export default router;
