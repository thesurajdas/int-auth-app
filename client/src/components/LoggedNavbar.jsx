"use client";
import { logout } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LoggedNavbar = () => {
  const pathname = usePathname();

  // Define the path(s) where the button should be hidden
  const hideButtonPaths = ["/dashboard/admin"];

  // Check if the current pathname matches any of the paths to hide the button
  const shouldShowButton = !hideButtonPaths.includes(pathname);
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
          {shouldShowButton && (
            <Link href="/dashboard/admin">
              <button className="bg-white text-green-500 font-bold py-2 px-4 rounded-md hover:bg-gray-100 text-sm md:text-base">
                Admin Dashboard
              </button>
            </Link>
          )}
          {!shouldShowButton && (
            <Link href="/dashboard">
              <button className="bg-white text-green-500 font-bold py-2 px-4 rounded-md hover:bg-gray-100 text-sm md:text-base">
                User Dashboard
              </button>
            </Link>
          )}
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-100 text-sm md:text-base"
            onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LoggedNavbar;
