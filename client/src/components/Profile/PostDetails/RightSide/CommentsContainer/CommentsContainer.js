import React, { useState } from "react";
import Comment from "../Comment/Comment";
import "./CommentsContainer.scss";

const CommentsContainer = ({ comments, caption, postId }) => {
  const [commentsCount, setCommentsCount] = useState(6);

  const onClick = () => {
    setCommentsCount((prev) => prev + 6);
  };

  return (
    <div className="comments-container">
      <Comment comment={caption} isCaption={true} />
      {comments.slice(0, commentsCount).map((comment) => (
        <Comment key={comment._id} comment={comment} postId={postId} />
      ))}

      {commentsCount <= comments.length && (
        <div className="more-comment" onClick={onClick}>
          <span className="plus">+</span>
        </div>
      )}
    </div>
  );
};

export default CommentsContainer;
