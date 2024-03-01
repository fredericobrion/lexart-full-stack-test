const express = require("express");
require('dotenv').config();
const { userRoutes, loginRoutes, phoneRoutes } = require('./routes')

console.log(process.env.POSTGRES_USER);

const app = express();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/phone", phoneRoutes);

module.exports = app;