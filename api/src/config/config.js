const pg = require("pg");

const config = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const developmentConfig = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  dialect: "postgres",
};

module.exports = {
  development: developmentConfig,
  test: config,
  production: config,
};
