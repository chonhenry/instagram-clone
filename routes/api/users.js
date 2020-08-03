const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route     GET /api/users/:username
// @desc      find a user
// @access    Public
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.params.username },
      "-password"
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT /api/users/follow/:user_id
// @desc      follow a user
// @access    Private
router.put("/follow/:user_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const follow_user = await User.findById(req.params.user_id);

    // check if the user has already been followed
    if (
      follow_user.followers.filter(
        (follower) => follower.user_id.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "You are already following this user" });
    }

    user.following.unshift({
      user_id: req.params.user_id,
      username: follow_user.username,
    });
    follow_user.followers.unshift({
      user_id: req.user.id,
      username: user.username,
    });

    await user.save();
    await follow_user.save();

    res.json(user.following);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT /api/users/unfollow/:user_id
// @desc      unfollow a user
// @access    Private
router.put("/unfollow/:user_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const unfollow_user = await User.findById(req.params.user_id);

    // check if the user has already been followed
    if (
      unfollow_user.followers.filter(
        (follower) => follower.user_id.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: "You are not following this user" });
    }

    // Get remove index
    let removeIndex = user.following
      .map((following) => following.user_id.toString())
      .indexOf(req.params.user_id);
    user.following.splice(removeIndex, 1);

    removeIndex = unfollow_user.followers
      .map((follower) => follower.user_id.toString())
      .indexOf(req.user.id);
    unfollow_user.followers.splice(removeIndex, 1);

    await user.save();
    await unfollow_user.save();

    res.json(user.following);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
