const { loginSchema } = require("../services/validations/loginSchema");

const validateLoginFields = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = {
  validateLoginFields,
};
