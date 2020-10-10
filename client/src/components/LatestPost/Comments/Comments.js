import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Comments.scss";

const Comments = ({ username, text, caption }) => {
  return (
    <div className="comments">
      <div className="comments-text">
        <Link to={`/${username}`} className="username-link">
          {<strong>{`${username} `}</strong>}
        </Link>

        {text}
      </div>

      {!caption && <i className={`far fa-heart`} />}
    </div>
  );
};

export default Comments;

// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// character count 90
