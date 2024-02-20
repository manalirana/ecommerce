const cartModel = require(' ../models/cart.model');

const addToCart = async(req, res) => {
    const { userId } = req.user;
    const productId = req.params;
    const product = await productModel.findOne({_id: productId})
const createCart = await cartModel.create({
    userId,
    products: [product],
    quantity: 1
})
res.status(200).json(createCart)

}

module.exports = {addToCart}