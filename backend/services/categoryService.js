const Category = require('../models/Category');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');

const getCategories = async () => {
  const categories = await Category.find().select('_id name'); 

  if (!categories || categories.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No categories found');
  }

  return {
    status: 'success',
    message: 'Categories fetched successfully',
    data: categories,
  };
};


const getCategoryProductsById = async (categoryId, page, limit) => {
  const skip = (page - 1) * limit;
  limit = parseInt(limit);

  // Find category and populate products
  const category = await Category.findById(categoryId).populate({
    path: 'products',
    options: {
      skip: skip, 
      limit: limit, 
    },
  });

  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  const totalProducts = await Category.countDocuments({ _id: categoryId });

  return {
    status: 'success',
    message: 'Products fetched successfully',
    results: category.products.length, 
    totalResults: totalProducts, 
    data: category.products,
  };
};


module.exports = {
  getCategories,
  getCategoryProductsById
};
