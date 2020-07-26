const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

const User = require("../../models/User");
const Post = require("../../models/Post");

// @route     POST /api/posts
// @desc      create post
// @access    private
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { caption } = req.body;

    const newPost = new Post({
      caption,
      createdBy: req.user.id,
      createdByUsername: req.user.username,
    });

    const post = await newPost.save();

    user.posts.unshift({
      post: post._id,
    });

    await user.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
