import { Router } from "express";
import {
  register,
  login,
  logout,
  verifyEmail,
  confirmEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.post("/forgot-password", forgotPassword); // Send password reset email
router.post("/reset-password", resetPassword); // Reset password
router.get("/verify-email", verifyEmail); // Send email verification
router.post("/verify-email", confirmEmail); // Confirm email verification

export default router;
