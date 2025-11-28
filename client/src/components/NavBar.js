// client/src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const NavBar = () => {
  return (
    <ul className="nav">
      <li>
        <Link to="/" className="nav-link px-2 link-dark underline-on-hover">
          Home
        </Link>
      </li>
      {Auth.loggedIn() ? (
        <>
          <li>
            <Link
              to={`/users/${Auth.getUser()?.data?.username}`}
              className="nav-link px-2 link-dark underline-on-hover"
            >
              Trip Dashboard
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to={"/signup"}
              className="nav-link px-2 link-dark underline-on-hover"
            >
              Signup
            </Link>
          </li>
          <li>
            <Link
              to={"/login"}
              className="nav-link px-2 link-dark underline-on-hover"
            >
              Login
            </Link>
          </li>
        </>
      )}
      <li>
        <Link
          to={"/contact"}
          className="nav-link px-2 link-dark underline-on-hover"
        >
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;