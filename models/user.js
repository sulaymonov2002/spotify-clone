const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  name: { type: String, required: true },
  name: { type: String, required: true },
  name: { type: String, required: true },
  name: { type: String, required: true },
  name: { type: String, required: true },
});
