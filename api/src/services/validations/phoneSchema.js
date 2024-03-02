const Joi = require("joi");

const firstPhoneSchema = Joi.object({
  name: Joi.string().required().label("name"),
  brand: Joi.string().required().label("brand"),
  model: Joi.string().required().label("model"),
  price: Joi.number().min(0).required().label("price"),
  color: Joi.string().required().label("color"),
}).messages({
  "string.empty": "{{#label}} is required",
  "number.min": "{{#label}} must be a positive number",
});

const secondPhoneSchema = Joi.object({
  name: Joi.string().required().label("name"),
  details: Joi.object({
    brand: Joi.string().required().label("brand"),
    model: Joi.string().required().label("model"),
    color: Joi.string().required().label("color"),
  }),
  price: Joi.number().min(0).required().label("price"),
}).messages({
  "string.empty": "{{#label}} is required",
  "number.min": "{{#label}} must be a positive number",
});

const thirdPhoneSchema = Joi.object({
  name: Joi.string().required().label("name"),
  brand: Joi.string().required().label("brand"),
  model: Joi.string().required().label("model"),
  data: Joi.array().items(
    Joi.object({
      color: Joi.string().required().label("color"),
      price: Joi.number().min(0).required().label("price"),
    }).required()
  ),
}).messages({
  "string.empty": "{{#label}} is required",
  "number.min": "{{#label}} must be a positive number",
});

const arraySchema = Joi.array().items(thirdPhoneSchema);

module.exports = {
  firstPhoneSchema,
  secondPhoneSchema,
  arraySchema,
};
