"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Provider to wrap the application and provide global auth state
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        // Checking authentication from cookies or an API
        const accessToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("isAuth="))
          ?.split("=")[1];

        setIsLoggedIn(!!accessToken);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
