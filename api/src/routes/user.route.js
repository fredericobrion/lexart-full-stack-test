const route = require("express").Router();
const { createUser } = require("../controllers/user");
const { validateNewUser } = require("../middlewares/user");

route.post("/", validateNewUser, createUser);

module.exports = route;
