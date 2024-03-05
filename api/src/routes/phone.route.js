const route = require("express").Router();
const { phoneController } = require("../controllers");
const { phoneMiddleware } = require("../middlewares");
const { validateToken } = require("../middlewares/token");

route.post(
  "/",
  validateToken,
  phoneMiddleware.verifyPhoneStructure,
  phoneMiddleware.validatePhoneStructure,
  phoneController.createPhone
);
route.get("/:id", validateToken, phoneController.getSinglePhone);
route.get("/", validateToken, phoneController.getPhones);
route.delete("/:id", validateToken, phoneController.deletePhone);
route.put(
  "/:id",
  validateToken,
  phoneMiddleware.verifyPhoneStructure,
  phoneMiddleware.validatePhoneStructure,
  phoneController.updatePhone
);

module.exports = route;
