import React from "react";
import "../Assets/CSS/home.css";
import Navbar from "../Components/NavBar"; // Adjust path based on where NavBar.jsx is located

function HomePage() {
  return (
    <div className="home-container">
{/*       <nav className="navbar"> */}
{/*         <div className="navbar-brand">React-Java Bank</div> */}
{/*         <ul className="navbar-menu"> */}
{/*           <li><a href="/Profile">Profile</a></li> */}
{/*           <li><a href="/Account">Create Account</a></li> */}
{/*           <li><a href="#deposit">Deposit</a></li> */}
{/*           <li><a href="#withdrawal">Withdrawal</a></li> */}
{/*         </ul> */}
{/*       </nav> */}
      <Navbar />
      <header className="welcome-section">
        <h1>Welcome to the Monopoly Bank</h1>
        <p>
          Manage your finances effortlessly. Access your accounts, perform
          transactions, and take control of your banking needs all in one place.
        </p>
      </header>
    </div>
  );
}

export default HomePage;