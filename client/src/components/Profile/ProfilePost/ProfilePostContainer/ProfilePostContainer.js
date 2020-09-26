import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import ProfilePost from "../ProfilePost/ProfilePost";
import PostDetails from "../../PostDetails/PostDetails";
import Backdrop from "../../../Backdrop/Backdrop";
import { fetchPosts } from "../../../../actions/posts";
import { toggleOnBackdrop, toggleOffBackdrop } from "../../../../actions/utils";
import { connect } from "react-redux";
import "./ProfilePostContainer.scss";

const ProfilePostContainer = ({
  foundUser,
  posts,
  fetchPosts,
  backdrop,
  toggleOnBackdrop,
  toggleOffBackdrop,
}) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    let tmp = [];

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
  }, [backdrop, foundUser]);

  return (
    <div className="profile-post-container">
      <div className="profile-post-container-row">
        {loading &&
          userPosts.map((post) => (
            <ProfilePost
              onClick={() => {
                setCurrentPost(post);
                // setBackdrop(true);
                toggleOnBackdrop();
              }}
              key={post._id}
              post={post}
            />
          ))}
        {backdrop && (
          <div className="backdrop-post-details">
            <Backdrop
              onClick={() => {
                // setBackdrop(false);
                toggleOffBackdrop();
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

const mapStateToProps = (state) => {
  return {
    backdrop: state.backdrop,
  };
};

export default connect(mapStateToProps, {
  fetchPosts,
  toggleOnBackdrop,
  toggleOffBackdrop,
})(ProfilePostContainer);
