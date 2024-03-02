const { User } = require("../models");

const jwtUtil = require('../utils/jwt');

const extractToken = (bearerToken) => bearerToken.split(" ")[1];

const validateToken = async (req, res, next) => {
  const bearerToken = req.header("Authorization");

  if (!bearerToken) return res.status(401).json({ message: "Token not found" });

  const token = extractToken(bearerToken);

  try {
    const decoded = jwtUtil.verify(token);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ message: "Invalid Token" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = {
  validateToken,
};