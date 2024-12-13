import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ["user", "admin"],
      default: ["user"],
    },
    isVerified: {
      type: Boolean,
      default: false, // Initially, the email is not verified
    },
    emailVerificationOTP: {
      type: String, // Store the JWT or random string for email verification
      default: null,
    },
    passwordResetToken: {
      type: String, // Store the JWT or random string for password reset
      default: null,
    },
    passwordResetTokenExpiry: {
      type: Date, // Store the expiry date of the password reset token
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
