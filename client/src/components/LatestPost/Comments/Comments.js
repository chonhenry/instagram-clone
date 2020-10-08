import React from "react";
import "./Comments.scss";

const Comments = ({ username, caption }) => {
  return (
    <div className="comments">
      {<strong>{`${username} `}</strong>}
      {caption}
    </div>
  );
};

export default Comments;

// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
