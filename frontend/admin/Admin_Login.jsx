import React, { useState } from "react";
import "../admin/AdminCSS/AdminLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);
      localStorage.getItem("role") == "admin" ? navigate("/managepost") : navigate("/");
    } catch (err) {
      setError("Invalid username or password");
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="LoginContainer">
      <h2>Welcome back</h2>
      <div className="Log-subtitle">
        <p className="LogBtext">
          Today is a new day. It's your day. You shape it. Sign in to start
          managing your projects.
        </p>
      </div>
      <div className="LogInput">
        <div className="LogInputfield">
          <span className="Uname">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="LogtextInput"
          />
        </div>
        <div className="LogInputfield">
          <span className="Uname">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="LogtextInput"
          />
        </div>
      </div>
      <span>
        <a href="" className="LogFpass">
          Forgot password?
        </a>
      </span>
      <button className="btnAdmin" type="submit">
        Log in
      </button>
    </form>
  );
}

export default AdminLogin;
