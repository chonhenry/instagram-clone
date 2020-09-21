import React from "react";
import "./Author.scss";

const Author = ({ image, username, authorId, followingList, self }) => {
  return (
    <div className="author-container">
      <div className="author-info">
        <img className="author-img margin-right" src={image} />
        <div className="author-username margin-right">{username}</div>
        {/* {!self && <div className="margin-right">•</div>}
        {!self && <div>Following</div>} */}
      </div>

      <div className="dots">
        <i className="fas fa-ellipsis-h"></i>
      </div>
    </div>
  );
};

export default Author;
