const { createUserSchema } = require("../services/validations/userSchema");
const { findByEmail } = require("../services/user");
const { CONFLICT, mapStatusHTTP, NOT_FOUND } = require("../utils/mapStatusHTTP");

const validateNewUser = async (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { email } = req.body;
  const serviceResponse = await findByEmail(email);
  if (serviceResponse.status === NOT_FOUND) {
    return res
      .status(mapStatusHTTP(CONFLICT))
      .json("E-mail already registered. Please try again.");
  }

  next();
};

module.exports = {
  validateNewUser,
};
