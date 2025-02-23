// validations/productValidation.js
const Joi = require('joi');

const productValidation = {
  create: Joi.object({
    name: Joi.string().allow('').optional(),
    category: Joi.array().items(Joi.string()).required(),
    description: Joi.string().allow('').optional(),
    price: Joi.number().required(),
    sizes: Joi.array().items(Joi.string()).optional().allow(null), // allow null or undefined
    productionTime: Joi.string().allow('').optional(),
    shippingTime: Joi.string().allow('').optional(),
    mainImage: Joi.string().required(),
    sideImages: Joi.array().items(Joi.string()).optional(),
  }),
};

module.exports = productValidation;
