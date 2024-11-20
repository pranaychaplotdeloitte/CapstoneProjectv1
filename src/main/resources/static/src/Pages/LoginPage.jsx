import "../Assets/CSS/Register.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import React Router's useNavigate for redirection
import axiosInstance from "../axiosInstance.js"; // Importing axios instance

function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: name,  // Assuming you're using 'email' as the identifier
      password,
    };

    try {
      // Using axiosInstance instead of axios
      const response = await axiosInstance.post("/auth/login", loginData);

      console.log("User logged in successfully:", response.data);

      if (response.data.success) {
        // Store the token in localStorage (or sessionStorage)
        localStorage.setItem("authToken", response.data.data.token);

        // Redirect to /home after successful login
        navigate("/home"); // Redirect using React Router
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password. Please try again.");
      console.error("Error during login:", error.response?.data || error.message);
    }
  };

  const handleRegister = () => {
    // Redirect to the registration page
    navigate("/"); // Use React Router for redirection
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Banking App Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button type="submit" className="login-button">
              Log In
            </button>
          </div>
        </form>

        <div className="sign-in-link">
          <p>
            Don't have an account?{" "}
            <span onClick={handleRegister} className="sign-in">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
