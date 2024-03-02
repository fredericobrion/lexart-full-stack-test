const route = require("express").Router();
const { createPhone, deletePhone, getPhones } = require("../controllers/phone");
const {
  verifyPhoneStructure,
  validatePhoneStructure,
} = require("../middlewares/phone");

route.post("/", verifyPhoneStructure, validatePhoneStructure, createPhone);
route.get("/", getPhones);
route.delete("/:id", deletePhone);

module.exports = route;
