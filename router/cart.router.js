const { celebrate, Joi, Segments} = requir('celebrate');
const { addTocart} = require('../controllers/cart.controller');

module.rexports = (router) => {
router.post('/addToCart', addToCart);
}