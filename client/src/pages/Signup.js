import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import validator from "validator";

import "../style/signup-login.css";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Load Spline Viewer script
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const resetValidation = (e) => {
    e.target.classList.remove("is-invalid");
    e.target.classList.remove("is-valid");
  };

  const validation = (e) => {
    if (e.target.type === "email") {
      if (validator.isEmail(e.target.value)) {
        e.target.classList.add("is-valid");
      } else {
        e.target.classList.add("is-invalid");
      }
    } else if (e.target.type === "password") {
      if (e.target.value.length >= 5) {
        e.target.classList.add("is-valid");
      } else {
        e.target.classList.add("is-invalid");
      }
    } else if (e.target.value === "") {
      e.target.classList.add("is-invalid");
    } else {
      e.target.classList.add("is-valid");
    }
  };

  return (
    <div className="mt-3 container">
      <div className="row align-items-center">
        {/* Left Side: Spline Viewer */}
        <div className="col-md-6 d-flex justify-content-center">
          <div 
            id="spline-container"
            style={{ width: "100%", height: "500px", position: "relative" }}
          >
            <spline-viewer 
              url="https://prod.spline.design/2ETlX1ahPS9fjqYR/scene.splinecode"
              style={{ 
                width: "100%", 
                height: "100%", 
                position: "absolute",
                transform: "translateZ(-10px)"
              }}
            ></spline-viewer>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="col-md-6">
          <div className="form-signup-login form-signup w-100 m-auto">
            {data ? (
              <p>
                Success! You may now head <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <h2 className="h3 mb-3 fw-normal">Please sign up</h2>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                    onFocus={resetValidation}
                    onBlur={validation}
                  />
                  <div className="invalid-feedback m-2">Username cannot be blank</div>
                  <label htmlFor="username">Username</label>
                </div>

                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={resetValidation}
                    onBlur={validation}
                  />
                  <div className="invalid-feedback m-2">Invalid email address</div>
                  <label htmlFor="email">Email address</label>
                </div>

                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    onFocus={resetValidation}
                    onBlur={validation}
                  />
                  <div className="invalid-feedback m-2">
                    Password must be at least 5 characters
                  </div>
                  <label htmlFor="password">Password</label>
                </div>
                <button
                  className="w-100 btn btn-lg btn-outline-secondary"
                  type="submit"
                >
                  Submit
                </button>
                <div className="text-center mt-3">
                  <Link to="/login">Already have an account? Login</Link>
                </div>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;