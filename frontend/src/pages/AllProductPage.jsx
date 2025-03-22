import React, { useEffect, useState } from "react";
import ProductCard from "../components/Product/ProductCard";
import { GetAllProducts } from "../services/productService";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";



function AllProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await GetAllProducts(page, limit);
        setProducts(response.data);
        setTotalResults(response.totalResults);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleDelete = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
      {/* Centered Header */}
      <header className="mb-8 text-center border-b pb-3">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Our Collection
        </h1>
        {/* Product Count and Pagination Info in the Same Row */}
        <div className="mt-4 flex flex-wrap justify-between items-center border-t pt-3">
          <span className="text-sm text-gray-600">
            Page {page} of {Math.ceil(totalResults / limit)}
          </span>
          <span className="text-sm text-gray-600">
            {totalResults} products
          </span>
        </div>
      </header>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(limit)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 rounded-xl h-[400px]"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <div className="text-red-600 mb-4 text-4xl">⚠️</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Oops! Something went wrong.
          </h3>
          <p className="text-gray-500">
            We couldn't load the products. Please try again later.
          </p>
        </div>
      ) : (
        <>
          {/* Dynamic Product Grid */}
          <div
            className={`grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 pb-8 flex justify-center space-x-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              aria-label="Previous page"
            >
              <FiChevronLeft className="mr-2" /> Previous
            </button>

            {/* Page Numbers */}
            <div className="hidden sm:flex items-center space-x-2">
              {Array.from({ length: Math.ceil(totalResults / limit) }).map(
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      page === i + 1
                        ? "bg-primary-600 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    } transition-colors`}
                    aria-label={`Go to page ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page * limit >= totalResults}
              className="flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              aria-label="Next page"
            >
              Next <FiChevronRight className="ml-2" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AllProductPage;