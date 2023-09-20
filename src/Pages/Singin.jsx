import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { UserContext } from "../contexts/UserContext";

import "./users.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const { user, setUser, token, setToken } = useContext(UserContext);

  const navigate = useNavigate();
  const handleSignin = (e) => {
    e.preventDefault();
    axios
      .post("https://cinetrail-server.herokuapp.com/users/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Email does not exist") {
          setWarning("Bad credentials, please try again!");
        } else {
          setUser(res.data);
          setToken(res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignin}>
        <div className="title-container">
          <h1>Sign In</h1>
          <p>Please fill in this form to login.</p>
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-container">
          <button type="reset" className="cancelbtn">
            Cancel
          </button>
          <button type="submit" className="signupbtn">
            Sign In
          </button>
        </div>
        <p className="signin-message">
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>{" "}
        </p>
        <p>{warning}</p>
      </form>
    </div>
  );
}