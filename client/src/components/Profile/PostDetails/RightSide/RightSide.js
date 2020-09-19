import React, { useEffect } from "react";
import Author from "./Author/Author";
import CommentsContainer from "./CommentsContainer/CommentsContainer";
import PostButtons from "./PostButtons/PostButtons";
import LikesCount from "./LikesCount/LikesCount";
import PostDate from "./PostDate/PostDate";
import WriteComment from "./WriteComment/WriteComment";
import { connect } from "react-redux";
import "./RightSide.scss";

const RightSide = ({ post, author }) => {
  useEffect(() => {
    //console.log(post);
    console.log(author);
  }, [author]);

  return (
    <div className="right-side">
      <Author image={author.profileImg} username={post.createdByUsername} />
      <CommentsContainer />
      <PostButtons />
      <LikesCount />
      <PostDate />
      <WriteComment />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    author: state.user.user,
  };
};

export default connect(mapStateToProps)(RightSide);

// caption: "fourth post"
// comments: []
// createdBy: "5f4a8d6cac595613d78ff33f"
// createdByUsername: "henrychon"
// date: "2020-09-12T20:38:23.975Z"
// image: ["/9j/4AAQSkZJRgABAQEBLAEsAAD/4QDxRXhpZgAATU0AKgAAAA…6da4vOqffW4gJKAMJVMj2NStNDbtq6pCocBwgnn2NHrA//9k="]
// likes: []
// __v: 0
// _id: "5f5d31bf92963e443cbca2dc"
