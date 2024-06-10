const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../model/User");

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/users
// @desc    Add a new user
// @access  Public
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, role, username, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      firstname,
      lastname,
      email,
      role,
      username,
      password,
    });

    user = await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message }).send("Server Error");
  }
});

// @route   PUT api/users/:id
// @desc    Update a user
// @access  Public
router.put(
  "/:id",
  [
    check("firstname", "Firstname is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("role", "Role is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, role, username, password } = req.body;

    // Build user object
    const userFields = {};
    if (firstname) userFields.firstname = firstname;
    if (lastname) userFields.lastname = lastname;
    if (email) userFields.email = email;
    if (role) userFields.role = role;
    if (username) userFields.username = username;
    if (password) userFields.password = password;

    try {
      let user = await User.findById(req.params.id);

      if (!user) return res.status(404).json({ msg: "User not found" });

      // Update user
      user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: userFields },
        { new: true }
      );

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ msg: "Error updating the user." })
        .send("Server Error");
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
