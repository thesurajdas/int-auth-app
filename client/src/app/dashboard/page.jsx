"use client";
import LoggedNavbar from "@/components/LoggedNavbar";
import UserProfileCard from "@/components/UserProfileCard";
import { getCurrentUser } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      const res = await getCurrentUser();
      setUser(res.data);
    };
    getUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <LoggedNavbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-6">
          Welcome, {user?.name}
        </h1>
        <div className="flex justify-center">
          {user && <UserProfileCard user={user} />}
        </div>
      </main>
    </div>
  );
}
