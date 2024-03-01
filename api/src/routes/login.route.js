const route = require("express").Router();
const { validateLoginFields } = require("../middlewares/login");
const { generateToken } = require("../controllers/login");

route.post("/", validateLoginFields, generateToken);

module.exports = route;
