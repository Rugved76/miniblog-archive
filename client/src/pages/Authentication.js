import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { url } from "./Home";

const li = false;

export const Auth = () => {
  return (
    <div className="auth">
      <Register />  <Login />
    </div>
  );
};


const Login = () => {

  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(`${url}/auth/login`, {
        username,
        password,
      });
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
      li = true;
    } catch (error) {
      li = false;
      console.error(error);
    }
  };




  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: 'white', marginBottom: '2rem' }}>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="submit" type="submit">Login</button>
      </form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${url}/auth/register`, {
        username,
        password,
      });
      // alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: 'white', marginBottom: '2rem' }}>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="submit" type="submit">Register</button>

      </form>
    </div>
  );
};
