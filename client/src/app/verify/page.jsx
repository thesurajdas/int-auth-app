"use client";
import VerifyEmail from "@/components/VerifyEmail";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Verify() {
  const { user, isVerified, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isVerified) {
      window.location.href = "/dashboard";
    }
  }, [isVerified, router]);

  if (loading) return <p>Loading...</p>;

  return user?.email ? <VerifyEmail email={user.email} /> : null;
}
