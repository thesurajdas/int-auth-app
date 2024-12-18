"use client";
import { useState } from "react";
import Link from "next/link";
import { register } from "@/lib/auth";
import toast from "react-hot-toast";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(data.name, data.email, data.password);
      window.location.href = "/verify";
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl h-auto flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-green-500 text-white p-6 md:p-12">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            Welcome Back
          </h1>
          <Link href="/login">
            <button className="bg-white text-green-500 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
              Sign In
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 md:p-12">
          <form
            className="flex flex-col items-center w-full max-w-sm"
            onSubmit={handleSubmit}>
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">
              Create Account
            </h1>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className="w-full p-4 rounded-lg bg-gray-100 mb-4 text-sm outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="w-full p-4 rounded-lg bg-gray-100 mb-4 text-sm outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="w-full p-4 rounded-lg bg-gray-100 mb-4 text-sm outline-none"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition">
              Sign Up
            </button>
          </form>
          <Link href="/">
            <button
              type="button"
              className="bg-gray-200 text-gray-500 font-bold py-3 px-6 rounded-full mt-6 hover:bg-gray-300 transition">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
