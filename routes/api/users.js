const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route     GET /api/users/me
// @desc      Get current user profile
// @access    Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/users/:username
// @desc     Get profile by username
// @access   Public
router.get("/user/:username", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      username: req.params.username,
    });

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // if (err.kind == "ObjectId") {
    //   return res.status(400).json({ msg: "Profile not found" });
    // }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
