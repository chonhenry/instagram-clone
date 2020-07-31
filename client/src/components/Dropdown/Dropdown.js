import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import "./Dropdown.scss";

const Dropdown = ({ logout }) => {
  return (
    <div className="dropdown">
      <Link className="dropdown-link" to="/user">
        Profile
      </Link>

      <Link onClick={logout} className="dropdown-link" to="/login">
        Logout
      </Link>
    </div>
  );
};

export default connect(null, { logout })(Dropdown);
