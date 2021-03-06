import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
    if (commentLiked) {
      let likeId = likes.find((like) => like.username === authUsername)._id;
      setLikeLoading(true);

      axios
        .put(`/api/posts/comment/unlike/${postId}&${comment._id}&${likeId}`)
        .then(() => {
          setCommentLiked(false);
          setLikeLoading(false);
          setLikesCount((prev) => prev - 1);
        })
        .catch((err) => console.log(err));
    } else {
      setLikeLoading(true);
      axios
        .put(`/api/posts/comment/like/${postId}&${comment._id}`)
        .then(() => {
          setCommentLiked(true);
          setLikeLoading(false);
          setLikesCount((prev) => prev + 1);
        })
        .catch((err) => console.log(err));
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
          {!isCaption && likesCount > 0 && (
            <strong className="like-count">{`${likesCount} ${
              likesCount > 1 ? "likes" : "like"
            }`}</strong>
          )}
        </div>
      </div>

      <div className="like-comment">
        {!isCaption &&
          (!likeLoading ? (
            <i
              onClick={() => likeComment()}
              className={`far fa-heart ${commentLiked ? "comment-liked" : ""}`}
            />
          ) : (
            <i className="fas fa-spinner" />
          ))}
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
