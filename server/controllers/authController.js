import bcrypt from "bcrypt";
import User from "../models/User.js";
import {
  emailVerifyValidation,
  loginBodyValidation,
  mailValidation,
  passwordResetValidation,
  registerBodyValidation,
} from "../utils/validationSchema.js";
import {
  generateTokens,
  generateStringToken,
  generateOTP,
} from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { error } = registerBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: true, message: "User with given email already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userData = await new User({
      ...req.body,
      password: hashedPassword,
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
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
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
        .json({ error: true, message: "Invalid email address!" });
    }

    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifiedPassword) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid password!" });
    }

    const {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    } = await generateTokens(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 14 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
      message: "Login successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ error: false, message: "Logged out successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    // Validate email input
    const { error } = mailValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User with the provided email does not exist.",
      });
    }

    // Generate verification token
    const token = generateStringToken();
    user.passwordResetToken = token;
    user.passwordResetTokenExpiry = Date.now() + 3600 * 4000; // 1-hour expiration
    await user.save();

    const verificationLink = `${process.env.ORIGIN}/reset-password?token=${token}`;
    await sendEmail({
      to: req.body.email,
      subject: "Password Reset Request",
      text: `Your password reset link will expire in 4 hour: ${verificationLink}`,
    });

    res.status(200).json({
      error: false,
      message: "Password reset instructions sent successfully!",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res
      .status(500)
      .json({ error: true, message: "An unexpected error occurred." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // Validate password input
    const { error } = passwordResetValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    // Extract token and new password from the request body
    const { token, newPassword } = req.body;

    // Find user by email verification token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpiry: { $gt: Date.now() }, // Ensure the token has not expired
    });

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid or expired password reset token.",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and clear the reset token and expiry
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetTokenExpiry = null;
    await user.save();

    // Send password reset confirmation email
    await sendEmail({
      to: user.email,
      subject: "Password Reset Confirmation",
      text: "Your password has been reset successfully.",
    });

    res.status(200).json({
      error: false,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res
      .status(500)
      .json({ error: true, message: "An unexpected error occurred." });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    // Send email verification
    const { error } = mailValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User with the provided email does not exist.",
      });
    }

    // Generate verification otp
    const otp = generateOTP(6);
    user.isVerified = false;
    user.emailVerificationOTP = otp;
    await user.save();

    await sendEmail({
      to: req.body.email,
      subject: "Email Verification",
      text: `Your email verification OTP is: ${otp}`,
    });

    res
      .status(200)
      .json({ error: false, message: "Verification email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    // Validate email and OTP
    const { error } = emailVerifyValidation(req.body);
    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User with the provided email does not exist.",
      });
    }

    // Verify OTP
    if (user.emailVerificationOTP !== req.body.otp) {
      return res.status(400).json({
        error: true,
        message: "Invalid or expired OTP.",
      });
    }

    // Confirm email verification
    user.isVerified = true;
    user.emailVerificationOTP = null; // Clear the OTP after successful verification
    await user.save();

    // send email verification confirmation
    await sendEmail({
      to: req.body.email,
      subject: "Email Verification Confirmation",
      text: "Your email has been verified successfully.",
    });

    res.status(200).json({
      error: false,
      message: "Email successfully verified.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
