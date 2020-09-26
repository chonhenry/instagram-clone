import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Author.scss";

const Author = ({ image, username, authorId, followingList, self, postId }) => {
  const history = useHistory();
  const [deleting, setDeleting] = useState(false);

  const onClick = async () => {
    if (!deleting) {
      setDeleting(true);
      await axios.delete(`/api/posts/${postId}`);
      window.location.reload(false);
      // history.push(`/`);
    }
  };

  return (
    <div className="author-container">
      <div className="author-info">
        <img className="author-img margin-right" src={image} />
        <div className="author-username margin-right">{username}</div>
        {/* {!self && <div className="margin-right">•</div>}
        {!self && <div>Following</div>} */}
      </div>

      {self && (
        <div className="delete">
          {deleting ? (
            <i className="fas fa-spinner"></i>
          ) : (
            <i onClick={onClick} className="far fa-trash-alt"></i>
          )}
        </div>
      )}
    </div>
  );
};

export default Author;
