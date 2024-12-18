import User from "../models/User.js";
import { userAdminValidation } from "../utils/validationSchema.js";

class AdminController {
  // Get all users
  getAllUsers = async (req, res) => {
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

  // Get user by id
  getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id, { password: 0 });
      if (!user) {
        return res.status(404).json({
          error: true,
          message: "User not found.",
        });
      }
      res.status(200).json({
        error: false,
        message: "User found.",
        data: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Internal Server Error.",
      });
    }
  };

  // Update user by ID
  updateUserById = async (req, res) => {
    try {
      const { error } = userAdminValidation(req.body);
      if (error) {
        return res.status(400).json({
          error: true,
          message: error.details[0].message,
        });
      }
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true, select: "-password" }
      );
      if (!user) {
        return res.status(404).json({
          error: true,
          message: "User not found.",
        });
      }
      res.status(200).json({
        error: false,
        message: "User updated successfully.",
        data: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Internal Server Error.",
      });
    }
  };

  // Delete user by id
  deleteUserById = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id, {
        select: "-password",
      });
      if (!user) {
        return res.status(404).json({
          error: true,
          message: "User not found.",
        });
      }
      res.status(200).json({
        error: false,
        message: "User deleted successfully.",
        data: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Internal Server Error.",
      });
    }
  };
}

export default new AdminController();
