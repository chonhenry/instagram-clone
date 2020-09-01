import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";
import "./CreatePost.scss";

const CreatePost = () => {
  return (
    <div>
      <Navbar />
      <CreatePostForm />
    </div>
  );
};

export default CreatePost;
