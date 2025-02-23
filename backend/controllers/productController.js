const { StatusCodes } = require("http-status-codes");
const productService = require("../services/productService");
const catchAsync = require("../utils/catchAsync");

const createProduct = catchAsync(async (req, res) => {
  const { name, category, description, price, sizes, productionTime, shippingTime, mainImage, sideImages } = req.body;

  const result = await productService.createProduct({
    name,
    category,
    description,
    price,
    sizes,
    productionTime,
    shippingTime,
    mainImage,
    sideImages,
  });

  res.status(StatusCodes.CREATED).json(result);
});

const getAllProducts = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 
  const result = await productService.getAllProducts(page, limit);

  res.status(StatusCodes.OK).json(result);
});

const getProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;  

  const result = await productService.getProductById(productId);  

  res.status(StatusCodes.OK).json(result);  
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
