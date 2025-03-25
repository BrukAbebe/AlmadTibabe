import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ContactPage from "./pages/ContactPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage"; 
import NotFoundPage from "./pages/NotFoundPage";
import AddProductPage from "./pages/AddProductPage";
import Layout from "./components/Layout";
import AllProductPage from "./pages/AllProductPage";
import EditProductPage from "./pages/EditProductPage";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// DynamicTitle component to update page titles
const DynamicTitle = () => {
  const { pathname } = useLocation();
  const baseTitle = "Alimada Tibeb";

  useEffect(() => {
    let pageTitle = "";

    switch (pathname) {
      case "/":
        pageTitle = `Home - ${baseTitle}`;
        break;
      case "/all-products":
        pageTitle = `Products - ${baseTitle}`;
        break;
      case "/login":
        pageTitle = `Login - ${baseTitle}`;
        break;
      case "/contact":
        pageTitle = `Contact - ${baseTitle}`;
        break;
      case "/cart":
        pageTitle = `Cart - ${baseTitle}`;
        break;
      case "/dashboard":
        pageTitle = `Dashboard - ${baseTitle}`;
        break;
      case "/dashboard/add-product":
        pageTitle = `Add Product - ${baseTitle}`;
        break;
      default:
        if (pathname.startsWith("/category/")) {
          const categoryName = pathname.split("/")[2];
          pageTitle = `${categoryName} - ${baseTitle}`;
        } else if (pathname.startsWith("/product/")) {
          pageTitle = `Product Detail - ${baseTitle}`;
        } else if (pathname.startsWith("/edit-product/")) {
          pageTitle = `Edit Product - ${baseTitle}`;
        } else {
          pageTitle = `404 - ${baseTitle}`;
        }
    }

    document.title = pageTitle;
  }, [pathname]);

  return null;
};

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// AppRoutes Component
const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider> 
          <Layout>
            <ScrollToTop />
            <DynamicTitle /> {/* Add the DynamicTitle component here */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/all-products" element={<AllProductPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/add-product"
                element={
                  <ProtectedRoute>
                    <AddProductPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/edit-product/:productId" element={<EditProductPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;