import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { FaTelegram, FaWhatsapp } from "react-icons/fa6";
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const templateParams = {
      form_type: "Contact Form",
      customer_name: formData.name,
      customer_phone: formData.phone || "Not provided",
      customer_email: formData.email,
      email_subject: formData.subject || "No subject",
      customer_message: formData.message,
      order_date: new Date().toLocaleString()
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f8f8] min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#121212] mb-2">Contact Alimada Tibab</h1>
          <p className="text-lg text-gray-600">We're here to assist you!</p>
          <div className="w-20 h-1 bg-[#fc9319] mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information (unchanged) */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-[#fc9319] border-b pb-2">
              Our Contact Details
            </h2>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-[#fc9319] mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800">Location:</h3>
                  <p className="text-gray-600">
                    Shiromeda, Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-[#fc9319] flex-shrink-0" size={18} />
                <div>
                  <h3 className="font-medium text-gray-800">Primary Phone:</h3>
                  <a 
                    href="tel:+251910836486" 
                    className="text-gray-600 hover:text-[#fc9319] transition-all"
                  >
                    +251 910 836 486
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-[#fc9319] flex-shrink-0" size={18} />
                <div>
                  <h3 className="font-medium text-gray-800">Secondary Phone:</h3>
                  <a 
                    href="tel:+251924619127" 
                    className="text-gray-600 hover:text-[#fc9319] transition-all"
                  >
                    +251 92 461 9127
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-[#fc9319] flex-shrink-0" size={18} />
                <div>
                  <h3 className="font-medium text-gray-800">Email:</h3>
                  <a 
                    href="mailto:tisuyee.abebe@gmail.com" 
                    className="text-gray-600 hover:text-[#fc9319] transition-all"
                  >
                    tisuyee.abebe@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Connect With Us</h3>
              <div className="flex gap-4 flex-wrap">
                <a 
                  href="https://web.facebook.com/profile.php?id=100083072629568" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-[#1877F2] transition-all"
                  aria-label="Facebook"
                >
                  <FaFacebook size={24} />
                </a>
                <a 
                  href="https://www.instagram.com/tinsa2423" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-[#E4405F] transition-all"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a 
                  href="https://wa.me/+251910836486" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#25D366] transition-all"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={24} />
                </a>
                <a 
                  href="viber://chat?number=+251910836486" 
                  className="text-gray-600 hover:text-[#7360F2] transition-all"
                  title="Viber"
                >
                  <FaWhatsapp size={24} />
                </a>
                <a 
                  href="https://t.me/+251910836486" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#0088cc] transition-all"
                  title="Telegram"
                >
                  <FaTelegram size={24} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Updated Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-[#fc9319] border-b pb-2">
              Send Us a Message
            </h2>
            
            {success ? (
              <div className="text-center py-6">
                <div className="text-green-600 font-medium mb-2">
                  Message sent successfully!
                </div>
                <p className="text-gray-600">
                  We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                      Name *
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc9319] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc9319] focus:border-transparent"
                      placeholder="+251 ___ ______"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                    Email *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc9319] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc9319] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                    Message *
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc9319] focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-[#fc9319] text-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#fc9319] hover:border-[#fc9319] border-2 border-transparent transition-all duration-300 w-full font-medium flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;