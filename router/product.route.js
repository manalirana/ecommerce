const { celebrate, Joi, Segments } = require('celebrate');
const verifyToken = require('../middleware/seller.middleware');
const {product,
     getproduct,
     patch, deleteproduct, getProductByCategory, getProductBySubCategory, getProductByPrice,
     getProductBySize, getProductByBrand
     } =
require('../controllers/product.controller');

module.exports = (router) => {

router.post('/product', verifyToken, celebrate({
[Segments.BODY] : Joi.object().keys({
    productName : Joi.string().required(),
    sku :  Joi.string().required(),
    size : Joi.array().required(), 
    brand : Joi.string().required(),
    category : Joi.string().required(),
    subCategory : Joi.string().required(),
    images : Joi.array().required(),
    price : Joi.number().required(),
})

}), product);

router.get('/product', getproduct);
router.patch('/product/:id',verifyToken, patch);
router.delete('/product/:id',verifyToken, deleteproduct);
router.get('/getProductByCategory', getProductByCategory);
router.get('/getProductBySubCategory', getProductBySubCategory);
router.get('/getProductByPrice', getProductByPrice);
router.get('/getProductBySize', getProductBySize);
router.get('/getProductByBrand', getProductByBrand);
}
