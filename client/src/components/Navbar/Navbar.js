import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import ig from "../../assets/image/instagram.png";
import Dropdown from "../Dropdown/Dropdown";
import { toggleOnDropdown, toggleOffDropdown } from "../../actions/utils";

import "./Navbar.scss";

const Navbar = ({ toggleOnDropdown, toggleOffDropdown, dropdown }) => {
  const onSearchSubmit = (e) => {
    e.preventDefault();
    console.log("search");
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

  return (
    <div onClick={toggle_off_dropdown} className="navbar">
      <div className="navbar-conainer">
        <div className="home-img-container">
          <img className="home-img" src={ig} />
        </div>

        <form onSubmit={(e) => onSearchSubmit(e)} className="search-box">
          <input type="text" placeholder="Search" />
        </form>

        <div className="profile-img-container">
          <img onClick={toggle_on_dropdown} className="profile" />
          {dropdown && <Dropdown />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dropdown: state.dropdown,
  };
};

export default connect(mapStateToProps, {
  toggleOnDropdown,
  toggleOffDropdown,
})(Navbar);
