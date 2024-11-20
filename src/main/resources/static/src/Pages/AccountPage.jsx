import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing navigate for routing
import "../Assets/CSS/account.css";

// Modal Component for success message
const Modal = ({ show, message, accountDetails, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message}</h2>
        {accountDetails && (
          <div>
            <p><strong>Account Number:</strong> {accountDetails.card_number}</p>
            <p><strong>CVV:</strong> {accountDetails.cvv}</p>
            <p><strong>Balance:</strong> ${accountDetails.balance}</p>
          </div>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const AccountPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null); // Store account details
  const navigate = useNavigate(); // Initialize navigate for routing

  // Function to handle account creation
  const handleCreateAccount = async () => {
    try {
      const response = await fetch("http://localhost:8080/accounts", { // Backend URL for account creation
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}` // Attach the token
        }
      });

      const data = await response.json();

      if (data.success) {
        // Account created successfully, show modal with account details
        setAccountDetails(data.data); // Set the account details from API response
        setShowModal(true); // Show success modal
      } else {
        alert("Account creation failed!");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Something went wrong!");
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Navigate to the profile page
  const handleViewAccounts = () => {
    navigate("/profile");
  };

  return (
    <div className="account-page">
      <h1>Create a New Account</h1>

      <button className="create-account-button" onClick={handleCreateAccount}>
        Create Account
      </button>

      <button className="view-accounts-button" onClick={handleViewAccounts}>
        View My Accounts
      </button>

      {/* Modal */}
      <Modal
        show={showModal}
        message="Your account has been created successfully!"
        accountDetails={accountDetails} // Pass the account details to modal
        onClose={closeModal}
      />
    </div>
  );
};

export default AccountPage;
