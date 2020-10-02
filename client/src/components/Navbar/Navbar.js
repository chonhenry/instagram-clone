import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ig from "../../assets/image/instagram.png";
import Dropdown from "../Dropdown/Dropdown";
import SearchContainer from "./SearchContainer/SearchContainer";
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
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/users/search/${searchInput}`);
      setSearchResults(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = async (e) => {
    setSearchInput(e.target.value);
    try {
      const res = await axios.get(`/api/users/search/${e.target.value}`);
      if (res.data) setSearchResults(res.data);
      else setSearchResults([]);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
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
    setSearchResults([]);
  };

  const navLogo = (
    <div className="home-img-container">
      <Link to="/">
        <img className="home-img" src={ig} />
      </Link>
    </div>
  );

  const searchbox = (
    <div className="search-box">
      <form onSubmit={(e) => onSearchSubmit(e)} className="search-box-form">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => onInputChange(e)}
        />
      </form>
      {searchResults.length > 0 && <SearchContainer results={searchResults} />}
    </div>
  );

  const loggedInNavbar = (
    <div className="navbar-conainer">
      {navLogo}
      {searchbox}

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
      {navLogo}
      {searchbox}

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
