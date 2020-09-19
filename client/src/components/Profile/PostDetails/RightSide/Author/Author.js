import React from "react";
import { Link } from "react-router-dom";
import "./Author.scss";

const Author = ({ image, username }) => {
  return (
    <div className="author-container">
      <div className="author-info">
        <img className="author-img margin-right" src={image} />
        <div className="author-username margin-right">{username}</div>
        <div className="margin-right">•</div>
        <div>Following</div>
      </div>

      <div className="dots">
        <i className="fas fa-ellipsis-h"></i>
      </div>
    </div>
  );
};

export default Author;
