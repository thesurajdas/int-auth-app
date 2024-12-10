"use client";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/auth";
import Link from "next/link";

const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    <header className="w-full bg-green-500 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl md:text-2xl font-bold">AuthApp</h1>
        <nav className="flex items-center gap-4">
          {!isLoggedIn && (
            <>
              <Link href="/login">
                <button className="text-white hover:text-gray-200 text-sm md:text-base">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-white text-green-500 font-bold py-2 px-4 rounded-md hover:bg-gray-100 text-sm md:text-base">
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link href="/dashboard">
                <button className="text-white hover:text-gray-200 text-sm md:text-base">
                  Dashboard
                </button>
              </Link>
              <button
                className="bg-white text-green-500 font-bold py-2 px-4 rounded-md hover:bg-gray-100 text-sm md:text-base"
                onClick={logout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
