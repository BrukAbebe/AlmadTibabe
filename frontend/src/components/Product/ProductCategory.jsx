import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import menImage from "../../assets/images/men.png";
import womenImage from "../../assets/images/women.png";
import kidsImage from "../../assets/images/kid.png";
import familyImage from "../../assets/images/family.png";
import culturalImage from "../../assets/images/cultural.png";
import holidayImage from "../../assets/images/holiday.png";
import weddingImage from "../../assets/images/wedding.png";
import otherImage from "../../assets/images/other.png";

const categories = [
  { name: "Men", image: menImage },
  { name: "Women", image: womenImage },
  { name: "Kids", image: kidsImage },
  { name: "Family", image: familyImage },
  { name: "Cultural", image: culturalImage },
  { name: "Holiday", image: holidayImage },
  { name: "Wedding", image: weddingImage },
  { name: "Other", image: otherImage },
];

function ProductCategory() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  React.useEffect(() => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 text-center leading-tight">
        Shop by Category
      </h2>
      <div className="h-1 mb-12 bg-gradient-to-r from-[#fc9319] to-[#f57e22] w-36 mx-auto rounded-lg"></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {categories.map((category, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link
              to={`/category/${category.name.toLowerCase()}`}
              className="group relative block rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover transition-all duration-300 group-hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 group-hover:bg-opacity-0 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white group-hover:text-gray-900 transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
              <div className="absolute inset-0 bg-transparent group-hover:bg-opacity-40 transition-all duration-300"></div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ProductCategory;
