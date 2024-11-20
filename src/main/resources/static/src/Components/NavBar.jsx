import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using react-router for navigation

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Monopoly Bank</div>
      <ul className="navbar-menu">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/account">Create Account</Link>
        </li>
        <li>
          <Link to="/deposit">Deposit</Link>
        </li>
        <li>
          <Link to="/withdraw">Withdrawal</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;