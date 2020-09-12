import React from "react";

import "./ProfilePost.scss";

const ProfilePost = ({ createdBy }) => {
  return <div className="profile-post-box">{createdBy}</div>;
};

export default ProfilePost;
