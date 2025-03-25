import { useState, useEffect } from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.jpg";
import { useAuth } from "./../../context/AuthContext";
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [isUpperNavVisible, setIsUpperNavVisible] = useState(true);
  const { isLoggedIn, logout, categories, loadingCategories } = useAuth();
  const { cartCount } = useCart();

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
      className="fixed top-0 left-0 w-full z-50 shadow-mdb bg-[linear-gradient(to_right,_#fc9319,_#f57e22)] bg-opacity-90 mb-15"
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
        className="bg-white z-50 bg-opacity-0 py-1.5 px-6 flex justify-between items-center relative container mx-auto max-w-screen-xl text-sm sm:text-base md:text-lg"
      >
        <Link to="/" className="flex items-center font-bold gap-2 group">
          <img
            src={logo}
            alt="Logo"
            className="transition-all group-hover:opacity-100 h-8 w-8 rounded-full group-hover:scale-110"
          />
          <span className=" text-white hidden md:inline transition-all hover:scale-102 ">
            Alimada Tibab
          </span>
        </Link>

        <nav className="hidden md:flex items-center text-white gap-6">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `relative p-2 transition-all hover:scale-102 ${
                isActive 
                  ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-white after:rounded-full' 
                  : 'hover:opacity-80'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-products"
            className={({ isActive }) => 
              `relative p-2 transition-all hover:scale-102 ${
                isActive 
                  ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-white after:rounded-full' 
                  : 'hover:opacity-80'
              }`
            }
          >
            All Products
          </NavLink>
          
          <div
            className="relative group z-20"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <NavLink
              to={categories.length > 0 ? `/category/${categories[0].name.toLowerCase()}` : '#'}
              end={false}
              className={({ isActive }) => 
                `relative p-2 transition-all hover:scale-102 ${
                  isActive || categoriesOpen
                    ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-white after:rounded-full'
                    : 'hover:opacity-80'
                }`}
              onClick={(e) => {
                e.preventDefault();
                setCategoriesOpen(!categoriesOpen);
              }}
            >
              Categories
            </NavLink>
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
                  <NavLink
                    key={category._id}
                    to={`/category/${category.name.toLowerCase()}`}
                    state={{ categoryId: category._id }}
                    className={({ isActive }) => 
                      `block px-4 py-2 transition-all hover:scale-102 hover:text-lg ${
                        isActive ? 'bg-white text-black' : 'hover:bg-white hover:text-black'
                      }`
                    }
                    onClick={() => {
                      setCategoriesOpen(false);
                      handleLinkClick();
                    }}
                  >
                    {category.name}
                  </NavLink>
                ))
              )}
            </motion.div>
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) => 
              `relative p-2 transition-all hover:scale-102 ${
                isActive 
                  ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-white after:rounded-full' 
                  : 'hover:opacity-80'
              }`
            }
          >
            Contact Us
          </NavLink>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => 
              `relative flex items-center gap-2 p-2 transition-all hover:scale-102 ${
                isActive 
                  ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-white after:rounded-full' 
                  : 'hover:opacity-80'
              }`
            }
          >
            <div className="relative">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => 
                `relative p-2 transition-all hover:scale-102 ${
                  isActive 
                    ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-white after:rounded-full' 
                    : 'hover:opacity-80'
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        <button className="md:hidden z-50" onClick={() => setMenuOpen(true)}>
          <FiMenu size={24} className="text-white" />
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
                <NavLink
                  to="/"
                  onClick={handleLinkClick}
                  className={({ isActive }) => 
                    `block py-2 px-4 transition-all active:scale-102 focus:scale-102 ${
                      isActive ? 'bg-blue-100 text-blue-600' : 'active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/all-products"
                  onClick={handleLinkClick}
                  className={({ isActive }) => 
                    `block py-2 px-4 transition-all active:scale-102 focus:scale-102 ${
                      isActive ? 'bg-blue-100 text-blue-600' : 'active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600'
                    }`
                  }
                >
                  All Products
                </NavLink>
                <div className="relative">
                  <button
                    className={`block py-2 px-4 w-full text-left transition-all active:scale-102 focus:scale-102 ${
                      categoriesOpen ? 'bg-blue-100 text-blue-600' : 'active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600'
                    }`}
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
                          <NavLink
                            key={category._id}
                            to={`/category/${category.name.toLowerCase()}`}
                            state={{ categoryId: category._id }}
                            onClick={handleLinkClick}
                            className={({ isActive }) => 
                              `block py-2 px-4 transition-all active:scale-102 focus:scale-102 ${
                                isActive ? 'bg-blue-100 text-blue-600' : 'active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600'
                              }`
                            }
                          >
                            {category.name}
                          </NavLink>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                <NavLink
                  to="/contact"
                  onClick={handleLinkClick}
                  className={({ isActive }) => 
                    `block py-2 px-4 transition-all active:scale-102 focus:scale-102 ${
                      isActive ? 'bg-blue-100 text-blue-600' : 'active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600'
                    }`
                  }
                >
                  Contact Us
                </NavLink>
                <NavLink 
                  to="/cart" 
                  onClick={handleLinkClick}
                  className={({ isActive }) => 
                    `flex items-center gap-2 py-2 px-4 transition-all active:scale-102 focus:scale-102 ${
                      isActive ? 'bg-blue-100 text-blue-600' : 'active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600'
                    }`
                  }
                >
                  <div className="relative">
                    <FiShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                </NavLink>
                {isLoggedIn && (
                  <NavLink
                    to="/dashboard"
                    onClick={handleLinkClick}
                    className={({ isActive }) => 
                      `block py-2 px-4 transition-all active:scale-102 focus:scale-102 ${
                        isActive ? 'bg-blue-100 text-blue-600' : 'active:bg-blue-100 active:text-blue-600 focus:bg-blue-100 focus:text-blue-600'
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
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