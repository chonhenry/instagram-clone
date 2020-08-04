import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";

import "./Main.scss";

const Main = ({ loading, user }) => {
  return <div>{user && <Navbar />}</div>;
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {})(Main);
