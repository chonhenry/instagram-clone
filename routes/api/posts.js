const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

const User = require("../../models/User");
const Post = require("../../models/Post");

// @route     GET /api/posts/:post_id
// @desc      get a single post
// @access    public
router.get("/:post_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST /api/posts
// @desc      create post
// @access    private
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { caption, image } = req.body;

    const newPost = new Post({
      caption,
      createdBy: req.user.id,
      createdByUsername: req.user.username,
      image,
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

// @route     PUT /api/posts/like/:post_id
// @desc      like a post
// @access    private
router.put("/like/:post_id", auth, async (req, res) => {
  const post = await Post.findById(req.params.post_id);

  if (
    post.likes.filter((like) => like.user_id.toString() === req.user.id)
      .length > 0
  ) {
    return res.status(400).json({ msg: "You have already liked this post" });
  }

  post.likes.unshift({
    user_id: req.user.id,
    username: req.user.username,
  });

  await post.save();

  res.json(post);
});

// @route     PUT /api/posts/unlike/:post_id
// @desc      unlike a post
// @access    private
router.put("/unlike/:post_id", auth, async (req, res) => {
  const post = await Post.findById(req.params.post_id);

  if (
    post.likes.filter((like) => like.user_id.toString() === req.user.id)
      .length === 0
  ) {
    return res.status(400).json({ msg: "You have not liked this post" });
  }

  let removeIndex = post.likes
    .map((like) => like.user_id.toString())
    .indexOf(req.user.id);
  post.likes.splice(removeIndex, 1);

  await post.save();

  res.json(post);
});

// @route     PUT /api/posts/comment/:post_id
// @desc      add comment to a post
// @access    private
router.put("/comment/:post_id", auth, async (req, res) => {
  const post = await Post.findById(req.params.post_id);

  post.comments.unshift({
    user_id: req.user.id,
    username: req.user.username,
    text: req.body.text,
    profileImg: req.body.profileImg,
  });

  await post.save();

  res.json(post);
});

// @route     PUT /api/posts/remove_comment/post_id=:post_id&comment_id=:comment_id
// @desc      remove comment from a post
// @access    private
router.put(
  "/remove_comment/post_id=:post_id&comment_id=:comment_id",
  auth,
  async (req, res) => {
    const post = await Post.findById(req.params.post_id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user_id.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  }
);

// @route     PUT /api/posts/comment/like/:post_id&:comment_id
// @desc      like a comment
// @access    private
router.put("/comment/like/:post_id&:comment_id", auth, async (req, res) => {
  const post = await Post.findById(req.params.post_id);
  let idx;
  const comments = post.comments;

  for (let i = 0; i < comments.length; i++) {
    if (comments[i]._id.toString() === req.params.comment_id) {
      idx = i;
      const comment = comments[i];

      if (
        comment.likes.filter((like) => like.user_id.toString() === req.user.id)
          .length > 0
      ) {
        return res
          .status(400)
          .json({ msg: "You have already liked this comment" });
      }

      post.comments[i].likes.unshift({
        user_id: req.user.id,
        username: req.user.username,
      });

      await post.save();
      res.json(post);
      break;
    }
  }

  return res.status(400).json({ msg: "Comment not found" });
});

module.exports = router;

// @route     PUT /api/posts/comment/unlike/:post_id&:comment_id&:like_id
// @desc      unlike a comment
// @access    private
router.put(
  "/comment/unlike/:post_id&:comment_id&:like_id",
  auth,
  async (req, res) => {
    const post = await Post.findById(req.params.post_id);
    const comments = post.comments;

    for (let i = 0; i < comments.length; i++) {
      if (comments[i]._id.toString() === req.params.comment_id) {
        let comment_idx = i;
        let like_idx;
        const comment = comments[comment_idx];

        let like = comment.likes.find(
          (like) => like._id.toString() === req.params.like_id
        );

        if (!like) return res.status(404).json({ msg: "Like does not exist" });

        // Check user
        if (like.user_id.toString() !== req.user.id) {
          console.log(like.user_id.toString());
          console.log(req.user.id);
          return res.status(401).json({ msg: "User not authorized" });
        }

        like_idx = comment.likes
          .map((like) => like._id.toString)
          .indexOf(req.params.like_id);

        post.comments[comment_idx].likes.splice(like_idx, 1);

        await post.save();
        res.json(post);
        break;
      }
    }

    return res.status(400).json({ msg: "Comment not found" });
  }
);
