import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ig from "../../assets/image/instagram.png";
import { login } from "../../actions/auth";
import Loading from "../../components/Loading/Loading";
import Navbar from "../../components/Navbar/Navbar";

import "./Login.scss";

const Login = ({ login, authError, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="login-page">
        <div className="login-form">
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
              className="password-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
            <input className="btn-submit" type="submit" value="Log In" />
          </form>

          {authError ? <div className="error-message">{authError}</div> : null}

          <div className="divider-line"></div>

          <div className="to-signup">
            Don't have an account?
            <Link to="/signup"> Sign up</Link>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  authError: state.auth.authErrorm,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
