const express = require("express");
require('dotenv').config();
const { userRoutes } = require('./routes')

console.log(process.env.POSTGRES_USER);

const app = express();

app.use(express.json());

app.use("/user", userRoutes);

module.exports = app;