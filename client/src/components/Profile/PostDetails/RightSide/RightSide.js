import React, {useState} from "react";
import Author from "./Author/Author";
import CommentsContainer from "./CommentsContainer/CommentsContainer";
import PostStats from "./PostStats/PostStats";
import WriteComment from "./WriteComment/WriteComment";
import { connect } from "react-redux";
import "./RightSide.scss";

const RightSide = ({ post, author, authUser, mainPage }) => {
  const [commentsArray, setCommentsArray] = useState(post.comments)

  const addNewComment = (comment, text)=>{
    setCommentsArray(prev=>[...prev,comment]);
  }

  const profile_page = () => {
    let comment_info = {
      username: author.username,
      date: post.date,
      likes: [],
      profileImg: author.profileImg,
      text: post.caption,
    };

    return (
      <div className="right-side">
        <Author
          image={author.profileImg}
          username={post.createdByUsername}
          self={author && author._id === authUser._id}
          postId={post._id}
        />
        <CommentsContainer
          comments={commentsArray}
          caption={comment_info}
          postId={post._id}
        />
        <PostStats
          postId={post._id}
          likes={post.likes}
          authUsername={authUser.username}
          date={post.date}
        />
        <WriteComment postId={post._id} image={authUser.profileImg} addNewComment={addNewComment}/>
      </div>
    );
  };

  const main_page = () => {
    let comment_info = {
      username: post.username,
      date: post.date,
      likes: [],
      profileImg: post.profileImg,
      text: post.caption,
    };

    return (
      <div className="right-side">
        <Author
          image={post.profileImg}
          username={post.username}
          self={author && author._id === authUser._id}
          postId={post._id}
        />
        <CommentsContainer
          comments={commentsArray}
          caption={comment_info}
          postId={post._id}
        />
        <PostStats
          postId={post.postId}
          likes={post.likes}
          authUsername={authUser.username}
          date={post.date}
        />
        <WriteComment postId={post.postId} image={authUser.profileImg} addNewComment={addNewComment}/>
      </div>
    );
  };

  return mainPage ? main_page() : profile_page();
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
