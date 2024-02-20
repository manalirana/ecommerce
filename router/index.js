// router/index.js

const { Router } = require('express');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const cartRouter = require('.cart./route');

const router = Router();

userRoute(router);
productRoute(router);
cartRouter(router);

module.exports = router;
