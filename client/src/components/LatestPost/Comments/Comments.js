import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Comments.scss";

const Comments = ({ username, text, caption }) => {
  const [commentLiked, setCommentLiked] = useState(false);

  const likeComment = () => {
    console.log("like");
  };

  return (
    <div className="comments">
      <div className="comments-text">
        <Link to={`/${username}`} className="username-link">
          {<strong>{`${username} `}</strong>}
        </Link>

        {text}
      </div>

      {/* {!caption && (
        <i className={`far fa-heart`} onClick={() => likeComment()} />
      )} */}
    </div>
  );
};

export default Comments;

// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// character count 90
