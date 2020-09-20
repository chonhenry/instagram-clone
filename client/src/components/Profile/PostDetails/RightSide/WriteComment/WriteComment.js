import React, { useState } from "react";
import axios from "axios";
import "./WriteComment.scss";

const WriteComment = ({ postId }) => {
  const [comment, setComment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (comment.length) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        text: comment,
      });

      axios.put(`/api/posts/comment/${postId}`, body, config);

      setComment("");
    }
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="write-comment-container">
      <form className="comment-form" onSubmit={(e) => onSubmit(e)}>
        <textarea
          onChange={(e) => onChange(e)}
          value={comment}
          className="comment-input"
          placeholder="Add a comment..."
        />
        <input
          type="submit"
          className={`submit-comment ${
            comment.length ? "enabled" : "disabled"
          }`}
          value="Post"
        />
      </form>
    </div>
  );
};

export default WriteComment;
