const {celebrate , Joi, Segments} = require('celebrate');
const { address } = require('../controllers/order.controller');
const verifyToken = require('../middleware/seller.middleware');

module.exports = (router) => {
   router.post('/address',verifyToken, celebrate({
   [Segments.BODY] : Joi.object().keys({
    name : Joi.string().required(),
    contact : Joi.number().required(),
    pincode : Joi.number().required(),
    address : Joi.string().required(),
    locality : Joi.string().required()
   }) 
   }),address);
}

