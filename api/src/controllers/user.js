const service = require("../services/user");
const { mapStatusHTTP } = require("../utils/mapStatusHTTP");

const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const serviceResponse = await service.createUser(userName, email, password);
  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

module.exports = {
  createUser,
};
