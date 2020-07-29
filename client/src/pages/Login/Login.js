import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ig from "../../assets/image/instagram.png";

import "./Login.scss";

const Login = () => {
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
  };

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

        <div className="divider-line"></div>

        <div className="to-signup">
          Don't have an account?
          <Link to="/signup"> Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
