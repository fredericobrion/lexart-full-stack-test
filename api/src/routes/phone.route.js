const route = require("express").Router();
const { createPhone } = require("../controllers/phone");

route.post("/", createPhone);

module.exports = route;