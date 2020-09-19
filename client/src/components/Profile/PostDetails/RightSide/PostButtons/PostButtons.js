import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostButtons.scss";

const PostButtons = ({ postId, authUsername }) => {
  const [postLiked, setPostLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/posts/${postId}`).then((res) => {
      const tmp = res.data.likes.filter(
        (like) => like.username === authUsername
      );

      if (tmp.length > 0) setPostLiked(true);

      setLoading(false);
    });
  }, []);

  const onClick = async () => {
    try {
      if (postLiked) {
        await axios.put(`/api/posts/unlike/${postId}`);
        setPostLiked(false);
      } else {
        await axios.put(`/api/posts/like/${postId}`);
        setPostLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-buttons-container">
      {!loading &&
        (postLiked ? (
          <i
            className="fas fa-heart fa-2x heart red-heart"
            onClick={onClick}
          ></i>
        ) : (
          <i className="far fa-heart fa-2x heart" onClick={onClick}></i>
        ))}
    </div>
  );
};

export default PostButtons;
