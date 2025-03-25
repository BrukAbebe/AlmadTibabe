import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import emailjs from "@emailjs/browser";
import { FaTimes, FaPhoneAlt, FaWhatsapp, FaTelegram } from "react-icons/fa";

const CheckoutForm = ({ onClose }) => {
  const { cartItems, cartTotal } = useCart();
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "" 
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(\+251|0)[79]\d{8}$/;
    const cleanedPhone = phone.replace(/[^\d+]/g, "");
    
    if (cleanedPhone.length < 10) {
      return false;
    }
  
    return phoneRegex.test(cleanedPhone);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(formData.phone)) {
      setError("Please enter a valid Ethiopian phone number (+251910836486)");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const templateParams = {
      form_type: "Cart Checkout",
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: "Not provided",
      product_name:  "Checkout Order",
      product_image: "checkour order",
      order_date: new Date().toLocaleString("en-US", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customer_message: "New cart order placed"
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSuccess(true);
      setFormData({ name: "", phone: "" });
    } catch (err) {
      setError("Failed to send order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-[#fc9319] transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-[#121212]">Complete Your Order</h2>
          <div className="w-16 h-1 bg-[#fc9319] mx-auto my-2"></div>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {success ? (
          <div className="text-center py-4">
            <div className="text-green-600 font-medium mb-2">
              Order submitted successfully!
            </div>
            <p className="text-gray-600 mb-4">
              We'll contact you shortly to confirm your order.
            </p>
            <button
              onClick={onClose}
              className="bg-[#fc9319] text-white px-6 py-2 rounded-md hover:bg-[#e07c0e] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc9319] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+251912345678"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc9319] focus:border-transparent"
              />
            </div>

            {/* Added Contact Options */}
            <div className="pt-2">
              <p className="text-sm text-gray-600 text-center mb-3">
                Or contact us directly:
              </p>
              <div className="flex justify-center items-center gap-4">
                <a 
                  href="tel:+251910836486" 
                  className="flex items-center gap-1 text-gray-600 hover:text-[#fc9319] transition-all"
                  title="Call Us"
                >
                  <FaPhoneAlt size={18} />
                  <span className="text-sm">+251 910 836 486</span>
                </a>
                <a 
                  href="https://wa.me/+251910836486" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-600 hover:text-[#25D366] transition-all"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </a>
                <a 
                  href="https://t.me/+251910836486" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-600 hover:text-[#0088cc] transition-all"
                  title="Telegram"
                >
                  <FaTelegram size={18} />
                </a>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{cartItems[0]?.currency} {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#fc9319] text-white py-3 rounded-md hover:bg-white hover:text-[#fc9319] hover:border-[#fc9319] border-2 border-transparent transition-all duration-300 font-medium flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : "Place Order"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full mt-2 text-[#fc9319] hover:text-[#e07c0e] text-center font-medium transition-colors"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;