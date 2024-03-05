const loginMiddleware = require("./login");
const tokenMiddleware = require("./token");
const userMiddleware = require("./user");
const phoneMiddleware = require("./phone");

module.exports = {
  loginMiddleware,
  tokenMiddleware,
  userMiddleware,
  phoneMiddleware,
};
