const route = require("express").Router();
const { createPhone, getAllPhones } = require("../controllers/phone");
const { verifyPhoneStructure, validatePhoneStructure } = require("../middlewares/phone");

route.post("/", verifyPhoneStructure, validatePhoneStructure, createPhone);
route.get("/", getAllPhones);


module.exports = route;
