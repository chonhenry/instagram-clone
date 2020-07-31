import React, { Fragment, useState } from "react";
import ig from "../../assets/image/instagram.png";
import Dropdown from "../Dropdown/Dropdown";

import "./Navbar.scss";

const Navbar = () => {
  const onSearchSubmit = (e) => {
    e.preventDefault();
    console.log("search");
  };

  return (
    <div className="navbar">
      <div className="navbar-conainer">
        <div className="home-img-container">
          <img className="home-img" src={ig} />
        </div>

        <form onSubmit={(e) => onSearchSubmit(e)} className="search-box">
          <input type="text" placeholder="Search" />
        </form>

        <div className="profile-img-container">
          <img className="profile" />
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
