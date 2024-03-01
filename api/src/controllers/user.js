const service = require("../services/user");

const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await service.createUser(userName, email, password);
  res.status(201).json(user);
};

module.exports = {
  createUser,
};
