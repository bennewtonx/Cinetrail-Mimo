import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import './users.css';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("https://cinetrail-server.herokuapp.com/users/signup", {
        email,
        password,
        username,
      })
      .then((res) => {
        if (res.data.status === 409) {
          alert("Email already in use, please sign up with another email.");
        } else {
          setUsername("");
          setEmail("");
          setPassword("");
          setSignupSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="title-container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
        </div>
        <div className="button-container">
          <button type="reset" className="cancelbtn">
            Cancel
          </button>
          <button type="submit" className="signupbtn">
            Sign Up
          </button>
        </div>
        {signupSuccess ? (
          <p className="success-message">
            Signed up successfully! <Link to={"/signin"}>Sign In</Link>
          </p>
        ) : (
          <p className="success-message">
            Already have an account? <Link to={"/signin"}>Sign In</Link>
          </p>
        )}
      </form>
    </div>
  );
}