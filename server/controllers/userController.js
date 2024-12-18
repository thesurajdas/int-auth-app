import User from "../models/User.js";
import { userValidation } from "../utils/validationSchema.js";
/**
 * Get the authenticated user's details.
 */
export const getMe = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.user._id });
    if (!data) {
      return res.status(404).json({
        error: true,
        message: "User not found.",
      });
    }

    const userData = {
      name: data.name,
      email: data.email,
      roles: data.roles,
      isVerified: data.isVerified,
    };

    res
      .status(200)
      .json({ error: false, message: "User Authenticated.", data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error.",
    });
  }
};

/**
 * Get all users with server-side pagination.
 */
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Get total count of users for pagination
    const totalCount = await User.countDocuments({});

    const data = await User.find({}, { password: 0 }).skip(skip).limit(limit);

    res.status(200).json({
      error: false,
      message: "All Users.",
      data,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error.",
    });
  }
};

export const editMe = async (req, res) => {
  try {
    const { error } = userValidation(req.body);
    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }
    const data = await User.findOne({ _id: req.user._id });
    if (!data) {
      return res.status(404).json({
        error: true,
        message: "User not found.",
      });
    }

    const { name } = req.body;

    if (name) {
      data.name = name;
    }

    await data.save();

    res.status(200).json({
      error: false,
      message: "User details updated.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error.",
    });
  }
};
