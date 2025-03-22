const express = require('express');
const productController = require('../controllers/productController');
const validate = require('../middlewares/validate');
const productValidation = require('../validations/productValidation');
const { protect } = require("../middlewares");

const router = express.Router();


router.post('/create',protect, validate(productValidation.create), productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
router.delete("/:productId", protect, productController.deleteProduct);
router.patch("/:productId", protect, validate(productValidation.update), productController.updateProduct);

module.exports = router;
