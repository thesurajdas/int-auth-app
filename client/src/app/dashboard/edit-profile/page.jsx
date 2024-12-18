"use client";
import EditProfileCard from "@/components/EditProfileCard";
import { getCurrentUser } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function EditProfile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData.data);
    };
    getUser();
  }, []);
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-6">
        Update Profile
      </h1>
      <div className="flex justify-center">
        {user && <EditProfileCard user={user} />}
      </div>
    </main>
  );
}
