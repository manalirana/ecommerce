const mongoose = require("mongoose")

const cartSchema=new mongoose.Schema({
  userId: {
    type: String,
    require: true
  },
  products: [],
  
  quantity: {
    type: Number,
    require: true
  }
});


const Cart = mongoose.model("carts",cartSchema);
module.exports = Cart;