const service = require("../services/phone");
const { mapStatusHTTP, NOT_FOUND } = require("../utils/mapStatusHTTP");

const createPhone = async (req, res) => {
  const { estructure } = res.locals;
  const phones = req.body;

  if (estructure === "3") {
    const serviceResponse = await service.createMultiplePhones(phones);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  const serviceResponse = await service.createSinglePhone(estructure, phones);

  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const getPhones = async (req, res) => {
  const serviceResponse = await service.getPhones();

  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const deletePhone = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;

  const serviceResponse = await service.deletePhone(id);

  if (serviceResponse.status === NOT_FOUND) {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const updatePhone = async (req, res) => {
  const id = req.params.id;
  const phone = req.body;

  const serviceResponse = await service.updatePhone(id, phone);

  if (serviceResponse.status === NOT_FOUND) {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

module.exports = {
  createPhone,
  getPhones,
  deletePhone,
  updatePhone,
};
