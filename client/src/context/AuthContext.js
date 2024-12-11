"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "@/lib/auth";

const AuthContext = createContext();

// Provider to wrap the application and provide global auth and role state
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Stores user details including roles
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const userData = await getCurrentUser();

        if (!userData) {
          setIsLoggedIn(false);
          setUser(null);
        } else {
          setUser(userData.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth and role state
export const useAuth = () => useContext(AuthContext);
