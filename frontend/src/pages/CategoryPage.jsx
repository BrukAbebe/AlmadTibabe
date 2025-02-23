import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCategoryById } from "../services/categoryService";
import ProductCard from "../components/Product/ProductCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { categories, loadingCategories } = useAuth();
  const [categoryId, setCategoryId] = useState(state?.categoryId || null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const limit = 10;

  // Capitalize the first letter of the category name
  const capitalizedCategoryName =
    categoryName && categoryName.length > 0
      ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase()
      : categoryName;

  useEffect(() => {
    if (categories.length > 0 && categoryName) {
      const foundCategory = categories.find(
        (c) => c.name.toLowerCase() === categoryName.toLowerCase()
      );
      if (foundCategory) {
        setCategoryId(foundCategory._id);
      } else {
        setError("Category not found.");
        setLoading(false);
      }
    }
  }, [categories, categoryName]);

  useEffect(() => {
    if (categoryId) {
      const fetchCategoryData = async () => {
        setLoading(true);
        try {
          const response = await getCategoryById(categoryId, page, limit);
          if (response.status === "success") {
            setCategoryData(response.data);
            setTotalResults(response.totalResults);
          } else {
            setError("Failed to fetch products.");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCategoryData();
    }
  }, [categoryId, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 min-h-screen flex flex-col">
     
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm sm:text-base text-[#fc9319] hover:text-[#e07c0e] mb-4"
      >
        <FiChevronLeft className="mr-2" /> Back
      </button>

      <header className="mb-8 text-center border-b pb-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          {capitalizedCategoryName} 
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        {loading || loadingCategories ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-96" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-600 mb-4 text-4xl">⚠️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Loading Error</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        ) : categoryData && categoryData.length > 0 ? (
          <div
            className={`grid gap-8 ${
              categoryData.length >= 4
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : categoryData.length === 3
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                : categoryData.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "flex justify-center"
            }`}
          >
            {categoryData.map((product) => (
              <div
                key={product._id}
                className={
                  categoryData.length === 1
                    ? "w-full max-w-md mx-auto" 
                    : ""
                }
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">No products found in this category.</div>
        )}
      </div>

      {/* Pagination Buttons */}
      {categoryData && categoryData.length > 0 && (
        <div className="mt-8 pb-8 flex justify-center space-x-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <FiChevronLeft className="mr-2" /> Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page * limit >= totalResults}
            className="flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next <FiChevronRight className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
