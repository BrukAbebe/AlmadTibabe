import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GetProduct, updateProductData } from "../../services/productService";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";

const EditProduct = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const { categories, loadingCategories } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [productionTime, setProductionTime] = useState("");
  const [shippingTime, setShippingTime] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [sideImages, setSideImages] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [sideImagesPreview, setSideImagesPreview] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await GetProduct(productId);

        setName(product.data.name || "");
        setDescription(product.data.description || "");
        setPrice(product.data.price || "");
        setSizes(product.data.sizes || []);
        setProductionTime(product.data.productionTime || "");
        setShippingTime(product.data.shippingTime || "");
        setSelectedCategories(product.data.category || []);
        setMainImage(product.data.mainImage?.secure_url || ""); 
        setSideImages(product.data.sideImages?.map(img => img.secure_url) || []); 
        setMainImagePreview(product.data.mainImage?.secure_url || "");
        setSideImagesPreview(product.data.sideImages?.map(img => img.secure_url) || []); 
      } catch (error) {
        setError("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleCategoryChange = (catId) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const handleImageUpload = (event, type) => {
    const files = event.target.files;
    if (!files.length) return;

    const fileReaders = [];
    const fileList = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      fileReaders.push(
        new Promise((resolve) => {
          reader.onload = () => {
            fileList.push(reader.result);
            resolve();
          };
        })
      );
    }

    Promise.all(fileReaders).then(() => {
      if (type === "main") {
        setMainImagePreview(fileList[0]);
        setMainImage(fileList[0]);
      } else {
        setSideImagesPreview(fileList);
        setSideImages(fileList);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!mainImage) {
      setError("Main image is required!");
      return;
    }
    if (selectedCategories.length === 0) {
      setError("At least one category must be selected!");
      return;
    }
    if (!price) {
      setError("Price is required!");
      return;
    }

    const product = {
      name,
      description,
      price,
      sizes,
      productionTime,
      shippingTime,
      category: selectedCategories,
      mainImage,
      sideImages,
    };

    setLoading(true);

    try {
      const response = await updateProductData(productId, product);
      console.log(response);

      if (response.status === "success") {
        toast.success("Product updated successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Zoom,
        });
        navigate("/dashboard", { state: { message: response.message } });
      } else {
        setError(response.message || "There was an error updating the product.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingCategories) return <div>Loading categories...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center text-sm sm:text-base md:text-lg text-[#fc9319] hover:text-[#e07c0e] mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </button>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
        Edit Product
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block font-semibold text-sm sm:text-base md:text-lg">
            Product Main Image <span className="text-red-500">*</span>:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "main")}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-[#fc9319]"
          />
          {mainImagePreview && (
            <div className="md:hidden mt-2">
              <img
                src={mainImagePreview}
                alt="Main Preview"
                className="w-full max-h-64 object-cover border rounded-md"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block font-semibold text-sm sm:text-base md:text-lg">
            Product Side Images:
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e, "side")}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-[#fc9319]"
          />
          <div className="md:hidden mt-2 flex gap-2 overflow-x-auto">
            {sideImagesPreview.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Side Preview ${index + 1}`}
                className="w-20 h-20 object-cover border rounded-md"
              />
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-sm sm:text-base md:text-lg">
              Product Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-[#fc9319]"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm sm:text-base md:text-lg">
              Categories <span className="text-red-500">*</span>:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <label key={cat._id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={cat._id}
                    checked={selectedCategories.includes(cat._id)}
                    onChange={() => handleCategoryChange(cat._id)}
                    className="w-4 h-4"
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-sm sm:text-base md:text-lg">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-[#fc9319]"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm sm:text-base md:text-lg">
              Price (ETB) <span className="text-red-500">*</span>:
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-[#fc9319]"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm sm:text-base md:text-lg">
              Sizes (comma-separated):
            </label>
            <input
              type="text"
              value={sizes.join(", ")}
              onChange={(e) => setSizes(e.target.value.split(",").map(size => size.trim()))}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-[#fc9319]"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-sm sm:text-base md:text-lg">
                Production Time (days):
              </label>
              <input
                type="number"
                value={productionTime}
                onChange={(e) => setProductionTime(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-[#fc9319]"
              />
            </div>
            <div>
              <label className="block font-semibold text-sm sm:text-base md:text-lg">
                Shipping Time (days):
              </label>
              <input
                type="number"
                value={shippingTime}
                onChange={(e) => setShippingTime(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-[#fc9319]"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#fc9319] text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#fc9319] hover:border-[#fc9319] border-2 transition-all duration-300 text-sm sm:text-base md:text-lg"
            disabled={loading}
          >
            {loading ? "Updating Product..." : "Update Product"}
          </button>
        </div>

        <div className="hidden md:block space-y-6">
          {mainImagePreview && (
            <div>
              <label className="block font-semibold text-sm sm:text-base md:text-lg">
                Main Image Preview:
              </label>
              <img
                src={mainImagePreview}
                alt="Main Preview"
                className="mt-2 w-full max-h-64 object-cover border rounded-md"
              />
            </div>
          )}

          {sideImagesPreview.length > 0 && (
            <div>
              <label className="block font-semibold text-sm sm:text-base md:text-lg">
                Side Images Previews:
              </label>
              <div className="mt-2 flex gap-2 overflow-x-auto">
                {sideImagesPreview.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Side Preview ${index + 1}`}
                    className="w-20 h-20 object-cover border rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;