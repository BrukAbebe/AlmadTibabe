import { useState, useEffect } from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.jpg";
import { useAuth } from "./../../context/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [isUpperNavVisible, setIsUpperNavVisible] = useState(true);
  const { isLoggedIn, logout, categories, loadingCategories } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsUpperNavVisible(false);
      } else {
        setIsUpperNavVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <motion.header
      animate={{
        height: isUpperNavVisible ? "auto" : "3.6rem",
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 w-full z-50 shadow-mdb bg-[linear-gradient(to_right,_#fc9319,_#f57e22)] bg-opacity-90 mb-15 "
    >
      <AnimatePresence>
        {isUpperNavVisible && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="bg-white bg-opacity-10 text-black py-0.5 px-4 flex justify-between items-center text-xs sm:text-sm md:text-base container mx-auto max-w-screen-xl"
          >
            <div className="text-white flex items-center gap-2">
              <FaPhoneAlt />
              <span>+251 910 836 486</span>
            </div>
            {isLoggedIn ? (
              <button
                onClick={logout}
                className=" text-white hover:bg-white hover:text-black p-0.5 rounded-md transition-all"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className=" text-white hover:bg-white hover:text-black p-0.5 rounded-md transition-all"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isUpperNavVisible ? 1 : 0,
          opacity: isUpperNavVisible ? 1 : 0,
        }}
        transition={{ duration: 0.01 }}
        className="w-full border-b border-gray-300"
      ></motion.div>

      <motion.div
        animate={{
          top: isUpperNavVisible ? "0.00001rem" : "0",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-white z-50 bg-opacity-0 py-1.5 px-6 flex justify-between items-center  relative container mx-auto max-w-screen-xl text-sm sm:text-base md:text-lg"
      >
        <Link to="/" className="flex items-center font-bold gap-2 group">
          <img
            src={logo}
            alt="Logo"
            className="transition-all group-hover:opacity-100 h-8 w-8 rounded-full group-hover:scale-110"
          />
          <span className=" text-white hidden md:inline transition-all   hover:text-black">
            Almida Tibabe
          </span>
        </Link>

        <nav className="hidden md:flex items-center text-white gap-6">
          <Link
            to="/"
            className="hover:bg-white hover:text-black p-2 rounded-md transition-all hover:scale-102"
          >
            Home
          </Link>
          <Link
            to="/all-products"
            className="hover:bg-white hover:text-black p-2 rounded-md transition-all hover:scale-102"
          >
            All Products
          </Link>
          <div
            className="relative group z-20"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button
              className="hover:bg-white hover:text-black p-2 rounded-md transition-all hover:scale-102"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              Categories
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{
                height: categoriesOpen ? "auto" : 0,
                opacity: categoriesOpen ? 1 : 0,
                y: categoriesOpen ? 0 : -10,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute left-0 top-full bg-[linear-gradient(to_right,_#fc9319,_#f57e22)] shadow-lg rounded-md p-2 w-48 md:w-48 z-10 overflow-hidden"
            >
              {loadingCategories ? (
                <div>Loading categories...</div>
              ) : (
                categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/category/${category.name.toLowerCase()}`}
                    state={{ categoryId: category._id }}
                    className="block px-4 py-2 hover:bg-white hover:text-black transition-all hover:scale-102 hover:text-lg"
                  >
                    {category.name}
                  </Link>
                ))
              )}
            </motion.div>
          </div>
          <Link
            to="/contact"
            className="hover:bg-white hover:text-black p-2 rounded-md transition-all hover:scale-102"
          >
            Contact Us
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 hover:bg-white hover:text-black p-2 rounded-md transition-all hover:scale-102"
          >
            <FiShoppingCart size={20} />
            <span>Cart</span>
          </Link>
          {isLoggedIn && (
            <Link
              to="/dashboard"
              className="hover:bg-white hover:text-black p-2 rounded-md transition-all hover:scale-102"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <button className="md:hidden z-50" onClick={() => setMenuOpen(true)}>
          <FiMenu size={24} />
        </button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={handleLinkClick}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-5 overflow-y-auto z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="mb-4" onClick={handleLinkClick}>
                <FiX size={24} />
              </button>
              <nav className="flex flex-col gap-4 text-sm sm:text-base relative">
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className="block py-2 px-4 active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600 transition-all active:scale-102 focus:scale-102 active:text-lg focus:text-lg"
                >
                  Home
                </Link>
                <Link
                  to="/all-products"
                  onClick={handleLinkClick}
                  className="block py-2 px-4 active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600 transition-all active:scale-102 focus:scale-102 active:text-lg focus:text-lg"
                >
                  All Products
                </Link>
                <div className="relative">
                  <button
                    className="block py-2 px-4 active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600 transition-all active:scale-102 focus:scale-102 active:text-lg focus:text-lg w-full text-left"
                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                  >
                    Categories
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      categoriesOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="ml-4 mt-2 bg-white shadow-lg rounded-md p-2">
                      {loadingCategories ? (
                        <div>Loading categories...</div>
                      ) : (
                        categories.map((category) => (
                          <Link
                            key={category._id}
                            to={`/category/${category.name.toLowerCase()}`}
                            state={{ categoryId: category._id }}
                            onClick={handleLinkClick}
                            className="block py-2 px-4 active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600 transition-all active:scale-102 focus:scale-102 active:text-lg focus:text-lg"
                          >
                            {category.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="block py-2 px-4 active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600 transition-all active:scale-102 focus:scale-102 active:text-lg focus:text-lg"
                >
                  Contact Us
                </Link>
                <Link
                  to="/cart"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 py-2 px-4 active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600 transition-all active:scale-102 focus:scale-102 active:text-lg focus:text-lg"
                >
                  <FiShoppingCart size={20} />
                  <span>Cart</span>
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/dashboard"
                    onClick={handleLinkClick}
                    className="block py-2 px-4 active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600 transition-all active:scale-102 focus:scale-102 active:text-lg focus:text-lg"
                  >
                    Dashboard
                  </Link>
                )}
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      logout();
                      handleLinkClick();
                    }}
                    className="block py-2 px-4 active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600 transition-all active:scale-102 focus:scale-102 active:text-lg focus:text-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="block py-2 px-4 active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600 transition-all active:scale-102 focus:scale-102 active:text-lg focus:text-lg"
                  >
                    Login
                  </Link>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;