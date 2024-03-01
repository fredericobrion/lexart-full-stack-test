const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required().label("email"),
    password: Joi.string().min(6).required().label("password"),
  }).messages({
    "string.min": "{{#label}} length must be at least {{#limit}} characters long",
    "string.pattern.base": "{{#label}} must be a valid email",
  });
  
  module.exports = {
    loginSchema,
  };