import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { connect } from "react-redux";
import LatestPost from "../../components/LatestPost/LatestPost";
import "./Main.scss";

const Main = ({ loading, user }) => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  //const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (!loading) {
      let following = [...user.following];
      setFollowingUsers(following);
      getSelectedUsers([...following]);
    }
  }, [loading]);

  const getSelectedUsers = async (following) => {
    // randomly pick 5 users from following users
    let selectedUsers = [];
    if (following.length > 5) {
      for (let i = 0; i < 5; i++) {
        let idx = Math.floor(Math.random() * following.length);
        selectedUsers.push(following[idx]);
        following.splice(idx, 1);
      }
    } else {
      selectedUsers = [...following];
      following = [];
    }

    // get post from selected users
    selectedUsers.forEach(async (user) => {
      const resUser = await axios.get(`/api/users/${user.username}`);

      // find post that has not been shown yet
      let postId = resUser.data.posts.find((id) => {
        if (latestPosts.find((id2) => id2.postId === id.post) === undefined)
          return id.post;
      });

      if (postId) {
        // if postId has not been shown yet
        const resPost = await axios.get(`/api/posts/${postId.post}`);

        setLatestPosts((prev) => [
          ...prev,
          {
            username: resUser.data.username,
            profileImg: resUser.data.profileImg,
            postId: postId.post,
            caption: resPost.data.caption,
            comments: resPost.data.comments,
            date: resPost.data.date,
            image: resPost.data.image,
            likes: resPost.data.likes,
          },
        ]);
      }
    });
    setFollowingUsers(following);
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      if (followingUsers.length === 0) {
        setFollowingUsers([...user.following]);
        getSelectedUsers([...user.following]);
      } else {
        getSelectedUsers(followingUsers);
      }
    }
  };

  return (
    <div
      className="main"
      onScroll={(e) => handleScroll(e)}
      // onClick={() => {
      //   console.log(latestPosts);
      // }}
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
            comments={post.comments}
            date={post.date}
            images={post.image}
            likes={post.likes}
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
