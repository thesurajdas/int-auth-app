"use client";
import Card from "@/components/Card";
import UserTable from "@/components/UserTable";
import { getAllUsers } from "@/lib/auth";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const usersPerPage = 1;

  // Fetch users from the API based on pagination
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const data = await getAllUsers(
        `/user?page=${page}&limit=${usersPerPage}`
      );
      if (data.error) {
        console.error(data.message);
      } else {
        setUsers(data);
        setTotalPages(Math.ceil(data.totalCount / usersPerPage)); // Adjust total pages based on response
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchUsers when the component mounts or the current page changes
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <>
      <section className="flex flex-col mx-3">
        <h2 className="text-2xl font-bold py-5">Admin Dashboard</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <Card
            title="Total User"
            totalUsers={users.totalCount}
            icon={<FaUsers size={24} />}
          />
        </div>
        {users.data && (
          <UserTable
            users={users.data}
            loading={loading}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </section>
    </>
  );
}
