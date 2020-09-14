import React, { useEffect } from "react";
import LeftSide from "../PostDetails/LeftSide/LeftSide";
import RightSide from "../PostDetails/RightSide/RightSide";
import "./PostDetails.scss";

const PostDetails = ({ post }) => {
  useEffect(() => {
    console.log(post);
  }, []);

  return (
    <div className="profile-details-container">
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default PostDetails;
