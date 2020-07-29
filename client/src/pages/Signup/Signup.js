import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ig from "../../assets/image/instagram.png";

import "./Signup.scss";

const Signup = () => {
  const [formData, setFromData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { email, name, username, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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
          <input className="btn-submit" type="submit" value="Log In" />
        </form>

        <div className="divider-line"></div>

        <div className="to-login">
          Have an account?
          <Link to="/"> Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
