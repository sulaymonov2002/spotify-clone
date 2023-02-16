const router = require("express").Router();
const { User } = require("../models/song");
const { Song, validate } = require("../models/song");
const auth = require("../middleware/admin");
const admin = require("../middleware/validObjectId");

// create song
router.post("/", admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const song = await Song(req.body).save();
  res.status(201).send({ data: song, message: "Song created successfully" });
});


// get all songs
