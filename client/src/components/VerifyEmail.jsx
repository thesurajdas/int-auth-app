"use client";
import { confirmEmail, verifyEmail } from "@/lib/auth";
import { useState } from "react";
import toast from "react-hot-toast";

const VerifyEmail = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);
    try {
      await verifyEmail(email);
      toast.success("Verification email has been resent.");
    } catch (err) {
      toast.error("Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await confirmEmail(email, otp);
      toast.success("Email verified successfully.");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error("Invalid OTP.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl h-auto flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-green-500 text-white p-6 md:p-12">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            Verify Your Email
          </h1>
          <p className="text-center text-sm md:text-base">
            A verification email has been sent to <strong>{email}</strong>.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 md:p-12">
          <form
            className="flex flex-col items-center w-full max-w-sm"
            onSubmit={handleConfirm}>
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">
              Confirm Email
            </h1>

            <input
              type="email"
              value={email}
              disabled
              className="w-full p-4 rounded-lg bg-gray-200 mb-4 text-sm outline-none cursor-not-allowed"
            />

            <input
              type="text"
              placeholder="Enter OTP"
              name="otp"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              required
              className="w-full p-4 rounded-lg bg-gray-100 mb-4 text-sm outline-none"
            />

            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition">
              Verify OTP
            </button>
          </form>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className={`bg-gray-200 text-gray-500 font-bold py-3 px-6 rounded-full mt-6 hover:bg-gray-300 transition ${
              resending ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {resending ? "Resending..." : "Resend Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
