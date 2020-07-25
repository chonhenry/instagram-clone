// https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  caption: {
    type: String,
  },
  img: {
    type: String,
    //required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Post = mongoose.model("post", PostSchema);
