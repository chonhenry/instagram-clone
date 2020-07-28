import React from "react";
import { Link, Redirect } from "react-router-dom";
import ig from "../../../assets/image/instagram.png";
import "./LoginForm.scss";

const LoginForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="login-form">
      <img src={ig} />

      <form onSubmit={(e) => onSubmit(e)}>
        <input className="email-input" type="email" placeholder="Email" />
        <input
          className="password-input"
          type="password"
          placeholder="Password"
        />
        <input className="btn-submit" type="submit" value="Log In" />
      </form>

      <div className="divider-line"></div>

      <div className="to-signup">
        Don't have an account?
        <Link to="/register"> Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
