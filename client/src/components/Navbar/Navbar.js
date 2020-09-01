import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ig from "../../assets/image/instagram.png";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import { toggleOnDropdown, toggleOffDropdown } from "../../actions/utils";

import "./Navbar.scss";

const Navbar = ({
  toggleOnDropdown,
  toggleOffDropdown,
  dropdown,
  isAuthenticated,
  loading,
  user,
}) => {
  const onSearchSubmit = (e) => {
    e.preventDefault();
    // console.log("search");
  };

  const toggle_on_dropdown = () => {
    if (!dropdown) {
      toggleOnDropdown();
    }
  };

  const toggle_off_dropdown = () => {
    if (dropdown) {
      toggleOffDropdown();
    }
  };

  const loggedInNavbar = (
    <div className="navbar-conainer">
      <div className="home-img-container">
        <Link to="/">
          <img className="home-img" src={ig} />
        </Link>
      </div>

      <form onSubmit={(e) => onSearchSubmit(e)} className="search-box">
        <input type="text" placeholder="Search" />
      </form>

      <div className="profile-img-container">
        {user && (
          <img
            onClick={toggle_on_dropdown}
            className="profile"
            src={user.profileImg}
          />
        )}

        {dropdown && <Dropdown />}
      </div>
    </div>
  );

  const loggedOutNavbar = (
    <div className="navbar-conainer">
      <div className="home-img-container">
        <Link to="/">
          <img className="home-img" src={ig} />
        </Link>
      </div>

      <form onSubmit={(e) => onSearchSubmit(e)} className="search-box">
        <input type="text" placeholder="Search" />
      </form>

      <div className="login-signup">
        <Link to="/login" className="login">
          Log In
        </Link>
        <Link to="/signup" className="signup">
          Sign Up
        </Link>
      </div>
    </div>
  );

  return (
    <div className="navbar" onClick={toggle_off_dropdown}>
      {isAuthenticated && !loading ? loggedInNavbar : loggedOutNavbar}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dropdown: state.dropdown,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  toggleOnDropdown,
  toggleOffDropdown,
})(Navbar);
