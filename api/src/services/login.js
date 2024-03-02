const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwtUtils = require("../utils/jwt");
const { UNAUTHORIZED, OK } = require('../utils/mapStatusHTTP');

const verifyLogin = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { status: UNAUTHORIZED, data: { message: "E-mail or password invalid" } };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { status: UNAUTHORIZED, data: { message: "E-mail or password invalid" } };
  }

  const token = jwtUtils.sign({ id: user.id, userName: user.userName });

  return { status: OK, data: { token } };
};

module.exports = {
  verifyLogin,
};
