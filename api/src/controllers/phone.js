const { phoneService } = require("../services");

const { mapStatusHTTP, NOT_FOUND } = require("../utils/mapStatusHTTP");

const createPhone = async (req, res) => {
  const { estructure } = res.locals;
  const phones = req.body;

  if (estructure === "3") {
    const serviceResponse = await phoneService.createMultiplePhones(phones);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  const serviceResponse = await phoneService.createSinglePhone(estructure, phones);

  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const getPhones = async (req, res) => {
  const serviceResponse = await phoneService.getPhones();

  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const deletePhone = async (req, res) => {
  const id = req.params.id;

  const serviceResponse = await phoneService.deletePhone(id);

  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const updatePhone = async (req, res) => {
  const id = req.params.id;
  const phone = req.body;

  const serviceResponse = await phoneService.updatePhone(id, phone);

  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

const getSinglePhone = async (req, res) => {
  const id = req.params.id;

  const serviceResponse = await phoneService.getSinglePhone(id);

  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

module.exports = {
  createPhone,
  getPhones,
  deletePhone,
  updatePhone,
  getSinglePhone,
};
