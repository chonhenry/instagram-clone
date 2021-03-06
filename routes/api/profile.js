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
// @desc     Edit user profile
// @access   Private
router.put(
  "/",
  [
    auth,
    [
      check("username", "Username cannot be empty").not().isEmpty(),
      check("email", "Email cannot be empty").not().isEmpty(),
      check("name", "Name cannot be empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { username, email, name, bio, profileImg } = req.body;

    try {
      const filter = { _id: req.user.id };
      let update = { username, email, name };

      if (bio) {
        update.bio = bio;
      }

      if (profileImg) {
        update.profileImg = profileImg;
      }

      let profile = await User.findOneAndUpdate(filter, update, {
        new: true,
        useFindAndModify: false,
      });

      return res.json({ profile });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile
// @desc     delete user profile
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // remove user from followers
    // await user.followers.forEach(async (followers) => {
    //   const user = await User.findById(followers.user_id);

    //   user.following = user.following.filter(
    //     (user) => user.user_id.toString() !== req.user.id.toString()
    //   );

    //   await user.save();
    // });

    // // remove user from following users
    // await user.following.forEach(async (following) => {
    //   const user = await User.findById(following.user_id);

    //   user.followers = user.followers.filter(
    //     (user) => user.user_id.toString() !== req.user.id.toString()
    //   );

    //   await user.save();
    // });

    // delete user
    await User.findByIdAndRemove({ _id: req.user.id });

    // delete user posts
    // to be implemented

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
