"use client";

import Image from "next/image";
import Link from "next/link";

const UserProfileCard = ({ user }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 text-center">
      <Image
        src={"/avatar.png"}
        alt="User Avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4"
        width={96}
        height={96}
      />
      <h2 className="text-xl font-semibold mb-2">{user?.name || "John Doe"}</h2>
      <p className="text-gray-600">{user?.email || "johndoe@example.com"}</p>
      <div className="text-sm text-gray-500">
        <p>Role: {user?.roles[0] || "Unkown"}</p>
      </div>
      <Link href="/dashboard/edit-profile">
        <button className="m-2 py-2 px-3 rounded-full bg-green-600 text-white text-sm">
          Edit Profile
        </button>
      </Link>
    </div>
  );
};

export default UserProfileCard;
