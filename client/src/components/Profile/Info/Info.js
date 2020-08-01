import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loadUser } from "../../../actions/auth";
import avatar from "../../../assets/image/avatar.png";
import "./Info.scss";

const Info = ({ user, loadUser }) => {
  const onChange = async (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async function (e) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        name: user.name,
        username: user.username,
        email: user.email,
        profileImg: e.target.result,
      });

      try {
        const res = await axios.put("/api/profile", body, config);
        loadUser();
      } catch (err) {
        console.log(err.response.data);
      }
    };
  };

  return (
    <section className="info-section">
      <div className="top-container">
        <div className="profile-img">
          <img src={user.profileImg ? user.profileImg : avatar} />
          <form className="profile-image-upload">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={(e) => onChange(e)}
            />
          </form>
        </div>

        <div className="info-container">
          <div className="username-edit-profile">
            <span className="username">{"user.username"}</span>
            <Link className="edit-profile" to="/">
              Edit Profile
            </Link>
          </div>

          <div className="posts-followers-following-count">
            {/* <span className="posts-count">{`${user.posts.length} posts`}</span>
            <span className="followers-count">{`${user.followers.length} followers`}</span>
            <span className="following-count">{`${user.following.length} following`}</span> */}

            <span className="posts-count">
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
            </span>
          </div>

          <div className="name-bio">
            <div className="name">
              <strong>{"user.name"}</strong>
            </div>
            <div className="bio">{"user.bio"}</div>
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

// const mapStateToProps = (state) => {
//   return {
//     user: state.auth.user,
//   };
// };

export default connect(null, { loadUser })(Info);
