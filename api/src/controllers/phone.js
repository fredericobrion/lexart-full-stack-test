const { createSinglePhone } = require("../services/phone");

const createPhone = async (req, res) => {
  const { name, brand, model, price, color } = req.body;
  const phone = await createSinglePhone(name, brand, model, price, color);
  res.status(201).json(phone);
};

module.exports = {
  createPhone,
};
