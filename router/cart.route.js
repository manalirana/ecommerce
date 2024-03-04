const { celebrate, Joi, Segments} = require('celebrate');
const { addToCart, getcart, remove} = require('../controllers/cart.controller');
const verifyToken = require('../middleware/seller.middleware');

module.exports = (router) => {
router.patch('/addToCart/:id', verifyToken, addToCart);
router.get('/getcart/:id',getcart);
router.patch('/removeProduct/:id',verifyToken, remove);
}
