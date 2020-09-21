import React, { useState, useEffect } from "react";
import Author from "./Author/Author";
import CommentsContainer from "./CommentsContainer/CommentsContainer";
import PostStats from "./PostStats/PostStats";
import WriteComment from "./WriteComment/WriteComment";
import { connect } from "react-redux";
import "./RightSide.scss";

const RightSide = ({ post, author, authUser }) => {
  useEffect(() => {
    //console.log(post);
  }, [author]);

  return (
    <div className="right-side">
      <Author
        image={author.profileImg}
        username={post.createdByUsername}
        authorId={author._id}
        followingList={authUser.following}
        self={author._id === authUser._id}
      />
      <CommentsContainer posts={post.comments} />
      <PostStats
        postId={post._id}
        likes={post.likes}
        authUsername={authUser.username}
        date={post.date}
      />
      <WriteComment postId={post._id} image={authUser.profileImg} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: state.auth.user,
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
