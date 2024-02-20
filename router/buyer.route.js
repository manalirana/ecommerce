const express = require('express');
const { signUp, login } = require('../controllers/buyer.controller');
const router = express.Router();

module.exports = (router) => {
  router.post('signUp', signUp);
  router.post('login', login);
}