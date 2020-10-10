import React, { useState, Fragment } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Author.scss";

const Author = ({ image, username, self, postId, latest }) => {
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
    <div className={`author-container ${latest && "latest"}`}>
      <div className="author-info">
        {latest ? (
          <Fragment>
            <Link to={`/${username}`}>
              <img className="author-img margin-right" src={image} />
            </Link>
            <Link
              className="author-username margin-right username-link"
              to={`/${username}`}
            >
              {username}
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <img className="author-img margin-right" src={image} />
            <div className="author-username margin-right">{username}</div>
          </Fragment>
        )}
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
