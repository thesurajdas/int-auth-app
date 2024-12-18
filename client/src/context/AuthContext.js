"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

// Helper function to extract a specific cookie value
const getCookieValue = (cookieName) => {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${cookieName}=`))
    ?.split("=")[1];
};

// Provider to wrap the application and provide global auth and role state
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);

        // Retrieve the refresh token from cookies
        const refreshToken = getCookieValue("refreshToken");

        if (refreshToken) {
          const userData = await getCurrentUser();
          if (userData?.data) {
            setUser(userData.data);
            setIsLoggedIn(true);
            if (userData.data.isVerified === true) {
              setIsVerified(true);
            }
          } else {
            throw new Error("User data not found");
          }
        } else {
          console.log("You are not LoggedIn!");
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, isVerified }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth and role state
export const useAuth = () => useContext(AuthContext);
