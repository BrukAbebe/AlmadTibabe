import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiChevronLeft } from "react-icons/fi";
import CheckoutForm from '../components/CheckoutForm';

function CartPage() {
  const navigate = useNavigate();
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    removeItemCompletely,
    cartTotal,
    clearCart
  } = useCart();
  
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-20 pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-sm text-[#fc9319] hover:text-[#e07c0e]"
      >
        <FiChevronLeft className="mr-2" /> Back
      </button>
      
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/all-products')}
            className="bg-[#fc9319] text-white px-4 py-2 rounded-lg hover:bg-[#e07c0e] transition-all"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="border p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center gap-4 w-full sm:w-2/3">
                  <img 
                    src={item.mainImage?.secure_url} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-medium text-sm md:text-base">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {item.currency} {item.price.toLocaleString()}
                    </p>
                    {item.size && (
                      <p className="text-gray-500 text-xs">Size: {item.size}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-3 mt-3 sm:mt-0 sm:w-1/3">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-sm md:text-base">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItemCompletely(item._id)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="border-t pt-6">
            <div className="flex flex-col items-end gap-2 mb-6">
              <div className="flex justify-between w-full max-w-xs">
                <span className="font-medium">Subtotal:</span>
                <span>{cartItems[0]?.currency} {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between w-full max-w-xs">
                <span className="font-medium">Shipping:</span>
                <span className="text-gray-600">Calculated at checkout</span>
              </div>
              <div className="flex justify-between w-full max-w-xs border-t pt-2 mt-2">
                <span className="font-bold">Total:</span>
                <span className="font-bold">{cartItems[0]?.currency} {cartTotal.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button
                onClick={() => navigate('/all-products')}
                className="px-6 py-2 border border-[#fc9319] text-[#fc9319] rounded-lg hover:bg-[#fff5eb] transition-all"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => setShowCheckoutForm(true)}
                className="bg-[#fc9319] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#fc9319] hover:border-[#fc9319] border-2 border-transparent transition-all duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Checkout Form Modal */}
      {showCheckoutForm && (
        <CheckoutForm 
          onClose={() => {
            setShowCheckoutForm(false);
            // Clear cart after successful order if you want
            // if (orderWasSuccessful) clearCart();
          }} 
        />
      )}
    </div>
  );
}

export default CartPage;