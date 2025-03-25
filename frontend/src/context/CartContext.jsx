import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      // Find the item to check its quantity
      const existingItem = prevItems.find(item => item._id === productId);
      
      // If quantity is more than 1, decrease quantity
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item._id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }
      // Otherwise remove the item completely
      return prevItems.filter(item => item._id !== productId);
    });
  };

  const removeItemCompletely = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart,
      removeItemCompletely,
      cartCount,
      cartTotal,
      showNotification 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);