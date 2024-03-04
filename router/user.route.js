const { celebrate, Joi, Segments } = require('celebrate');
const { signUp, login, forgotPassword, verifyOtp, resendOtp, createPassword } = require('../controllers/user.controller');
const verifyToken = require('../middleware/seller.middleware');

module.exports = (router) => {
  router.post('/signUp', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }), signUp);

  router.post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }), login);
  router.post('/forgotPasword', forgotPassword);
  router.post('/verifyOtp', verifyToken, verifyOtp);
  router.post('/resendOtp',verifyToken ,resendOtp)
  router.post('/createPassword',verifyToken, createPassword);
};


