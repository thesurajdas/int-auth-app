"use client";

import LoggedNavbar from "@/components/LoggedNavbar";
import UserProfileCard from "@/components/UserProfileCard";

export default function Page() {
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "/jane-avatar.png",
    role: "Admin",
    memberSince: "2022",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <LoggedNavbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-6">
          Welcome, {user.name}
        </h1>
        <div className="flex justify-center">
          <UserProfileCard user={user} />
        </div>
      </main>
    </div>
  );
}
