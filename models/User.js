const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
  },
  gender: {
    type: String,
  },
  posts: [
    {
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
