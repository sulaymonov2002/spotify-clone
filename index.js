require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRotes = require("./routes/users");
const authRotes = require("./routes/auth");

const app = express();

connection();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRotes);
app.use("/api/login", authRotes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listen on port ${port}... `));
