"use client";

const UserTable = ({ users, loading, currentPage, handlePageChange, totalPages }) => {
  return (
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
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{user._id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.roles[0]}</td>
                </tr>
              ))
            )}
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
  );
};

export default UserTable;
