import React from "react";
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
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="sdv" />
      </form>

      <div>line</div>

      <div>s</div>
    </div>
  );
};

export default LoginForm;
