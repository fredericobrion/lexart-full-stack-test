const service = require("../services/phone");

const createPhone = async (req, res) => {
  const { estructure } = res.locals;
  const phones = req.body;

  if (estructure === "3") {
    const phonesCreated = await service.createMultiplePhones(phones);
    return res.status(201).json(phonesCreated);
  }

  const phone = await service.createSinglePhone(estructure, phones);

  res.status(201).json(phone);
};

const getPhones = async (req, res) => {
  const phones = await service.getPhones();

  res.status(200).json(phones);
};

const deletePhone = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;

  const phone = await service.deletePhone(id);

  if (!phone) {
    return res.status(404).json({ message: "Phone not found" });
  }

  res.status(204).json(phone);
};

const updatePhone = async (req, res) => {
  const id = req.params.id;
  const phone = req.body;

  const phoneUpdated = await service.updatePhone(id, phone);

  if (!phoneUpdated) {
    return res.status(404).json({ message: "Phone not found" });
  }

  res.status(200).json(phoneUpdated);
};

module.exports = {
  createPhone,
  getPhones,
  deletePhone,
  updatePhone,
};
