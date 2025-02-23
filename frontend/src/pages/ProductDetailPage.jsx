import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetProduct } from "../services/productService";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import OrderForm from "../components/OrderForm";

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await GetProduct(productId);
        setProduct(response.data);

        let allImages = [];
        if (response.data.mainImage?.secure_url) {
          allImages.push(response.data.mainImage.secure_url);
        }
        if (response.data.sideImages) {
          allImages = [...allImages, ...response.data.sideImages.map(img => img.secure_url)];
        }
        setImages(allImages);
      } catch (err) {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleNavigation = (direction) => {
    setActiveIndex((prevIndex) => (prevIndex + direction + images.length) % images.length);
  };

  const openLightbox = () => setLightbox(true);
  const closeLightbox = () => setLightbox(false);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-24 left-4 flex items-center text-sm sm:text-base text-[#fc9319] hover:text-[#e07c0e]"
      >
        <FiChevronLeft className="mr-2" /> Back
      </button>

      <div
        className="relative w-full"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <div className="relative group cursor-pointer">
          <img
            src={images[activeIndex]}
            alt={`Product Image ${activeIndex + 1}`}
            className="w-full md:h-[600px] h-[400px] object-cover transition-all duration-500 ease-in-out opacity-100"
            onClick={openLightbox}
            style={{ transition: "transform 0.5s ease, opacity 0.5s ease" }}
          />

          {showArrows && images.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                onClick={() => handleNavigation(-1)}
              >
                <FaArrowLeft className="text-xl" />
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                onClick={() => handleNavigation(1)}
              >
                <FaArrowRight className="text-xl" />
              </button>
            </>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover cursor-pointer border transition-opacity ${
                index === activeIndex ? "border-primary-500 opacity-50" : "border-gray-300 opacity-100"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{product.name}</h2>
        <hr className="border-t-2 border-gray-300 my-2" />
        <p className="text-lg sm:text-xl font-medium text-gray-700">
          {product.currency} {product.price.toLocaleString()}
        </p>

        <div className="space-y-4 text-gray-700">
          {product.sizes && (
            <p><strong>Sizes:</strong> {product.sizes.join(", ")}</p>
          )}
          {product.productionTime && (
            <p><strong>Production Time:</strong> {product.productionTime} days</p>
          )}
          {product.shippingTime && (
            <p><strong>Shipping Time:</strong> {product.shippingTime} days</p>
          )}
          {product.description && product.description !== "No description available." && (
            <p><strong>Description:</strong> {product.description}</p>
          )}
        </div>

        <hr className="border-t-2 border-gray-300 my-4" />

        <div className="mt-6 flex gap-4">
          <button 
            className="bg-[#fc9319] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#fc9319] hover:border-[#fc9319] border-2 transition-all duration-300"
            onClick={() => setShowOrderForm(true)}
          >
            Order Now
          </button>
          <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all duration-300">
            Add to Cart
          </button>
        </div>

        <hr className="border-t-2 border-gray-300 my-4" />

        <div>
          <div className="flex justify-center sm:justify-start gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all">
              <FaFacebook size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all">
              <FaTwitter size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all">
              <FaInstagram size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all">
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
          <button className="absolute top-4 right-4 text-black text-3xl" onClick={closeLightbox}>
            ✖
          </button>

          <img
            src={images[activeIndex]}
            alt="Full View"
            className="max-w-full max-h-full object-contain"
          />

          {images.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 p-4 bg-black/50 text-white rounded-full hover:bg-black/70"
                onClick={() => handleNavigation(-1)}
              >
                <FaArrowLeft className="text-xl" />
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 p-4 bg-black/50 text-white rounded-full hover:bg-black/70"
                onClick={() => handleNavigation(1)}
              >
                <FaArrowRight className="text-xl" />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Lightbox Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover cursor-pointer border ${
                    index === activeIndex ? "border-white opacity-50" : "border-gray-500 opacity-100"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {showOrderForm && (
        <OrderForm
          product={product}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </div>
  );
}

export default ProductDetailPage;
