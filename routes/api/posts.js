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

// @route     DELETE /api/posts/:post_id
// @desc      delete a post
// @access    private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //check user
    if (post.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // get deleted post user
    const user = await User.findById(req.user.id);

    // remove post from user
    let removeIndex = user.posts
      .map((post) => post.post.toString())
      .indexOf(req.params.post_id);
    user.posts.splice(removeIndex, 1);

    await user.save();

    await post.remove();

    res.json(user.posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
