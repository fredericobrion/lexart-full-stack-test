const bcrypt = require("bcrypt");
const { User } = require("../models");

const verifyLogin = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { message: "E-mail or password invalid" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { message: "E-mail or password invalid" };
  }

  console.log('service')

  return user;
};

module.exports = {
  verifyLogin,
};
