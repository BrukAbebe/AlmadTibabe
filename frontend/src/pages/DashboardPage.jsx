import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FiPackage, FiUsers, FiBarChart2, FiRefreshCw } from "react-icons/fi";
import { GetAllProducts } from "../services/productService";

const DashboardPage = () => {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.message);
  const [stats, setStats] = useState({
    productCount: 0
  });
  const [loading, setLoading] = useState({
    products: true
  });
  const [error, setError] = useState(null);
  const userName = "Hasset";

  const fetchProductData = async () => {
    try {
      setLoading(prev => ({ ...prev, products: true }));
      const response = await GetAllProducts(1, 1);
      setStats(prev => ({
        ...prev,
        productCount: response.totalResults
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (error && !stats.productCount) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 text-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={fetchProductData}
          className="bg-[#fc9319] text-white px-4 py-2 rounded hover:bg-[#e07c0e]"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8 max-w-2xl mx-auto">
        {/* Products Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#fff5eb] text-[#fc9319] mr-4">
              <FiPackage size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-500">Total Products</h3>
              {loading.products ? (
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-800">
                  {stats.productCount.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
        <Link
          to="/dashboard/add-product"
          className="inline-flex items-center justify-center px-6 py-3 bg-[#fc9319] text-white rounded-lg hover:bg-[#e07c0e] transition-colors font-medium"
        >
          <FiPackage className="mr-2" />
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;