require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRotes = require("./routes/users");
const authRotes = require("./routes/auth");
const songRoutes = require("./routes/songs");

const app = express();

connection();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRotes);
app.use("/api/login", authRotes);
app.use("/api/songs", songRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listen on port ${port}... `));
