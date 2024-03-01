const express = require("express");
require('dotenv').config();
const { userRoutes, loginRoutes } = require('./routes')

console.log(process.env.POSTGRES_USER);

const app = express();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/login", loginRoutes);

module.exports = app;