import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { findUser } from "../../../actions/user";
import "./Search.scss";

const Search = ({ username, name, profileImg, findUser }) => {
  const onClick = async () => {
    await findUser(username);
  };

  return (
    <div className="search">
      <Link to={`/${username}`} className="link" onClick={onClick}>
        <div className="result-img-container">
          <img className="result-img" src={profileImg} alt="" />
        </div>

        <div className="name-text">
          <div className="result-username">{username}</div>
          <div className="result-name">{name}</div>
        </div>
      </Link>
    </div>
  );
};

export default connect(null, { findUser })(Search);
