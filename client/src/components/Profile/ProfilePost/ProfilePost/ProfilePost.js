import React, { useEffect } from "react";

import "./ProfilePost.scss";

const ProfilePost = ({ post, onClick }) => {
  const { comments, likes, image } = post;

  // useEffect(() => {
  //   console.log(post);
  // }, []);

  return (
    <div className="profile-post-box" onClick={onClick}>
      <img src={`data:image/jpeg;base64,${image[0]}`} alt="" />
      <div className="text">
        <i className="fas fa-heart"></i>
        <span className="likes-count">{likes.length}</span>
        <i className="fas fa-comment"></i>
        <span className="comments-count">{comments.length}</span>
      </div>
    </div>
  );
};

export default ProfilePost;
