import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { findUser } from "../../../../../actions/user";
import { toggleOffBackdrop } from "../../../../../actions/utils";
import "./Comment.scss";

const Comment = ({
  comment,
  findUser,
  toggleOffBackdrop,
  isCaption,
  postId,
  authUsername,
}) => {
  const { username, date, likes, profileImg, text } = comment;
  const [commentLiked, setCommentLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(likes.length);

  useEffect(() => {
    if (likes.find((like) => like.username === authUsername)) {
      setCommentLiked(true);
    }
    setLikeLoading(false);
  }, []);

  const toUser = async () => {
    await findUser(username);
    toggleOffBackdrop();
  };

  const find_time_diff = () => {
    let time_diff;

    let post_date = new Date(date);
    let now = new Date();
    let second_diff = Math.round((now.getTime() - post_date.getTime()) / 1000);

    if (second_diff < 60) time_diff = `${second_diff}s`;
    else if (second_diff < 3600) time_diff = `${Math.floor(second_diff / 60)}m`;
    else if (second_diff < 86400)
      time_diff = `${Math.floor(second_diff / 60 / 60)}h`;
    else if (second_diff < 604800)
      time_diff = `${Math.floor(second_diff / 60 / 60 / 24)}d`;
    else time_diff = `${Math.floor(second_diff / 60 / 60 / 24 / 7)}w`;

    return time_diff;
  };

  const likeComment = async () => {
    try {
      if (commentLiked) {
        console.log("commentLiked");
        let likeId = likes.find((like) => like.username === authUsername)._id;
        await axios.put(
          `/api/posts/comment/unlike/${postId}&${comment._id}&${likeId}`
        );
        setCommentLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await axios.put(`/api/posts/comment/like/${postId}&${comment._id}`);
        setCommentLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment">
      <div className="profile-img-container">
        <img onClick={toUser} className="profile-img" src={profileImg} alt="" />
      </div>

      <div className="comment-contents">
        <div className="username-text">
          <span onClick={toUser}>
            <Link to={`/${username}`} className="username-link">
              <strong>{username}</strong>
            </Link>
          </span>{" "}
          {text}
        </div>

        <div className="comment-stats">
          {`${find_time_diff()}`}
          {!isCaption && (
            <strong className="like-count">{`${likesCount} like`}</strong>
          )}
        </div>
      </div>
      <div className="like-comment">
        {!isCaption && !likeLoading && (
          <i
            onClick={() => likeComment()}
            className={`far fa-heart ${commentLiked ? "comment-liked" : ""}`}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authUsername: state.auth.user.username,
  };
};

export default connect(mapStateToProps, { findUser, toggleOffBackdrop })(
  Comment
);

// date: "2020-09-22T11:39:13.152Z"
// likes: []
// profileImg: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD"
// text: "second comment from Christine"
// user_id: "5f4475550900dc0d32fe1cb7"
// username: "christine"
// _id: "5f69e261a44ce40f46b9b6ea"
