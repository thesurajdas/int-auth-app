import Link from "next/link";

export default function UnauthorizedPage() {
    return (
      <div className="min-h-screen bg-green-50 flex justify-center items-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-sm mx-auto">
          <h1 className="text-4xl font-extrabold text-green-600 mb-4">403</h1>
          <p className="text-lg text-gray-700 mb-4">You do not have permission to access this page.</p>
          <Link
            href="/"
            className="text-white bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md transition duration-200 ease-in-out"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }