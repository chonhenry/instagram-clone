import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Info from "../../components/Profile/Info/Info";
import Loading from "../../components/Loading/Loading";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { findUser } from "../../actions/user";

import "./Profile.scss";

const Profile = ({
  user,
  loading,
  isAuthenticated,
  match,
  findUser,
  foundUser,
}) => {
  useEffect(() => {
    console.log("reander profile");
    async function fetchData() {
      if (isAuthenticated) {
        await loadUser();
        await findUser(match.params.username);
      } else {
        await findUser(match.params.username);
      }
    }
    fetchData();
  }, [loading]);

  return (
    <div>
      {!loading && <Navbar />}

      {!foundUser ? <Loading /> : <Info foundUser={foundUser} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.user.loading,
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
