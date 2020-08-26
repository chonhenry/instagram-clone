import React from "react";
import "./UserListItem.scss";

const UserListItem = ({ user }) => {
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

export default UserListItem;
