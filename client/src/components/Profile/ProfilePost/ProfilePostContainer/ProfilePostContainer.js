import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import ProfilePost from "../ProfilePost/ProfilePost";
import PostDetails from "../../PostDetails/PostDetails";
import Backdrop from "../../../Backdrop/Backdrop";
import { fetchPosts } from "../../../../actions/posts";
import { connect } from "react-redux";
import "./ProfilePostContainer.scss";

const ProfilePostContainer = ({ posts, fetchPosts }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

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
  }, [backdrop]);

  return (
    <div className="profile-post-container">
      <div className="profile-post-container-row">
        {loading &&
          userPosts.map((post) => (
            <ProfilePost
              onClick={() => {
                setCurrentPost(post);
                setBackdrop(true);
              }}
              key={post._id}
              post={post}
            />
          ))}
        {backdrop && (
          <div className="backdrop-post-details">
            <Backdrop
              onClick={() => {
                setBackdrop(false);
                setCurrentPost(null);
              }}
            />
            <PostDetails post={currentPost} />
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(null, { fetchPosts })(ProfilePostContainer);
