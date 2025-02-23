import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaTimes } from "react-icons/fa";

const OrderForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    const cleanedPhone = phone.replace(/[^\d+]/g, "");
    

    if (cleanedPhone.length < 9 || cleanedPhone.length < 10) {
      return false;
    }
  
    return phoneRegex.test(cleanedPhone);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      setError("Please enter a valid phone number with a minimum of 10 digits (e.g.,09######## || +251#######).");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const templateParams = {
      customer_name: formData.name,
      customer_phone: formData.phone,
      product_name: product.name || "",
      product_image: product.mainImage?.secure_url || "",
      order_date: new Date().toLocaleDateString(),
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-xl" />
        </button>

        <h2 className="text-xl font-semibold text-center">Order Now</h2>
        <p className="text-gray-600 text-center mb-4">{product.name}</p>

        {success ? (
          <p className="text-green-600 text-center">Order sent successfully!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1234567890"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Sending..." : "Place Order"}
            </button>
          </form>
        )}

        <button
          onClick={onClose}
          className="w-full mt-2 text-gray-500 hover:underline text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderForm;