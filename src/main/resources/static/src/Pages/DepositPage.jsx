import React, { useState } from 'react';
import Modal from "../Pages/Modal"; // Import Modal for success/error messages
import "../Assets/CSS/depwith.css"

const DepositPage = () => {
  const [cardNumber, setCardNumber] = useState(''); // Update to cardNumber instead of accountNumber
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [finalBalance, setFinalBalance] = useState(null); // State to store final balance (if available)
  const [depositedAmount, setDepositedAmount] = useState(null); // State to store deposited amount

  const handleDeposit = async () => {
    const depositData = {
      card_number: cardNumber, // Using card_number instead of accountNumber
      amount: parseFloat(amount), // Ensure amount is a number
    };

    try {
      const response = await fetch('http://localhost:8080/transaction/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Attach auth token if needed
        },
        body: JSON.stringify(depositData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setModalMessage('Deposit Successful!');
        // If response contains additional details, update balance and deposited amount accordingly
        // For now, we'll assume no balance is returned in the response, so we can display the deposited amount
        setDepositedAmount(depositData.amount);
        // If final balance was part of the response, set it here (update the backend if necessary)
        setFinalBalance("Not Available"); // Update based on the actual API response
      } else {
        setIsSuccess(false);
        setModalMessage('Deposit Failed!');
      }
      setShowModal(true);
    } catch (error) {
      console.error('Error during deposit:', error);
      setIsSuccess(false);
      setModalMessage('An error occurred!');
      setShowModal(true);
    }
  };

  return (
    <div className="deposit-page">
      <h1>Deposit Funds</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleDeposit}>Deposit</button>
      </form>

      {/* Modal for success or error */}
      <Modal show={showModal} message={modalMessage} onClose={() => setShowModal(false)} />

      {/* Display final balance and amount deposited if successful */}
      {isSuccess && (
        <div className="deposit-success-info">
          <p>Deposit Successful!</p>
          <p>Deposited Amount: ${depositedAmount}</p>
{/*           <p>New Balance: {finalBalance}</p>  */}{/* Display final balance or a placeholder */}
        </div>
      )}
    </div>
  );
};

export default DepositPage;
