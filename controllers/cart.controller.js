const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model');
const mongoose = require('mongoose');
var stripe = require('stripe')('SecretKey');

const addToCart = async (req, res) => {
  // req.user = decoded
  const { userId } = req.user;
  const productId = req.params.id;
  console.log('productId', productId);
  
  // cart ---> is product exist
  // if(!cart.products.length) ---> cartModel.create
  // else --> cartModel.update
  const product = await productModel.findOne({ _id: productId });
  console.log('product', product);
  const isCartExist = await cartModel.findOne({ userId });
  console.log('isCartExistproductslength', isCartExist);
  if(isCartExist) {
    const updateCart = await cartModel.findOneAndUpdate({
      _id: isCartExist._id
    },
    {
      $inc: {
        quantity: 1
      },
      $addToSet: {
        products: product
      }
    },
      {
      new: true
    }
    )
    res.status(200).json(updateCart)

  } else {
    const createCart = await cartModel.create({
      userId,
      products: [product],
      quantity: 1
    })
    res.status(200).json(createCart)
  }
  }

const getcart = async (req, res) => {

  try {
    // const{ userId } = req.user;
    const userId = req.params.id;
    console.log('userId', userId)
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(401).json({ message: 'Cart not found' })
    }
    res.status(200).json(cart.products);
  } catch (error) {
    console.log("Error :", error);
    res.status(500).json({ message: 'Server error' })
  }
}

const remove = async (req, res) => {
  try {
    const { userId } = req.user;
    let productId = req.params.id;
    const cart = await cartModel.findOne({ userId });
    console.log('cart', cart);
    if (!cart) {
      return res.status(400).json({ meassage: 'Cart is not found' });
    }
    productId = new mongoose.Types.ObjectId(productId);
    // 0 == '0';
    // 0 === '0';
    if(cart.quantity === 0) {
     return res.status(200).send('cart is empty');
    }
     const updatedCart = await cartModel.findOneAndUpdate({
        _id: cart._id
      },
        {
          $pull: {
            products: {
              _id: productId
            }
          },
  
          $inc: {
            quantity: -1
          }
        },
            
        
        {
          new: true
        }
      );

    return res.status(200).send(updatedCart);
  } catch (error) {
    console.log("Error :", error);
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { addToCart, getcart, remove }