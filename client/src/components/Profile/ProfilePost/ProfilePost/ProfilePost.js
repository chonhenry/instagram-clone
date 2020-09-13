import React from "react";

import "./ProfilePost.scss";

const ProfilePost = ({ post }) => {
  const { caption, likes, image } = post;

  return (
    <div className="profile-post-box">
      <img src={`data:image/jpeg;base64,${image[0]}`} alt="" />
      <div className="text">
        <i className="fas fa-heart"></i>
        <span className="likes-count">{likes.length}</span>
        <i className="fas fa-comment"></i>
        <span className="comments-count">{caption.length}</span>
      </div>
    </div>
  );
};

export default ProfilePost;
