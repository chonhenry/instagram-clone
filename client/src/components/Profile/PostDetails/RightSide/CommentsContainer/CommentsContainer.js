import React, { useState } from "react";
import Comment from "../Comment/Comment";
import { connect } from "react-redux";
import "./CommentsContainer.scss";

const CommentsContainer = ({ comments, caption, postId,authUser }) => {
  const [commentsCount, setCommentsCount] = useState(6);

  const onClick = () => {
    setCommentsCount((prev) => prev + 6);
  };

  return (
    <div className="comments-container">
      <Comment comment={caption} isCaption={true} />
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} postId={postId} />
      ))}

      {/* {commentsCount <= comments.length && (
        <div className="more-comment" onClick={onClick}>
          <span className="plus">+</span>
        </div>
      )} */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: state.auth.user,
  };
};

export default connect(mapStateToProps)(CommentsContainer);
