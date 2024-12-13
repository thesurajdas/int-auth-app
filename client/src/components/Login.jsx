"use client";
import { useState } from "react";
import Link from "next/link";
import { login } from "@/lib/auth";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(data.email, data.password);
      window.location.href = "/dashboard"; // Redirect to the homepage after login
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl h-auto lg:h-[500px] flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 md:p-12">
          <form
            className="flex flex-col items-center w-full max-w-sm"
            onSubmit={handleSubmit}>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6">
              Login to Your Account
            </h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="outline-none border-none w-full p-4 rounded-lg bg-gray-100 mb-4 text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="outline-none border-none w-full p-4 rounded-lg bg-gray-100 mb-4 text-sm"
            />
            {error && (
              <div className="w-full p-4 bg-red-500 text-white text-sm rounded-lg text-center mb-4">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition">
              Sign In
            </button>
            <Link href="/forgot-password">
              <p className="text-sm text-green-500 hover:text-green-600 mt-4 cursor-pointer">
                Forgot Password?
              </p>
            </Link>
          </form>
          <Link href="/">
            <button
              type="button"
              className="bg-gray-200 text-gray-500 font-bold py-3 px-6 rounded-full mt-6 hover:bg-gray-300 transition">
              Back to Home
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-green-500 text-white p-6 md:p-12">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">New Here?</h1>
          <Link href="/register">
            <button
              type="button"
              className="bg-white text-green-500 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
