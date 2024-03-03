const jwtUtils = require("../../src/utils/jwt");
const validEmail = "teste@email.com";
const wrongEmail = "testee@email.com";
const validPassword = "123456";
const wrongPassword = "1234567";
const hashedPassword =
  "$2b$10$qkpWEvSORt0WtNXo8l8tnO4mdekefpLoSgvGVTv/bWLaxhFstiQMm";
const id = 1;
const userName = "Teste";

const validUser = {
  email: validEmail,
  password: validPassword,
};

const invalidUserEmail = {
  email: wrongEmail,
  password: validPassword,
};

const invalidUserPassword = {
  email: validEmail,
  password: wrongPassword,
};

module.exports = {
  validEmail,
  wrongEmail,
  validPassword,
  wrongPassword,
  validUser,
  invalidUserEmail,
  invalidUserPassword,
  hashedPassword,
  // validToken,
  id,
  userName,
};
