import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/Login.css";
import { toast } from 'react-toastify';


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://shoopingbackend.azurewebsites.net/employees/login",
      { email, password }
    );
    localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  
    toast.success("Login successfully", {
      closeButton: false,
    });
    navigate("/profile");

  } catch (error) {
    if (error.response ) {
      toast.error("Invalid Email or Password", {
        closeButton: false,
      });
       navigate("/login");
    }
    else {
      toast.warning(
        "Technical server issue. Please try again later",
        { closeButton: false }
      );
       navigate("/login");
    }
  }
};

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />


        <button type="submit">Login</button>

        <p className="register-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}