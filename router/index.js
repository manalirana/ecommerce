// router/index.js

const { Router } = require('express');
const userRoute = require('./user.route');
const productRoute = require('./product.route');

const router = Router();

userRoute(router);
productRoute(router);

module.exports = router;
