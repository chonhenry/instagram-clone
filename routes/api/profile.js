const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route    GET api/profile/:username
// @desc     Get profile by username
// @access   Private
router.get("/:username", auth, async (req, res) => {
  try {
    const profile = await User.findOne(
      {
        username: req.params.username,
      },
      "-password"
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile
// @desc     Update user profile
// @access   Private

module.exports = router;
