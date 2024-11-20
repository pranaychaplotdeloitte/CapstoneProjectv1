import "../Assets/CSS/Register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

function RegisterPage() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate(); // Initialize the navigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const userData = { name, phone, email, password };

        try {
            // Make a POST request to the backend
            const response = await axios.post("http://localhost:8080/auth/register", userData);
            console.log("User registered successfully:", response.data);

            // Show success message
            setSuccess("Registration successful! You can now log in.");

            // Clear form fields
            setName("");
            setPhone("");
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error("Error during registration:", err);

            // Set error message based on the backend response or a generic message
            if (err.response && err.response.data) {
                setError(err.response.data.message || "An error occurred. Please try again.");
            } else {
                setError("Unable to register. Please check your details and try again.");
            }
        }
    };

    const handleSignIn = () => {
        // Handle redirect to login/sign-in page
        console.log("Redirecting to sign-in...");
        navigate("/login"); // Navigate to the login page
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Banking App - Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    {/* Show error message */}
                    {error && <div className="error-message">{error}</div>}

                    {/* Show success message */}
                    {success && <div className="success-message">{success}</div>}

                    <div className="button-group">
                        <button type="submit" className="login-button">
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="sign-in-link">
                    <p>
                        Already have an account?{" "}
                        <span onClick={handleSignIn} className="sign-in">
                            Sign In
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
