const { celebrate, Joi, Segments } = require('celebrate');
const { signUp, login } = require('../controllers/buyer.controller');
// const router = express.Router();

module.exports = (router) => {
  router.post('signUp', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }),
  signUp);
  
  router.post('login', celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }),
  login);
}