const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true
  },  
  sku: {
    type: String,
    require: true
  },
  size: {
    type: [String],
    require: true
  },
  brand: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  subCategory: {
    type: String,
    require: true
  },
  images: {
    type: [String],
  },
  price: {
    type: Number,
    require: true
  }
})

const products = mongoose.model("products",productSchema);
module.exports = products;