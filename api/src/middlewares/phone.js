const {
  firstPhoneSchema,
  secondPhoneSchema,
  arraySchema,
} = require("../services/validations/phoneSchema");

const verifyPhoneStructure = (req, res, next) => {
  const phones = req.body;

  let estructure = "1";

  if (Array.isArray(phones)) {
    estructure = "3";
  } else if (typeof phones === "object" && phones.hasOwnProperty("details")) {
    estructure = "2";
  }

  res.locals.estructure = estructure;
  next();
};

const validatePhoneStructure = (req, res, next) => {
  const { estructure } = res.locals;
  const phones = req.body;

  let error;

  switch (estructure) {
    case "1":
      error = firstPhoneSchema.validate(phones).error;
      break;
    case "2":
      error = secondPhoneSchema.validate(phones).error;
      break;
    case "3":
      error = arraySchema.validate(phones).error;
      break;
  }

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.locals.estructure = estructure;
  next();
};

module.exports = { verifyPhoneStructure, validatePhoneStructure };
