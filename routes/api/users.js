const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route     PUT /api/users/follow/:user_id
// @desc      follow a user
// @access    Private
router.put("/follow/:user_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const follow_user = await User.findById(req.params.user_id);

    // check if the user has already been follow
    if (
      follow_user.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "You are already following this user" });
    }

    user.following.unshift({ user: req.params.user_id });
    follow_user.followers.unshift({ user: req.user.id });

    await user.save();
    await follow_user.save();

    res.send("follow user");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
