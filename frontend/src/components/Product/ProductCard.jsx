import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import { deleteProductData } from "./../../services/productService";
import { toast } from "react-toastify";

function ProductCard({ product, onDelete }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-product/${product._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const response = await deleteProductData(product._id);
      if (response.status === "success") {
        if (onDelete) {
          onDelete(product._id);
        }
        toast.success("Product deleted successfully!");
      } else {
        toast.error("Failed to delete product. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to delete product. Please try again later.");
    }
  };

  return (
    <div className="group flex flex-col bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 ease-out cursor-pointer">
      <div
        className="relative aspect-square overflow-hidden bg-gray-100"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        {product.mainImage?.secure_url ? (
          <img
            src={product.mainImage.secure_url}
            alt={product.name || "Product Image"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xs">
            No Image Available
          </div>
        )}
      </div>

      <div
        className="p-3 flex-grow"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <div className="text-sm md:text-base text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
          {product.name || <div className="invisible">Placeholder</div>}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs md:text-sm text-primary-600">
            {product.currency}&nbsp;
            {product.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      {isAdmin && (
        <div className="p-3 border-t border-gray-200 flex justify-between">
          <button
            onClick={handleEdit}
            className="bg-[#3b82f6] text-white px-4 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-white hover:text-[#3b82f6] hover:border-[#3b82f6] border-2 transition-all duration-300"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-[#ef4444] text-white px-4 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-white hover:text-[#ef4444] hover:border-[#ef4444] border-2 transition-all duration-300"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
