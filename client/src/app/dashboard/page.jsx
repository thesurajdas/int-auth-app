"use client";
import { useEffect, useState } from "react";
import UserProfileCard from "@/components/UserProfileCard";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default function Page() {
  const { isVerified, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isVerified !== true) {
      router.push("/verify");
    }
  }, [loading, isVerified, router]);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData.data);
    };
    getUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-6">
        Welcome, {user?.name}
      </h1>
      <div className="flex justify-center">
        {user && <UserProfileCard user={user} />}
      </div>
    </main>
  );
}
