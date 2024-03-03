const { verifyLogin } = require('../services/login');
const { UNAUTHORIZED, mapStatusHTTP } = require('../utils/mapStatusHTTP');

const generateToken = async (req, res) => {
  const { email, password } = req.body;

  const serviceResponse = await verifyLogin(email, password);

  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

module.exports = {
  generateToken,
};
