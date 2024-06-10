const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Announcement = require("../model/Announcement");
const User = require("../model/User");
const Grid = require("gridfs-stream");
const upload = require("../gridFsStorage");
const { GridFSBucket } = require("mongodb");

let dbURI =
  "mongodb+srv://superusername:superpassword@projectcluster.rn8pcf9.mongodb.net/mit_db?retryWrites=true&w=majority&appName=projectcluster";

const conn = mongoose.createConnection(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// @route   GET api/announcements
// @desc    Get all announcements
// @access  Public
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /announcements/image/:filename
// @desc Display an image
router.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
      // gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});

router.post(
  "/",
  upload.array("images", 10),
  [
    check("title", "Title is required").not().isEmpty(),
    check("subtitle", "Subtitle is required").not().isEmpty(),
    check("content", "Content is required").not().isEmpty(),
    check("type", "Type is required.").not().isEmpty(),
    check("username", "Author's username is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, subtitle, type, content, username } = req.body;
    const imageFiles = req.files;

    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const imageIds = imageFiles.map((file) => file.filename);

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const newAnnouncement = new Announcement({
        title,
        subtitle,
        content,
        type,
        username,
        images: imageIds,
      });

      const announcement = await newAnnouncement.save();
      res.json(announcement);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET /announcements/:id
// @desc Get an announcement by ID
router.get("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// @route DELETE /announcements/:announcement_id
// @desc Delete an announcement
router.delete("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ msg: "Announcement not found" });
    }

    await Announcement.findByIdAndRemove(req.params.id);

    res.json({ msg: "Announcement removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add a comment to an announcement
router.post("/:id/comments", async (req, res) => {
  try {
    console.log(`Received comment data: user=${req.body.user}, content=${req.body.content}`);
    
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).send("Announcement not found");
    }

    const newComment = {
      username: req.body.user,
      content: req.body.content,
    };

    announcement.comments.push(newComment);
    await announcement.save();
    
    console.log(`Comment added: ${JSON.stringify(newComment)}`);
    
    res.json(announcement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Like an announcement
router.post("/:id/like", async (req, res) => {
  try {
    const { username } = req.body;
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).send("Announcement not found");
    }

    const userIndex = announcement.likedBy.indexOf(username);

    if (userIndex === -1) {
      announcement.likedBy.push(username);
      announcement.likes += 1;
    } else {
      announcement.likedBy.splice(userIndex, 1);
      announcement.likes -= 1;
    }

    await announcement.save();
    res.json(announcement);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
