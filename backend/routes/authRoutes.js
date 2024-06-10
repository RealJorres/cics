const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");

const router = express.Router();

// @route   PUT api/users/:id
// @desc    Update a user
// @access  Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).json({ message: "Username or password is wrong" });

  // Check password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, "mitproject");
  res.header("Authorization", token).json({ token: token, username: user.username , role: user.role});
});

module.exports = router;
