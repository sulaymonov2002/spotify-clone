require("dotenv").config();
const express = require("express");
const connection = require("./db");
const app = express();

connection();

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listen on port ${port}... `));
