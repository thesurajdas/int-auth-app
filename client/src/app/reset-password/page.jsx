"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { resetPassword } from "@/lib/auth";

const ResetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordData, setPasswordData] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("Confirm Passsword do not match!");
      }
      await resetPassword(token, passwordData.newPassword);
      toast.success("Password reset successfully");
      setMessage({ type: "success", text: "Password reset successfully" });
      setPasswordData({
        token: "",
        newPassword: "",
        confirmPassword: "",
      });
      router.push("/login");
    } catch (err) {
      toast.error(err.message || "Failed to reset password");
      setMessage({
        type: "error",
        text: err.message || "Failed to reset password",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl h-auto flex flex-col rounded-lg shadow-lg overflow-hidden bg-white p-6 md:p-12">
        <form
          className="flex flex-col items-center w-full max-w-sm"
          onSubmit={handleSubmit}>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6">
            Reset Password
          </h1>
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            onChange={handleChange}
            value={passwordData.newPassword}
            required
            className="outline-none border-none w-full p-4 rounded-lg bg-gray-100 mb-4 text-sm"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            value={passwordData.confirmPassword}
            required
            className="outline-none border-none w-full p-4 rounded-lg bg-gray-100 mb-4 text-sm"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-500 text-white font-bold py-3 rounded-lg transition ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green-600"
            }`}>
            {isSubmitting ? "Submitting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <div
            className={`flex items-center mt-4 p-4 w-full rounded-lg text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}>
            {message.type === "success" ? (
              <AiOutlineCheckCircle className="mr-2 text-lg" />
            ) : (
              <AiOutlineCloseCircle className="mr-2 text-lg" />
            )}
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
