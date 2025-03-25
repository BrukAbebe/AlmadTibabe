import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-gray-100">
      <h1 className="text-6xl font-bold text-[#fc9319]">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-2">Oops! Page Not Found</h2>
      <p className="text-gray-600 mt-4 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 bg-[#fc9319] text-white px-6 py-2 rounded-lg text-lg hover:bg-[#e07c0e] transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
