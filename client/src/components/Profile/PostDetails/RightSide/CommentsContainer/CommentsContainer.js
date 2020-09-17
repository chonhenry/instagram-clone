import React from "react";
import Comment from "../Comment/Comment";
import "./CommentsContainer.scss";

const CommentsContainer = () => {
  return (
    <div className='comments-container'>
      CommentsContainer
      <div>
        <Comment />
      </div>
    </div>
  );
};

export default CommentsContainer;
