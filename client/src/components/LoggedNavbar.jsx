"use client";
import Link from "next/link";

const LoggedNavbar = () => {
  return (
    <nav className="w-full bg-green-500 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="text-white hover:text-gray-200 text-sm md:text-base">
              Home
            </button>
          </Link>
          <Link href="/logout">
            <button className="bg-white text-green-500 font-bold py-2 px-4 rounded-md hover:bg-gray-100 text-sm md:text-base">
              Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LoggedNavbar;
