// client/src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Auth from "../utils/auth";
import logo from "../assets/t-p-logo-sm.png";

const styles = {
  header: {
    background: "white",
    width: "100%", // Ensure full width
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
};

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header
      className="d-flex align-items-center py-4 border-bottom"
      style={styles.header}
    >
      <div className="d-flex align-items-center w-100 px-3">
        <div className="d-flex align-items-center" style={{ flex: "0 0 25%" }}>
          <Link
            className="d-flex align-items-center text-dark text-decoration-none"
            to={`/`}
          >
            <img
              className="ms-3 me-2"
              src={logo}
              alt="Logo showing the world and the letters t and p"
              width="40"
              height="40"
            />
            <h1 className="bi fs-4 m-0">Travel Planner</h1>
          </Link>
        </div>
        <div className="flex-grow-1 d-flex justify-content-center">
          <NavBar />
        </div>
        <div
          className="d-flex justify-content-end"
          style={{ flex: "0 0 25%", ...styles.buttonContainer }}
        >
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-outline-primary" to="/explore">
                Explore Places
              </Link>
              <Link
                className="btn btn-outline-secondary"
                to={`/users/${Auth.getUser().data.username}`}
              >
                {Auth.getUser().data.username.toUpperCase()}'s Trips
              </Link>
              <button className="btn btn-outline-dark" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-secondary me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-dark me-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;