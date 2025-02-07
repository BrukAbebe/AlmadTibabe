const Joi = require('joi');

const authValidation = {
  login: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
};

module.exports = authValidation;