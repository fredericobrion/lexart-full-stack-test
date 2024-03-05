const route = require("express").Router();
const { userController } = require("../controllers");
const { userMiddleware } = require("../middlewares");

route.post("/", userMiddleware.validateNewUser, userController.createUser);

module.exports = route;
