const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/admin");
const valid = require("../middleware/validObjectId");
const validObjectId = require("../middleware/validObjectId");

// create user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(403)
      .send({ message: "User with given email already exist" });

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  let newUser = await new User({
    ...req.body,
    password: hashPassword,
  }).save();

  newUser.password = undefined;
  newUser.__v = undefined;

  res
    .status(200)
    .send({ data: newUser, message: "Account created successfully" });
});

// get all users
router.get("/", admin, async (req, res) => {
  const users = await User.find().select("-password - _v");
  res.status(200).send({ data: users });
});

/// get user by id

router.get("/:id", [validObjectId, auth], async (req, res) => {
  const user = await User.findById(req.params.id).select("-password -_v");
  req.status(200).send({ data: user });
});

module.exports = router;
