import axios from "axios";
import React, { useState, useEffect } from "react";
import ProfilePost from "../ProfilePost/ProfilePost";
import { fetchPosts } from "../../../../actions/posts";
import { connect } from "react-redux";
import "./ProfilePostContainer.scss";

const ProfilePostContainer = ({ posts, fetchPosts }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const renderPosts = (post) => {
    return <ProfilePost createdBy={post.createdByUsername} />;
  };

  return (
    <div className="profile-post-container">
      {loading ? (
        userPosts.map((post) => (
          <div onClick={() => console.log(userPosts)} key={post.caption}>
            {post.caption}
          </div>
        ))
      ) : (
        <div onClick={() => console.log(userPosts)}>loading</div>
      )}
    </div>
  );
};

export default connect(null, { fetchPosts })(ProfilePostContainer);
