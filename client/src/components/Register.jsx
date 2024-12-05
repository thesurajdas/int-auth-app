"use client"
import { useState } from "react";
import Link from "next/link";

const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      router.push("/login");
      console.log(res.message);
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
        <div className="flex-1 flex flex-col items-center justify-center bg-green-500 text-white rounded-l-lg p-6">
          <h1 className="text-3xl font-semibold mb-4">Welcome Back</h1>
          <Link href="/login">
            <button className="bg-white text-green-500 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition">
              Sign In
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex-2 flex flex-col items-center justify-center bg-white rounded-r-lg p-6">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-semibold mb-6">Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="w-[370px] p-4 rounded-lg bg-gray-100 mb-2 text-sm outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="w-[370px] p-4 rounded-lg bg-gray-100 mb-2 text-sm outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="w-[370px] p-4 rounded-lg bg-gray-100 mb-2 text-sm outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="w-[370px] p-4 rounded-lg bg-gray-100 mb-2 text-sm outline-none"
            />
            {error && (
              <div className="w-[370px] p-4 bg-red-500 text-white text-sm rounded-lg text-center mb-2">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-3 px-6 rounded-full mt-2 hover:bg-green-600 transition">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
