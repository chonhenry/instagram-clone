import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { connect } from "react-redux";
import LatestPost from "../../components/LatestPost/LatestPost";
import "./Main.scss";

const Main = ({ loading, user }) => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    console.log("useEffect");

    if (!loading) {
      let following = [...user.following];
      setFollowingUsers(following);
      getSelectedUsers([...following]);
    }
  }, [loading]);

  const getSelectedUsers = async (following) => {
    // randomly pick 5 users from following users
    let tmp = [];
    if (following.length > 5) {
      for (let i = 0; i < 5; i++) {
        let idx = Math.floor(Math.random() * following.length);
        tmp.push(following[idx]);
        following.splice(idx, 1);
      }
    } else {
      tmp = [...following];
      following = [];
    }

    // get post from selected users
    let posts = [];
    tmp.forEach(async (user) => {
      const resUser = await axios.get(`/api/users/${user.username}`);
      console.log(resUser.data);

      // find post that has not been shown yet
      let postId = resUser.data.posts.find((id) => {
        if (id.post !== latestPosts.find((id2) => id2.postId === id.post))
          return id.post;
      });

      const resPost = await axios.get(`/api/posts/${postId.post}`);
      setLatestPosts((prev) => [
        ...prev,
        {
          username: resUser.data.username,
          profileImg: resUser.data.profileImg,
          postId: postId.post,
          caption: resPost.data.caption,
        },
      ]);
    });
    setFollowingUsers(following);
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      if (followingUsers.length > 0) {
        getSelectedUsers(followingUsers);
      } else if (followingUsers.length === 0) {
        setFollowingUsers([...user.following]);
      }
    }
  };

  return (
    <div
      className="main"
      onScroll={(e) => handleScroll(e)}
      onClick={() => {
        console.log(latestPosts);
      }}
    >
      {user && <Navbar />}
      <div className="latest-posts-container">
        {latestPosts.map((post) => (
          <LatestPost
            key={post.postId}
            username={post.username}
            profileImg={post.profileImg}
            caption={post.caption}
            postId={post.postId}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {})(Main);

// for (let i = following.length - 1; i > 0; i--) {
//   const j = Math.floor(Math.random() * i);
//   const temp = following[i];
//   following[i] = following[j];
//   following[j] = temp;
// }
