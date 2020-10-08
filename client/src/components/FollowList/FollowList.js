import React from "react";
import UserListItem from "../UserListItem/UserListItem";
import "./FollowList.scss";

const FollowList = ({ type, list, followingList }) => {
  const checkIsFollowing = (username) => {
    const foundUser = followingList.find((user) => user.username === username);

    if (foundUser) return true;
    else return false;
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      console.log("bottom");
    }
  };

  return (
    <div className="follow-list">
      <div className="list-type">
        <strong>{type}</strong>
      </div>
      <div className="user-list" onScroll={(e) => handleScroll(e)}>
        {list.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            isFollowing={
              type === "Followers" ? checkIsFollowing(user.username) : true
            }
          />
        ))}
      </div>
    </div>
  );
};

export default FollowList;
