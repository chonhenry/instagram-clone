import React, { useEffect } from "react";
import Comment from "../Comment/Comment";
import "./CommentsContainer.scss";

const CommentsContainer = ({ posts }) => {
  useEffect(() => {
    console.log(posts);
  }, []);

  return (
    <div className="comments-container">
      CommentsContainer
      <div>
        <Comment />
      </div>
    </div>
  );
};

export default CommentsContainer;
