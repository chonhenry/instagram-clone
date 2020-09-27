import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostStats.scss";

const PostStats = ({ postId, likes, authUsername, date }) => {
  const [postLiked, setPostLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    axios.get(`/api/posts/${postId}`).then((res) => {
      const tmp = res.data.likes.filter(
        (like) => like.username === authUsername
      );
      if (tmp.length > 0) setPostLiked(true);
      setLoading(false);
    });

    let tmp = new Date(date.slice(0, 10));
    setFormattedDate(tmp.toString().slice(4, 15));
  }, []);

  const onClick = async () => {
    try {
      if (postLiked) {
        setLoading(true);
        await axios.put(`/api/posts/unlike/${postId}`);
        setLoading(false);
        setPostLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        setLoading(true);
        await axios.put(`/api/posts/like/${postId}`);
        setLoading(false);
        setPostLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-stats">
      <div className="like-btn">
        {!loading ? (
          postLiked ? (
            <i
              className="fas fa-heart fa-2x heart red-heart"
              onClick={onClick}
            ></i>
          ) : (
            <i className="far fa-heart fa-2x heart" onClick={onClick}></i>
          )
        ) : (
          <i className="fas fa-spinner"></i>
        )}
      </div>
      <div className="likes-count">
        <strong>{`${likesCount} likes`}</strong>
      </div>
      <div className="date">{formattedDate}</div>
    </div>
  );
};

export default PostStats;
