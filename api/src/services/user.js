const { User } = require("../models");
const bcrypt = require("bcrypt");
const { CREATED, NOT_FOUND, OK, CONFLICT } = require("../utils/mapStatusHTTP");

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const createUser = async (userName, email, password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({
    userName,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  return {
    status: CREATED,
    data: { id: user.id, userName: user.userName, email: user.email },
  };
};

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { status: NOT_FOUND, data: { message: "User not found" } };
  }

  return { status: OK, data: { id: user.id, userName: user.userName, email: user.email } };
};

module.exports = {
  createUser,
  findByEmail,
};
