"use client";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { editProfile } from "@/services/userService.js";
import Link from "next/link";

const EditProfileCard = ({ user }) => {
  const [userData, setUserData] = useState({
    name: user?.name || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProfile(userData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
      <Image
        src={"/avatar.png"}
        alt="User Avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4"
        width={96}
        height={96}
      />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 disabled:bg-slate-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            value={user?.roles[0] || "user"}
            disabled
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 disabled:bg-slate-200"
          />
        </div>
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="py-2 px-6 bg-green-600 text-white rounded-full text-sm">
            Save Changes
          </button>
          <Link
            href={"/dashboard"}
            type="button"
            className="py-2 px-6 bg-gray-300 rounded-full text-sm">
            Back to Dashboard
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProfileCard;
