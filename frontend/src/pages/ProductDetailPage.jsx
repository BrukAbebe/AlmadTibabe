import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetProduct } from "../services/productService";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { 
  FaFacebook, 
  FaTelegram, 
  FaWhatsapp, 
  FaTiktok, 
  FaInstagram 
} from "react-icons/fa";
import OrderForm from "../components/OrderForm";
import { useCart } from "../context/CartContext";

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
  const { addToCart, showNotification } = useCart();

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
    <div className="max-w-6xl mx-auto px-4 pt-20 pb-12">
      {/* Notification for added to cart */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-bounce">
          Item added to cart!
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-sm text-[#fc9319] hover:text-[#e07c0e]"
      >
        <FiChevronLeft className="mr-2" /> Back
      </button>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Images Column */}
        <div className="sticky top-24">
          <div
            className="relative w-full"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
          >
            <div className="relative group cursor-pointer">
              <img
                src={images[activeIndex]}
                alt={`Product Image ${activeIndex + 1}`}
                className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                onClick={openLightbox}
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

            <div className="flex gap-2 mt-4 overflow-x-auto py-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover cursor-pointer border-2 rounded ${
                    index === activeIndex ? "border-[#fc9319]" : "border-transparent"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Info Column */}
        <div className="space-y-6">
          <h2 className="text-base md:text-2xl font-bold text-gray-900">{product.name}</h2>
          <hr className="border-t border-gray-200 my-2" />
          <p className="text-sm md:text-xl font-semibold text-gray-800">
            {product.currency} {product.price.toLocaleString()}
          </p>

          <div className="space-y-4 text-gray-700">
            {product.sizes && (
              <p className="text-sm md:text-base"><strong>Sizes:</strong> {product.sizes.join(", ")}</p>
            )}
            {product.productionTime && (
              <p className="text-sm md:text-base"><strong>Production Time:</strong> {product.productionTime} days</p>
            )}
            {product.shippingTime && (
              <p className="text-sm md:text-base"><strong>Shipping Time:</strong> {product.shippingTime} days</p>
            )}
            {product.description && product.description !== "No description available." && (
              <div className="mt-4">
                <h3 className="font-medium mb-2 text-sm md:text-base">Description</h3>
                <p className="whitespace-pre-line text-sm md:text-base">{product.description}</p>
              </div>
            )}
          </div>

          <hr className="border-t border-gray-200 my-4" />

          <div className="flex flex-wrap gap-4">
            <button 
              className="bg-[#fc9319] text-white px-4 py-1 sm:px-6 sm:py-2 rounded-lg hover:bg-white hover:text-[#fc9319] hover:border-[#fc9319] border-2 border-transparent transition-all duration-300 text-sm sm:text-base"
              onClick={() => setShowOrderForm(true)}
            >
              Order Now
            </button>
            <button 
              className="bg-gray-800 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-lg hover:bg-white hover:text-gray-800 hover:border-gray-800 border-2 border-transparent transition-all duration-300 text-sm sm:text-base"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>

          <hr className="border-t border-gray-200 my-4" />

          <div className="flex justify-start gap-4">
            <a href="https://web.facebook.com/profile.php?id=100083072629568" target="_blank" rel="noopener noreferrer" className="hover:text-[#fc9319] transition-all">
              <FaFacebook size={20} />
            </a>
            <a href="https://t.me/HassetTinsuyeee" target="_blank" rel="noopener noreferrer" className="hover:text-[#fc9319] transition-all">
              <FaTelegram size={20} />
            </a>
            <a href="https://wa.me/+251910836486" target="_blank" rel="noopener noreferrer" className="hover:text-[#fc9319] transition-all">
              <FaWhatsapp size={20} />
            </a>
            <a href="https://www.tiktok.com/@almad_tibebe1" target="_blank" rel="noopener noreferrer" className="hover:text-[#fc9319] transition-all">
              <FaTiktok size={20} />
            </a>
            <a href="https://www.instagram.com/tinsa2423" target="_blank" rel="noopener noreferrer" className="hover:text-[#fc9319] transition-all">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div 
          className="fixed inset-0 bg-white z-50 flex items-center justify-center" 
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-black text-3xl" 
            onClick={(e) => { closeLightbox(); e.stopPropagation(); }}
          >
            ✖
          </button>
          <div className="relative w-full max-w-4xl h-full max-h-screen flex items-center justify-center">
            <img
              src={images[activeIndex]}
              alt="Full View"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 p-4 bg-black/50 text-white rounded-full hover:bg-black/70"
                  onClick={(e) => { handleNavigation(-1); e.stopPropagation(); }}
                >
                  <FaArrowLeft className="text-xl" />
                </button>
                <button
                  className="absolute right-4 p-4 bg-black/50 text-white rounded-full hover:bg-black/70"
                  onClick={(e) => { handleNavigation(1); e.stopPropagation(); }}
                >
                  <FaArrowRight className="text-xl" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Order Form */}
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