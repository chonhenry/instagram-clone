import React, { useEffect } from "react";
import Comment from "../Comment/Comment";
import "./CommentsContainer.scss";

const CommentsContainer = ({ comments, caption, postId }) => {
  useEffect(() => {
    //console.log(comments);
  }, []);

  return (
    <div className="comments-container">
      <Comment comment={caption} isCaption={true} />
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} postId={postId} />
      ))}
    </div>
  );
};

export default CommentsContainer;
