import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Info from "../../components/Profile/Info/Info";
import ProfilePostContainer from "../../components/Profile/ProfilePost/ProfilePostContainer/ProfilePostContainer";
import Loading from "../../components/Loading/Loading";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { findUser, clearUser } from "../../actions/user";

import "./Profile.scss";

const Profile = ({
  loading,
  isAuthenticated,
  match,
  findUser,
  foundUser,
  foundUserLoading,
  clearUser,
}) => {
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

    return () => {
      clearUser();
    };
  }, []);

  return (
    <div>
      {!loading && <Navbar />}

      {foundUserLoading ? (
        <Loading />
      ) : foundUser ? (
        <div className="profile-page">
          <Info foundUser={foundUser} />
          {foundUser.posts.length > 0 ? (
            <ProfilePostContainer
              foundUser={foundUser}
              posts={foundUser.posts}
            />
          ) : (
            <div className="no-post">
              <i className="fas fa-camera-retro "></i>
              <span className="text">No Posts Yet</span>
            </div>
          )}
        </div>
      ) : (
        <div className="not-found">
          <strong>No User Found</strong>
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
    foundUserLoading: state.user.loading,
  };
};

export default connect(mapStateToProps, { loadUser, findUser, clearUser })(
  Profile
);
