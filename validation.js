const Joi = require("@hapi/joi");

const validateRegistrationData = (data) => { 
  const schema = Joi.object({
    first_name: Joi.string().min(1).max(100).required(),
    last_name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().min(3).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

module.exports = { validateRegistrationData };