import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Info from "../../components/Profile/Info/Info";
import ProfilePostContainer from "../../components/Profile/ProfilePost/ProfilePostContainer/ProfilePostContainer";
import Loading from "../../components/Loading/Loading";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { findUser } from "../../actions/user";

import "./Profile.scss";

const Profile = ({ loading, isAuthenticated, match, findUser, foundUser }) => {
  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        await loadUser();
        await findUser(match.params.username);
      } else {
        await findUser(match.params.username);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {!loading && <Navbar />}

      {!foundUser ? (
        <Loading />
      ) : (
        <div className="profile-page">
          <Info foundUser={foundUser} />
          {foundUser.posts.length > 0 ? (
            <ProfilePostContainer
              foundUser={foundUser}
              posts={foundUser.posts}
            />
          ) : (
            <div className="no-post">
              <i class="fas fa-camera-retro "></i>
              <span className="text">No Posts Yet</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    foundUser: state.user.user,
  };
};

export default connect(mapStateToProps, { loadUser, findUser })(Profile);

// const findUser = async () => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const res = await axios.get(
//     `/api/users/${match.params.username}`,
//     null,
//     config
//   );

//   setChosenUser(res.data);
//   setChosenUserLoading(false);
// };
