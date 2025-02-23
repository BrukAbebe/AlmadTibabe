import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <article
      className="group relative bg-white border border-gray-200  overflow-hidden hover:shadow-md transition-all duration-300 ease-out cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
      role="link"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && navigate(`/product/${product._id}`)}
      aria-label={`View ${product.name} product page`}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.mainImage?.secure_url ? (
          <img
            src={product.mainImage.secure_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xs">
            No Image Available
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3">
        <h3 className="text-sm md:text-base text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-xs md:text-sm text-primary-600">
            {product.currency}&nbsp; 
            {product.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
