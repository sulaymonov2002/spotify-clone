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

// edit playlist by id
router.put("/edit/:id", [validObjectId, auth], async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().require(),
    desc: Joi.string().allow(""),
    img: Joi.string().allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const playlist = await Playlist.findById(req.params.id);
  if (!playlist) return res.status(404).send({ message: "Playlist not found" });

  const user = await User.findById(req.user._id);
  if (!user._id.equals(playlist.user))
    return res.status(403).send({ message: "User don't have access to edit" });

  playlist.name = req.body.name;
  playlist.desc = req.body.desc;
  playlist.img = req.body.img;
  await playlist.save();

  res.status(200).send({ message: "Updated successfully" });
});

// add song to playlist
router.put("/add-song", auth, async (req, res) => {
  const schema = Joi.object({
    playlistId: Joi.string().required(),
    songId: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0] });

  const user = await User.findById(req.user._id);
  const playlist = await Playlist.findById(req.body.playlistId);

  if (!user._id.equals(playlist.user))
    return res.status(403).send({ message: "User don't have access to add" });

  if (playlist.songs.indexOf(req.body.songId) === -1) {
    playlist.songs.push(req.body.songId);
  }
  await playlist.save();
  res.status(200).send({ data: playlist, message: "Added to playlist " });
});

// remove song from playlist
router.put("/remove-song", auth, async (req, res) => {
  const schema = Joi.object({
    playlistId: Joi.string().required(),
    songId: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findById(req.user._id);
  const playlist = await Playlist.findById(req.body.playlistId);
  if (!user._id.equals(playlist.user))
    return res.status(403).send({ message: "User don't have access to add" });
});

module.exports = router;
