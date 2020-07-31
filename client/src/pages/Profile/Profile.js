import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";

import "./Profile.scss";

const Profile = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default connect(null)(Profile);
