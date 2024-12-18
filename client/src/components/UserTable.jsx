"use client";

import { useState } from "react";
import EditUserModal from "./EditUserModal";

const UserTable = ({
  users,
  loading,
  currentPage,
  handlePageChange,
  totalPages,
  handleSave,
  handleDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    isVerified: false,
  });

  return (
    <>
      <div className="container mx-auto p-4">
        {/* Wrapping the table with overflow-x-auto for responsiveness */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border border-gray-200 rounded-md shadow-md">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-b animate-pulse">
                      <td className="p-3">
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                      </td>
                      <td className="p-3">
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="p-3">
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="p-3">
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="p-3">
                        <div className="h-6 bg-gray-300 rounded w-16"></div>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <div className="h-8 w-16 bg-gray-300 rounded-xl"></div>
                          <div className="h-8 w-16 bg-gray-300 rounded-xl"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                : users.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-100">
                      <td className="p-3 text-sm text-gray-800">{user._id}</td>
                      <td className="p-3 font-bold">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3 text-xs">
                        {user.roles[0] === "admin" ? (
                          <span className="bg-yellow-500 text-white py-1 px-2 text-center rounded-full">
                            admin
                          </span>
                        ) : (
                          <span className="bg-slate-300 text-black py-1 px-2 text-center rounded-full">
                            {user.roles[0]}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {user.isVerified ? (
                          <span className="bg-green-500 text-white text-sm py-1 px-2 text-center rounded-full">
                            active
                          </span>
                        ) : (
                          <span className="bg-red-500 text-white text-sm py-1 px-2 text-center rounded-full">
                            inactive
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              setUserData({
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                                isVerified: user.isVerified,
                              });
                              setIsModalOpen(true);
                            }}
                            className="bg-blue-500 hover:bg-blue-600 p-2 rounded-xl text-white">
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const res = confirm(
                                "Are you sure you want to delete this user?"
                              );
                              if (res) {
                                handleDelete(user._id);
                              }
                            }}
                            className="bg-red-500 hover:bg-red-600 p-2 rounded-xl text-white">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 mx-2 text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-300"
            disabled={currentPage === 1}>
            Prev
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 mx-2 text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-300"
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      <EditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={userData}
        onSave={handleSave}
      />
    </>
  );
};

export default UserTable;
