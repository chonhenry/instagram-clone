import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { findUser } from "../../actions/user";

import "./UserListItem.scss";

const UserListItem = ({ user, isFollowing, findUser }) => {
  const { username, name, profileImg } = user;
  useEffect(() => {
    //console.log(user);
  }, []);

  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

  const followUser = async () => {
    try {
      setIsFollowingState(true);
      await axios.put(`/api/users/follow/${user.user_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const unFollowUser = async () => {
    try {
      setIsFollowingState(false);
      await axios.put(`/api/users/unfollow/${user.user_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-list-item">
      <div className="user-info">
        <img className="user-img" src={user.profileImg} />
        <div className="user-name">
          <Link
            className="username"
            to={`/${user.username}`}
            onClick={() => findUser(user.username)}
          >
            <strong>{username}</strong>
          </Link>
          <div className="full-name">{name}</div>
        </div>
      </div>

      <div
        className={`follow-btn ${isFollowingState ? "following" : "follow"}`}
        onClick={isFollowingState ? unFollowUser : followUser}
      >
        {isFollowingState ? "Following" : "Follow"}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    foundUser: state.user.user,
  };
};

export default connect(mapStateToProps, { findUser })(UserListItem);
