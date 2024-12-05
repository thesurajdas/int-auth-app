"use client";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-[900px] h-[500px] flex rounded-lg shadow-lg">
        {/* Left Section */}
        <div className="flex-2 flex flex-col items-center justify-center bg-white rounded-l-lg p-6">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-semibold mb-6">
              Login to Your Account
            </h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="outline-none border-none w-[370px] p-4 rounded-lg bg-gray-100 mb-2 text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="outline-none border-none w-[370px] p-4 rounded-lg bg-gray-100 mb-2 text-sm"
            />
            {error && (
              <div className="w-[370px] p-4 bg-red-500 text-white text-sm rounded-lg text-center mb-2">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-3 px-6 rounded-full mt-2 hover:bg-green-600 transition">
              Sign In
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-green-500 text-white rounded-r-lg p-6">
          <h1 className="text-3xl font-semibold mb-4">New Here?</h1>
          <Link href="/register">
            <button
              type="button"
              className="bg-white text-green-500 font-bold py-3 px-6 rounded-full mt-2 hover:bg-gray-100 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
