const router = require("express").Router();
const { Playlist, validate } = require("../models/playlist");
const { Song } = require("../models/song");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const validObjectId = require("../middleware/validObjectId");
const Joi = require("joi");
const { send } = require("process");

// create playlist
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findById(req.user._id);
  const playlist = await Playlist({ ...req.body, user: user._id }).save();
  user.playlists.push(playlist._id);
  await user.save();

  res.status(201).send({ data: playlist });
});

module.exports = router;
