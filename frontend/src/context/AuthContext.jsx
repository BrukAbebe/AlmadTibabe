import React, { createContext, useState, useContext, useEffect } from "react";
import { getCategories } from '../services/categoryService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

 
  useEffect(() => {
    const fetchCategoriesData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData.data);
      
      setLoadingCategories(false); 
    };

    fetchCategoriesData();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoggedIn, 
      login, 
      logout, 
      categories, 
      loadingCategories
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
