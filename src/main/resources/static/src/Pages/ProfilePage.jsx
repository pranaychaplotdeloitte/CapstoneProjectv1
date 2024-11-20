import React, { useEffect, useState } from "react";
import "../Assets/CSS/profile.css";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userAccounts, setUserAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile and accounts data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        // Fetch user profile data
        const profileResponse = await fetch("http://localhost:8080/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const profileData = await profileResponse.json();

        if (profileData.success) {
          setUserProfile(profileData.data);
        } else {
          setError("Failed to fetch profile data.");
        }

        // Fetch user account data
        const accountResponse = await fetch("http://localhost:8080/accounts", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const accountData = await accountResponse.json();

        if (accountData.success) {
          setUserAccounts(accountData.data); // This should contain accounts with accountNumber, cvv, and balance
        } else {
          setError("Failed to fetch account data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // If data is loading or error occurs
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Check if the profile data is loaded
  if (!userProfile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h1>{userProfile.name}'s Profile</h1>
        <p><strong>Phone:</strong> {userProfile.phone}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
      </div>

      <div className="accounts-section">
        <h2>Accounts</h2>
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Account Number</th>
              <th>CVV</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {userAccounts.length > 0 ? (
              userAccounts.map((account, index) => (
                <tr key={index}>
                  <td>{account.card_number}</td>
                  <td>{account.cvv}</td>
                  <td>${account.balance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No accounts available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
