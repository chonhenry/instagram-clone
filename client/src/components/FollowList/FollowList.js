import React, { useEffect } from "react";
import UserListItem from "../UserListItem/UserListItem";
import "./FollowList.scss";

const FollowList = ({ type, list }) => {
  useEffect(() => {
    console.log(list);
  }, []);
  return (
    <div className="follow-list">
      <div className="list-type">
        <strong>{type}</strong>
      </div>
      <div className="user-list">
        {list.map((user) => (
          <UserListItem key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default FollowList;
