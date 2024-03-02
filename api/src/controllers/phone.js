const {
  createSinglePhone,
  createMultiplePhones,
  getPhones,
} = require("../services/phone");

const createPhone = async (req, res) => {
  const { estructure } = res.locals;
  const phones = req.body;

  if (estructure === "3") {
    const phonesCreated = await createMultiplePhones(phones);
    return res.status(201).json(phonesCreated);
  }

  const phone = await createSinglePhone(estructure, phones);

  res.status(201).json(phone);
};

const getAllPhones = async (req, res) => {
  const phones = await getPhones();

  res.status(200).json(phones);
};

module.exports = {
  createPhone,
  getAllPhones,
};
