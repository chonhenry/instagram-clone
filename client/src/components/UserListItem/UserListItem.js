import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { findUser } from "../../actions/user";

import "./UserListItem.scss";

const UserListItem = ({ user, isFollowing }) => {
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="user-list-item">
      <div className="user-info">
        <div className="user-img"></div>
        <div className="user-name">
          <div className="username"></div>
          <div className="full-name"></div>
        </div>
      </div>

      <div className="follow-btn">follow</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    foundUser: state.user.user,
  };
};

export default connect(mapStateToProps, { findUser })(UserListItem);
