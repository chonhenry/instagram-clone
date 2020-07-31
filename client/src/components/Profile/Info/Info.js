import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./Info.scss";

const Info = ({ user }) => {
  return (
    <section className="info-section">
      <div className="top-container">
        <div className="profile-img">
          <img src="https://galileoenrichment.com/wp-content/uploads/2020/03/man.png" />
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

export default connect(null)(Info);
