const route = require("express").Router();
const { createPhone } = require("../controllers/phone");
const { verifyPhoneStructure, validatePhoneStructure } = require("../middlewares/phone");

route.post("/", verifyPhoneStructure, validatePhoneStructure, createPhone);

module.exports = route;
