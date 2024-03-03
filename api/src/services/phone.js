const { Phone } = require("../models");
const { CREATED, OK, NOT_FOUND } = require("../utils/mapStatusHTTP");
const {
  formatSecondPhoneEstructure,
  formatThirdPhoneEstructure,
} = require("../utils/phone");

const createSinglePhone = async (estructure, phone) => {
  const formattedPhone =
    estructure === "2" ? formatSecondPhoneEstructure(phone) : phone;
  const { name, brand, model, price, color } = formattedPhone;
  const phoneCreated = await Phone.create({ name, brand, model, price, color });

  return { status: CREATED, data: phoneCreated.dataValues };
};

const createMultiplePhones = async (phones) => {
  const formattedPhones = formatThirdPhoneEstructure(phones);
  const phonesCreated = await Phone.bulkCreate(formattedPhones);

  return {
    status: CREATED,
    data: phonesCreated.map((phone) => phone.dataValues),
  };
};

const getPhones = async () => {
  const phones = await Phone.findAll();

  return { status: OK, data: phones.map((phone) => phone.dataValues) };
};

const getSinglePhone = async (id) => {
  const phone = await Phone.findByPk(id);
  if (!phone) {
    return { status: NOT_FOUND, data: { message: "Phone not found" } };
  }

  return { status: OK, data: phone.dataValues };
};

const deletePhone = async (id) => {
  const phone = await Phone.findByPk(id);
  if (!phone) {
    return { status: NOT_FOUND, data: { message: "Phone not found" } };
  }

  await Phone.destroy({ where: { id } });
  return { status: OK, data: phone.dataValues };
};

const updatePhone = async (id, phone) => {
  const phoneToUpdate = await Phone.findByPk(id);
  if (!phoneToUpdate) {
    return { status: NOT_FOUND, data: { message: "Phone not found" } };
  }

  const { name, brand, model, price, color } = phone;


  await phoneToUpdate.update({ name, brand, model, price, color });

  return { status: OK, data: phoneToUpdate.dataValues };
};

module.exports = {
  createSinglePhone,
  createMultiplePhones,
  getPhones,
  deletePhone,
  updatePhone,
  getSinglePhone,
};
