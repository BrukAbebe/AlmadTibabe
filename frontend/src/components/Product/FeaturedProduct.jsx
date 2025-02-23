import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ProductCard";
import { GetAllProducts } from "../../services/productService";

function FeaturedProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await GetAllProducts();
        const allProducts = response.data;

        const featuredProducts = allProducts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);

        setProducts(featuredProducts);
      } catch (err) {
        setError("Failed to load featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <header className="mb-8 text-center pb-3">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 text-center leading-tight">
          Featured Products
        </h1>
        <div className="h-1 mb-12 bg-gradient-to-r from-[#fc9319] to-[#f57e22] w-36 mx-auto rounded-lg"></div>
        <p className="text-gray-600 mt-2">Check out our latest featured items!</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-40 sm:h-48 md:h-56" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <div className="text-red-600 mb-4 text-4xl">⚠️</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Loading Error
          </h3>
          <p className="text-gray-500">{error}</p>
        </div>
      ) : (
        <>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}

export default FeaturedProduct;
