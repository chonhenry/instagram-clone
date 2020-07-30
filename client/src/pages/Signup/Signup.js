import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ig from "../../assets/image/instagram.png";
import { register } from "../../actions/auth";

import "./Signup.scss";

const Signup = ({ register, authError, isAuthenticated, loading }) => {
  const [formData, setFromData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState(false);

  const { email, name, username, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      register({ name, username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="signup-page">
        <div className="signup-form">
          <img src={ig} />

          <form onSubmit={(e) => onSubmit(e)}>
            <input
              className="email-input"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <input
              className="name-input"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
            <input
              className="username-input"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
              required
            />
            <input
              className="password-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
            <input
              className="confirm-password-input"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => onChange(e)}
              required
            />
            <input className="btn-submit" type="submit" value="Sign up" />
          </form>

          {errorMessage ? (
            <div className="error-message">Passwords don't match</div>
          ) : null}

          {authError ? <div className="error-message">{authError}</div> : null}

          <div className="divider-line"></div>

          <div className="to-login">
            Have an account?
            <Link to="/"> Log In</Link>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  authError: state.auth.authError,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { register })(Signup);
