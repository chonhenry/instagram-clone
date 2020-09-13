import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { findUser } from "../../actions/user";
import {
  toggleOnCreatePost,
  toggleOffCreatePost,
  toggleOnFollowList,
} from "../../actions/utils";

import "./Dropdown.scss";

const Dropdown = ({
  logout,
  user,
  findUser,
  createPost,
  toggleOnCreatePost,
  toggleOffCreatePost,
  followList,
}) => {
  const onClick = () => {
    console.log(createPost);
    if (createPost === false) {
      toggleOnCreatePost();
    }
  };

  return (
    <div className="dropdown">
      <Link
        onClick={() => findUser(user.username)}
        className="dropdown-link"
        to={`/${user.username}`}
      >
        Profile
      </Link>

      <Link
        className="dropdown-link"
        onClick={onClick}
        to={`/${user.username}/create-post`}
      >
        Create Post
      </Link>

      <Link onClick={logout} className="dropdown-link" to="/login">
        Logout
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    createPost: state.createPost,
    followList: state.followList,
  };
};

export default connect(mapStateToProps, {
  logout,
  findUser,
  toggleOnCreatePost,
  toggleOffCreatePost,
  toggleOnFollowList,
})(Dropdown);
