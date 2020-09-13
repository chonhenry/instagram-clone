import axios from "axios";
import React, { useState, useEffect } from "react";
import ProfilePost from "../ProfilePost/ProfilePost";
import Backdrop from "../../../Backdrop/Backdrop";
import { fetchPosts } from "../../../../actions/posts";
import { connect } from "react-redux";
import "./ProfilePostContainer.scss";

const ProfilePostContainer = ({ posts, fetchPosts }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  useEffect(() => {
    let tmp = [];

    try {
      posts.forEach(async (id) => {
        axios.get(`/api/posts/${id.post}`).then((res) => {
          tmp.unshift(res.data);

          if (posts.length === tmp.length) {
            tmp.sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            });
            setUserPosts(tmp);
            setLoading(true);
          }
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div className="profile-post-container">
      <div className="profile-post-container-row">
        {loading &&
          userPosts.map((post) => (
            <ProfilePost
              onClick={() => setBackdrop(true)}
              key={post._id}
              post={post}
            />
          ))}
        {backdrop && <Backdrop onClick={() => setBackdrop(false)} />}
      </div>
    </div>
  );
};

export default connect(null, { fetchPosts })(ProfilePostContainer);
