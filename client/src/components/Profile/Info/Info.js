import React, { useState, useEffect } from "react";
import axios from "axios";
import Backdrop from "../../Backdrop/Backdrop";
import FollowList from "../../FollowList/FollowList";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadUser } from "../../../actions/auth";
import {
  toggleOnFollowList,
  toggleOffFollowList,
} from "../../../actions/utils";

import avatar from "../../../assets/image/avatar3.jpg";
import "./Info.scss";

const Info = ({
  foundUser,
  loggedInUser,
  loadUser,
  isAuthenticated,
  loading,
  toggleOnFollowList,
  toggleOffFollowList,
  followList,
}) => {
  const [imgUploading, setImgUploading] = useState(false);
  const [authorization, setAuthorization] = useState(false);
  const [isFollowing, setIsFollowing] = useState(null);
  const [followersFollowing, setFollowersFollowing] = useState(null);
  const [followersCount, setFollowersCount] = useState(
    foundUser.followers.length
  );
  const [followingCount, setFollowingCount] = useState(
    foundUser.following.length
  );

  useEffect(() => {
    if (loggedInUser !== null) {
      if (loggedInUser.username === foundUser.username) {
        setAuthorization(true);
      } else {
        setAuthorization(false);
      }

      findFollowing(loggedInUser.username);
    }
  }, [foundUser, loggedInUser]);

  const onChange = async (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = async function (e) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setImgUploading(true);

      const body = JSON.stringify({
        name: foundUser.name,
        username: foundUser.username,
        email: foundUser.email,
        profileImg: e.target.result,
      });

      try {
        await axios.put("/api/profile", body, config);
        await loadUser();
        setImgUploading(false);
      } catch (err) {
        console.log(err.response.data.errors[0]);
      }
    };
  };

  const findFollowing = async (username) => {
    try {
      if (
        loggedInUser.following.find(
          (following_user) => following_user.username === foundUser.username
        )
      )
        setIsFollowing(true);
      else setIsFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const followUser = async () => {
    try {
      await axios.put(`/api/users/follow/${foundUser._id}`);
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unFollowUser = async () => {
    try {
      await axios.put(`/api/users/unfollow/${foundUser._id}`);
      setIsFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFollowList = () => {
    if (isAuthenticated) {
      if (followList === false) {
        toggleOnFollowList();
      } else {
        toggleOffFollowList();
      }
    }
  };

  return (
    <section className="info-section">
      {followList && (
        <div className="backdrop-follow-list">
          <Backdrop onClick={toggleFollowList} />
          <FollowList
            type={followersFollowing}
            list={
              followersFollowing === "Followers"
                ? foundUser.followers
                : foundUser.following
            }
            followingList={
              followersFollowing === "Followers" && foundUser.following
            }
          />
        </div>
      )}
      <div className="top-container">
        <div className="profile-img">
          {authorization ? (
            <img
              src={loggedInUser.profileImg ? loggedInUser.profileImg : avatar}
              className={imgUploading ? "img-uploading" : ""}
            />
          ) : (
            <img
              src={foundUser.profileImg ? foundUser.profileImg : avatar}
              className={imgUploading ? "img-uploading" : ""}
            />
          )}

          {authorization && (
            <form className="profile-image-upload">
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={(e) => onChange(e)}
              />
            </form>
          )}
        </div>

        <div className="info-container">
          <div className="username-edit-profile">
            <span className="username">{foundUser.username}</span>
            {isAuthenticated &&
              (authorization ? (
                <Link className="info-btn" to="/account/edit">
                  Edit Profile
                </Link>
              ) : isFollowing ? (
                <div className="info-btn following-btn" onClick={unFollowUser}>
                  Following
                </div>
              ) : (
                <div className="info-btn follow-btn" onClick={followUser}>
                  Follow
                </div>
              ))}
          </div>

          <div className="posts-followers-following-count">
            <span className="posts-count">{`${foundUser.posts.length} posts`}</span>
            <span
              className={`followers-count ${
                isAuthenticated && "cursor-pointer"
              }`}
              onClick={() => {
                setFollowersFollowing("Followers");
                toggleFollowList();
              }}
            >{`${foundUser.followers.length} followers`}</span>
            <span
              className={`following-count ${
                isAuthenticated && "cursor-pointer"
              }`}
              onClick={() => {
                setFollowersFollowing("Following");
                toggleFollowList();
              }}
            >{`${foundUser.following.length} following`}</span>
          </div>

          <div className="name-bio">
            <div className="name">
              <strong>{foundUser.name}</strong>
            </div>
            <div className="bio">{foundUser.bio}</div>
          </div>
        </div>
      </div>

      <div className="info-container-mobile">
        <div className="name-bio-mobile">
          <div className="name-mobile">
            <strong>{foundUser.username}</strong>
          </div>
          <div className="bio-mobile">{foundUser.bio}</div>
        </div>

        <div className="posts-followers-following-count-mobile">
          <span className="posts-count-mobile">
            {`${foundUser.posts.length} posts`}
          </span>
          <span
            className="followers-count-mobile"
            onClick={() => {
              setFollowersFollowing("Followers");
              toggleFollowList();
            }}
          >
            {`${foundUser.followers.length} followers`}
          </span>
          <span
            className="following-count-mobile"
            onClick={() => {
              setFollowersFollowing("Following");
              toggleFollowList();
            }}
          >
            {`${foundUser.following.length} following`}
          </span>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.user.loading,
    followList: state.followList,
  };
};

export default connect(mapStateToProps, {
  loadUser,
  toggleOnFollowList,
  toggleOffFollowList,
})(Info);
