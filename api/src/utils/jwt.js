const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const sign = (payload) => {
  const jwtConfig = {
    expiresIn: "7d",
    algorithm: "HS256",
  };

  const token = jwt.sign({ id: payload.id, userName: payload.userName }, JWT_SECRET, jwtConfig);

  return token;
};

const verify = (token) => {
  const data = jwt.verify(token, JWT_SECRET);
  return data;
};

module.exports = {
  sign,
  verify,
};