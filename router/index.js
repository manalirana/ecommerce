// router/index.js

const { Router } = require('express');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const buyerRoute = require('./buyer.route');
const cartRouter = require('./cart.route');
const orderRoute = require('./order.route');

const router = Router();

userRoute(router);
productRoute(router);
buyerRoute(router);
cartRouter(router);
orderRoute(router);

module.exports = router;
