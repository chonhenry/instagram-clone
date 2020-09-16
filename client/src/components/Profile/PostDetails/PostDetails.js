import React, { useState, useEffect } from "react";
import LeftSide from "../PostDetails/LeftSide/LeftSide";
import RightSide from "../PostDetails/RightSide/RightSide";
import "./PostDetails.scss";

const PostDetails = ({ post }) => {
  const [currentImg, setCurrentImg] = useState(0);


  useEffect(() => {
    console.log("post.image.length:", post.image.length);
  }, []);

  return (
    <div className="profile-details-container">
      <LeftSide
        images={post.image}
        l_arrow={currentImg !== 0 ? true : false}
        r_arrow={currentImg !== post.image.length ? true : false}
      />
      <RightSide />
    </div>
  );
};

export default PostDetails;
