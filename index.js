require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRotes = require("./routes/users");
const app = express();

connection();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRotes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listen on port ${port}... `));
