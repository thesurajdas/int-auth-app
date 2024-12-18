"use client";
import { useState, useEffect } from "react";

const EditUserModal = ({ isOpen, onClose, userData, onSave }) => {
  const [updatedData, setUpdatedData] = useState({
    _id: userData?._id || "",
    name: userData?.name || "",
    email: userData?.email || "",
    isVerified: userData?.isVerified || "false",
  });
  useEffect(() => {
    setUpdatedData({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      isVerified: userData.isVerified,
    });
  }, [userData]);
  const handleSave = () => {
    onSave(updatedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Edit User Data
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="_id"
              className="block text-sm font-medium text-gray-700">
              ID
            </label>
            <input
              type="text"
              id="_id"
              value={updatedData._id}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 disabled:bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={updatedData.name}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, name: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={updatedData.email}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, email: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="isVerified"
              className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="isVerified"
              value={updatedData.isVerified}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, isVerified: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
