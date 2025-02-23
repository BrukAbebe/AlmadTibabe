const { StatusCodes } = require('http-status-codes');
const categoryService = require('../services/categoryService');
const catchAsync = require('../utils/catchAsync');

// Fetch categories
const getCategories = catchAsync(async (req, res) => {
  const result = await categoryService.getCategories();
  res.status(StatusCodes.OK).json(result);
});

const getCategoryProductsById = catchAsync(async (req, res) => {
  const { categoryId } = req.params; 
  const { page = 1, limit = 10 } = req.query; 

  const result = await categoryService.getCategoryProductsById(categoryId, page, limit);
console.log(result);
 
  res.status(StatusCodes.OK).json(result);
});


module.exports = {
  getCategories,
  getCategoryProductsById
};
