import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import { connect } from "react-redux";

import "./EditProfile.scss";

const EditProfile = () => {
  return (
    <div className="edit-profile">
      <Navbar />
      <EditProfileForm />
    </div>
  );
};

export default connect(null, {})(EditProfile);
