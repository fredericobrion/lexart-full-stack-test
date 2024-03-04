const pg = require("pg");

const config = {
  username: process.env.POSTGRES_USER,
  // username: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  // password: "password",
  database: process.env.POSTGRES_DATABASE,
  // database: "postgres",
  host: process.env.POSTGRES_HOST,
  // host: "localhost",
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
