// https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdByUsername: {
    type: String,
  },
  caption: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      username: {
        type: String,
      },
    },
  ],
  comments: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      username: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      likes: [
        {
          user_id: {
            type: Schema.Types.ObjectId,
            ref: "users",
          },
          username: {
            type: String,
          },
        },
      ],
      profileImg: {
        type: String,
        //required: true,
      },
    },
  ],
});

module.exports = Post = mongoose.model("post", PostSchema);
