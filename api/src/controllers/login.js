const jwtUtils = require("../utils/jwt");
const { verifyLogin } = require("../services/login");

const generateToken = async (req, res) => {
  const { email, password } = req.body;

  const user = await verifyLogin(email, password);

  if (user.message) {
    return res.status(401).json(user);
  }

  const token = jwtUtils.sign({ id: user.id, userName: user.userName });

  return res.status(200).json({ token });
};

module.exports = {
  generateToken,
};
