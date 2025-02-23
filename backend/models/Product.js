const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  category: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'ETB',
  },
  sizes: {
    type: [String],
    default: [],
  },
  productionTime: {
    type: String,
    required: false,
  },
  shippingTime: {
    type: String,
    required: false,
  },
  mainImage: {
    type: Object,
    required: true,
  },
  sideImages: {
    type: [Object],
    required: false,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
