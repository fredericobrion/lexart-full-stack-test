const { createUserSchema } = require("../services/validations/userSchema");
const { findByEmail } = require("../services/user");

const validateNewUser = async (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { email } = req.body;
  const existingUser = await findByEmail(email);
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  next();
};

module.exports = {
  validateNewUser,
};
