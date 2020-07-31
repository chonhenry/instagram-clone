import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Info from "../../components/Profile/Info/Info";
import Loading from "../../components/Loading/Loading";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";

import "./Profile.scss";

const Profile = ({ user, loading }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <Navbar />
      {loading && !user ? <Loading /> : <Info user={user} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { loadUser })(Profile);
