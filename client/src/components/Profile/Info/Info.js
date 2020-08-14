import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loadUser } from "../../../actions/auth";
import avatar from "../../../assets/image/avatar3.jpg";
import "./Info.scss";

const Info = ({
  foundUser,
  loggedInUser,
  loadUser,
  isAuthenticated,
  loading,
}) => {
  const [imgUploading, setImgUploading] = useState(false);
  const [authorization, setAuthorization] = useState(false);
  const [user, setUser] = useState(foundUser);

  useEffect(() => {
    // console.log(foundUser.profileImg);
    if (loggedInUser !== null) {
      if (loggedInUser.username === foundUser.username) {
        setAuthorization(true);
      } else {
        setAuthorization(false);
      }
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
        console.log(err.response.data);
      }
    };
  };

  return (
    <section className="info-section">
      <div className="top-container">
        <div className="profile-img">
          <img
            src={loggedInUser.profileImg ? loggedInUser.profileImg : avatar}
            className={imgUploading ? "img-uploading" : ""}
          />
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
            {authorization && (
              <Link className="edit-profile" to="/account/edit">
                Edit Profile
              </Link>
            )}
          </div>

          <div className="posts-followers-following-count">
            <span className="posts-count">{`${foundUser.posts.length} posts`}</span>
            <span className="followers-count">{`${foundUser.followers.length} followers`}</span>
            <span className="following-count">{`${foundUser.following.length} following`}</span>

            {/* <span className="posts-count">
              <strong>1</strong>
              {` posts`}
            </span>
            <span className="followers-count">
              <strong>1</strong>
              {` followers`}
            </span>
            <span className="following-count">
              <strong>135</strong>
              {` following`}
            </span> */}
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
            <strong>{"user.name"}</strong>
          </div>
          <div className="bio-mobile">{"user.bio"}</div>
        </div>

        <div className="posts-followers-following-count-mobile">
          <span className="posts-count-mobile">
            <strong>1</strong>
            {` posts`}
          </span>
          <span className="followers-count-mobile">
            <strong>1</strong>
            {` followers`}
          </span>
          <span className="following-count-mobile">
            <strong>135</strong>
            {` following`}
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
  };
};

export default connect(mapStateToProps, { loadUser })(Info);
