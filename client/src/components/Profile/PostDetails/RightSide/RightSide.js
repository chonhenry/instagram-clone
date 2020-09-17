import React from "react";
import Author from "./Author/Author";
import CommentsContainer from "./CommentsContainer/CommentsContainer";
import PostButtons from "./PostButtons/PostButtons";
import LikesCount from "./LikesCount/LikesCount";
import PostDate from "./PostDate/PostDate";
import WriteComment from "./WriteComment/WriteComment";
import "./RightSide.scss";

const RightSide = () => {
  return (
    <div className="right-side">
      <Author />
      <CommentsContainer />
      <PostButtons />
      <LikesCount />
      <PostDate />
      <WriteComment />
    </div>
  );
};

export default RightSide;
