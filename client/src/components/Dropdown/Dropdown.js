import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { findUser } from "../../actions/user";

import "./Dropdown.scss";

const Dropdown = ({ logout, user, findUser }) => {
  return (
    <div className="dropdown">
      <Link
        onClick={() => findUser(user.username)}
        className="dropdown-link"
        to={`/${user.username}`}
      >
        Profile
      </Link>
      {/* <Link
        onClick={() => findUser("vivian_ho")}
        className="dropdown-link"
        to={`/vivian_ho`}
      >
        vv
      </Link>
      <Link
        onClick={() => findUser("may_li")}
        className="dropdown-link"
        to={`/may_li`}
      >
        m
      </Link> */}

      <Link onClick={logout} className="dropdown-link" to="/login">
        Logout
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { logout, findUser })(Dropdown);
