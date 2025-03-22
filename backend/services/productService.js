const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
const cloudinaryUtils = require("../utils/cloudinaryUtils");
const ApiError = require("../utils/ApiError");

const createProduct = async ({ name, category, description, price, sizes, productionTime, shippingTime, mainImage, sideImages }) => {
  try {
    // Upload main image to Cloudinary
    const uploadedMainImage = await cloudinaryUtils.uploadImage(mainImage);
    if (!uploadedMainImage || !uploadedMainImage.secure_url) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Main image upload failed.");
    }

    // Upload side images to Cloudinary (if provided)
    let uploadedSideImages = [];
    if (sideImages && sideImages.length > 0) {
      for (let sideImage of sideImages) {
        const uploadedImage = await cloudinaryUtils.uploadImage(sideImage);
        if (!uploadedImage || !uploadedImage.secure_url) {
          throw new ApiError(StatusCodes.BAD_REQUEST, "Side image upload failed.");
        }
        uploadedSideImages.push(uploadedImage);
      }
    }


    const product = new Product({
      name,
      category,
      description,
      price,
      sizes,
      productionTime,
      shippingTime,
      mainImage: uploadedMainImage,  
      sideImages: uploadedSideImages,  
    });

   
    const savedProduct = await product.save();


    await Category.updateMany(
      { _id: { $in: category } },
      { $push: { products: savedProduct._id } }
    );

    return {
      status: "success",
      message: "Product created successfully",
      data: savedProduct,
    };
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};


const getAllProducts = async (page, limit) => {
  try {
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;

    if (pageNumber < 1 || pageSize < 1) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid page or limit.");
    }

    const totalResults = await Product.countDocuments();
    const products = await Product.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return {
      status: "success",
      results: products.length,
      totalResults,
      data: products,
    };
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong.");
  }
};

const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);  

    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found"); 
    }

    return {
      status: "success",
      data: product,  
    };
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);  
  }
};


const deleteProduct = async (productId) => {
  try {

   
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid product ID");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
    }

    await Product.findByIdAndDelete(productId);


    await Category.updateMany(
      { _id: { $in: product.category } },
      { $pull: { products: productId } }
    );

    return {
      status: "success",
      message: "Product deleted successfully",
    };
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateProduct = async (productId, updateData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid product ID.");
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found.");
    }

    // Handle main image update (if provided)
    if (updateData.mainImage) {
      const uploadedMainImage = await cloudinaryUtils.uploadImage(updateData.mainImage);
      if (!uploadedMainImage || !uploadedMainImage.secure_url) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Main image upload failed.");
      }
      updateData.mainImage = uploadedMainImage;
    }

    // Handle side images update (if provided)
    if (updateData.sideImages && updateData.sideImages.length > 0) {
      let uploadedSideImages = [];
      for (let sideImage of updateData.sideImages) {
        const uploadedImage = await cloudinaryUtils.uploadImage(sideImage);
        if (!uploadedImage || !uploadedImage.secure_url) {
          throw new ApiError(StatusCodes.BAD_REQUEST, "Side image upload failed.");
        }
        uploadedSideImages.push(uploadedImage);
      }
      updateData.sideImages = uploadedSideImages;
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    // If the category is updated, update the category's products array
    if (updateData.category) {
      // Remove the product from the old categories
      await Category.updateMany(
        { _id: { $in: product.category } },
        { $pull: { products: productId } }
      );

      // Add the product to the new categories
      await Category.updateMany(
        { _id: { $in: updateData.category } },
        { $push: { products: productId } }
      );
    }

    return {
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    };
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
