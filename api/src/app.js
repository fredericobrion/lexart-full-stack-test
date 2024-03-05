const express = require("express");
const cors = require("cors");
const RateLimit = require("express-rate-limit");
const helmet = require("helmet");

require('dotenv').config();
const { userRoutes, loginRoutes, phoneRoutes } = require('./routes')

const app = express();

const lmiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
})

app.use(express.json());

app.use(helmet());
app.use(cors());
app.use(lmiter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/phone", phoneRoutes);

module.exports = app;