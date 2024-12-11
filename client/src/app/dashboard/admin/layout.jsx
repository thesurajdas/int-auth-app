"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import UnauthorizedPage from "@/components/unauthorized";

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  useEffect(() => {
    if (!loading) {
      if (!user?.roles?.includes("admin")) {
        setHasAccess(false);
      } else {
        setHasAccess(true);
      }
    }
  }, [loading, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasAccess) {
    return <UnauthorizedPage />;
  }

  return <main>{children}</main>;
}
