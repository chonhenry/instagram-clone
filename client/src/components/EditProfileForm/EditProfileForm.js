import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";

import "./EditProfileForm.scss";

const EditProfileForm = ({ user, isAuthenticated, loading, loadUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    email: "",
  });

  useEffect(() => {
    loadUser();

    setFormData({
      name: loading || !user ? "" : user.name,
      username: loading || !user ? "" : user.username,
      bio: loading || !user ? "" : user.bio,
      email: loading || !user ? "" : user.email,
    });
  }, [loading]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(54644);
  };

  return (
    <div className="edit-profile-form">
      {isAuthenticated && (
        <form className="form-container" onSubmit={(e) => onSubmit(e)}>
          <section className="form-section">
            <div className="label-container">
              <label className="label">
                <strong>Name</strong>
              </label>
            </div>

            <input
              className="form-input"
              type="text"
              value={formData.name}
              name="name"
              onChange={(e) => onChange(e)}
              placeholder="Name"
            />
          </section>

          <section className="form-section">
            <div className="label-container">
              <label className="label">
                <strong>Username</strong>
              </label>
            </div>

            <input
              className="form-input"
              type="text"
              value={formData.username}
              name="username"
              onChange={(e) => onChange(e)}
              placeholder="Username"
            />
          </section>

          <section className="form-section">
            <div className="label-container">
              <label className="label">
                <strong>Email</strong>
              </label>
            </div>

            <input
              className="form-input"
              type="email"
              value={formData.email}
              name="email"
              onChange={(e) => onChange(e)}
              placeholder="Email"
            />
          </section>

          <section className="form-section">
            <div className="textarea-label-container">
              <label className="label">
                <strong>Bio</strong>
              </label>
            </div>

            <textarea
              className="form-input form-textarea"
              value={formData.bio}
              rows="10"
              name="bio"
              onChange={(e) => onChange(e)}
            ></textarea>
          </section>

          <input type="submit" className="submit-button" value="Submit" />
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { loadUser })(EditProfileForm);
