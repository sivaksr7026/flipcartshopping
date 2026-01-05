import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const studentDetails = {username, email, password,phone};


  const userHandler = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://shoopingbackend.azurewebsites.net/employees/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentDetails),
      }
    );

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message || "Registered successfully", {
        closeButton: false,
      });
      navigate("/login");
    } 
    else if (response.status === 409) {
      toast.error(data.message || "Email already exists", {
        closeButton: false,
      });
       navigate("/register");
    } 
    else {
      toast.error(data.message || "Registration failed", {
        closeButton: false,
      });
       navigate("/register");
    }

  } catch (error) {
    toast.warning(
      "Technical server issue. Please try again later",
      { closeButton: false }
    );
     navigate("/register");
  }
};

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={userHandler}>
        <h2>Create Account</h2>

        <input
          type="text" name="username"
          placeholder="Enter Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email" name="email"
          placeholder="Enter Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password" name="password"
          placeholder="Enter Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text" name="phone"
          placeholder="Enter Phonenumber"
          required
          onChange={(e) => setPhone(e.target.value)}
        />
        

        <button type="submit">Register</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
 
export default Register;
