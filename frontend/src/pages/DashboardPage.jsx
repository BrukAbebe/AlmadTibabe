import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const DashboardPage = () => {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.message);
  const userName = "Hasset";

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg pt-32">
      {successMessage && (
        <p className="text-green-600 text-sm sm:text-base md:text-lg font-semibold text-center mb-4">
          {successMessage}
        </p>
      )}

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4">
        Welcome to the Dashboard, {userName}!
      </h1>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center mb-8">
        This is your dashboard where you can manage your account and products.
      </p>

      <div className="text-center">
        <Link
          to="/dashboard/add-product"
          className={`
            inline-block px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all duration-300
            ${
              userName === "Hasset"
                ? "bg-[#fc9319] text-white hover:bg-white hover:text-[#fc9319] hover:border-[#fc9319] border-2"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }
            text-sm sm:text-base md:text-lg
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fc9319]
          `}
        >
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
