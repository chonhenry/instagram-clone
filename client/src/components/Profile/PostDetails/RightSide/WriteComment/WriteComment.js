import React, { useState, useRef } from "react";
import axios from "axios";
import "./WriteComment.scss";

const WriteComment = ({ postId, image, latest }) => {
  const [comment, setComment] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("one-row");
  const textareaRef = useRef();

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
        profileImg: image,
      });

      try {
        axios.put(`/api/posts/comment/${postId}`, body, config);
      } catch (error) {
        console.log(error);
      }

      setComment("");
    }
  };

  const onChange = (e) => {
    setComment(e.target.value);
    let height = textareaRef.current.scrollHeight;

    if (height <= 18 || comment === "") setTextareaHeight("one-row");
    else if (height <= 38) setTextareaHeight("two-rows");
    else setTextareaHeight("three-rows");
  };

  return (
    <div className="write-comment-container">
      <form className={`comment-form`} onSubmit={(e) => onSubmit(e)}>
        <textarea
          onChange={(e) => onChange(e)}
          value={comment}
          className={`comment-input ${textareaHeight} ${latest && "latest"}`}
          placeholder="Add a comment..."
          ref={textareaRef}
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
