"use client";
import { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { forgotPassword } from "@/lib/auth";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      toast.success("Password reset link sent to your email");
      setMessage({ type: "success", text: "Password reset link sent to your email. (Expiration time: 4 hours)" });
      setEmail("");
    } catch (err) {
      toast.error(err.message || "Failed to send password reset link");
      setMessage({ type: "error", text: err.message || "Failed to send password reset link" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="w-full max-w-2xl h-auto flex flex-col rounded-lg shadow-lg overflow-hidden bg-white p-6 md:p-12">
        <form
          className="flex flex-col items-center w-full max-w-sm"
          onSubmit={handleSubmit}>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6">
            Forgot Password
          </h1>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            value={email}
            required
            className="outline-none border-none w-full p-4 rounded-lg bg-gray-100 mb-4 text-sm"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-500 text-white font-bold py-3 rounded-lg transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
            }`}>
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <div
            className={`flex items-center mt-4 p-4 w-full rounded-lg text-sm ${
              message.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}>
            {message.type === "success" ? (
              <AiOutlineCheckCircle className="mr-2 text-lg" />
            ) : (
              <AiOutlineCloseCircle className="mr-2 text-lg" />
            )}
            {message.text}
          </div>
        )}

        <Link href="/login">
          <button
            type="button"
            className="bg-gray-200 text-gray-500 font-bold py-3 px-6 rounded-full mt-6 hover:bg-gray-300 transition">
            Back to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
