import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaTelegram, FaWhatsapp, FaTiktok } from "react-icons/fa6"; // Import new icons
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-300  pb-20 sm:pb-16">
      {/* Increased bottom margin and padding for mobile */}
      <div className="container mx-auto max-w-screen-xl">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#fc9319] transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-products"
                  className="hover:text-[#fc9319] transition-all"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#fc9319] transition-all"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <FaMapMarkerAlt />
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fc9319] transition-all"
                >
                  Shiromeda, Addis Ababa, Ethiopia
                </a>
              </li>

              <li className="flex items-center justify-center sm:justify-start gap-2">
                <FaPhoneAlt />
                <span>+251 910 836 486</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <FaEnvelope />
                <span>tisuyee.abebe@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start gap-4">
              <a
                href="https://web.facebook.com/profile.php?id=100083072629568"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fc9319] transition-all"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://t.me/HassetTinsuyeee"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fc9319] transition-all"
              >
                <FaTelegram size={24} />
              </a>
              <a
                href="https://wa.me/+251910836486"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fc9319] transition-all"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@almad_tibebe1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fc9319] transition-all"
              >
                <FaTiktok size={24} />
              </a>
              <a
                href="https://www.instagram.com/tinsa2423"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fc9319] transition-all"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Map Embed */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Location</h3>
            <div className="rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d972.5607781130261!2d38.76142000339025!3d9.061042481333907!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2set!4v1740333390669!5m2!1sen!2set"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-300 text-center">
          <div className="flex justify-center items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 rounded-full" />{" "}
            {/* Rounded logo */}
            <span className="font-bold">Almida Tibabe</span>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Almida Tibabe. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
