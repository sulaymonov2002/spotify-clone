const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// create user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0] });
});

module.exports = router;
