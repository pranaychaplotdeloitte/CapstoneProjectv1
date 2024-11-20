import React, { useState } from 'react';
import Modal from "../Pages/Modal"; // Import Modal for success/error messages
import "../Assets/CSS/depwith.css";

const WithdrawPage = () => {
  const [cvv, setCvv] = useState('');
  const [cardNumber, setCardNumber] = useState(''); // Changed to cardNumber
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [finalBalance, setFinalBalance] = useState(null); // State to store final balance
  const [withdrawnAmount, setWithdrawnAmount] = useState(null); // State to store withdrawn amount

  const handleWithdraw = async () => {
    const withdrawData = {
      card_number: cardNumber, // Use card_number in the request
      cvv,
      amount: parseFloat(amount), // Ensure the amount is a number
    };

    try {
      const response = await fetch('http://localhost:8080/transaction/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(withdrawData),
      });
      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setModalMessage('Withdrawal Successful!');
        setWithdrawnAmount(data.data.amount); // Set withdrawn amount from the response
        setFinalBalance(data.data.balance); // Set final balance from the response
      } else {
        setIsSuccess(false);
        setModalMessage('Transaction Failed! Insufficient balance or error.');
        setWithdrawnAmount(null);
        setFinalBalance(null);
      }

      setShowModal(true);
    } catch (error) {
      console.error('Error during withdrawal:', error);
      setIsSuccess(false);
      setModalMessage('An error occurred!');
      setWithdrawnAmount(null);
      setFinalBalance(null);
      setShowModal(true);
    }
  };

  return (
    <div className="withdrawal-page">
      <h1>Withdraw Funds</h1>
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
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
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
        <button type="button" onClick={handleWithdraw}>Withdraw</button>
      </form>

      {/* Modal for success or error */}
      <Modal show={showModal} message={modalMessage} onClose={() => setShowModal(false)} />

      {/* Display results of withdrawal */}
      {isSuccess && (
        <div className="withdrawal-success-info">
          <p>Withdrawal Successful!</p>
          <p>Withdrawn Amount: ${withdrawnAmount}</p>
          <p>Remaining Balance: ${finalBalance}</p>
        </div>
      )}
      {!isSuccess && withdrawnAmount === null && finalBalance === null && (
        <div className="withdrawal-failed-info">
          <p>Transaction Failed! Please check your balance or try again later.</p>
        </div>
      )}
    </div>
  );
};

export default WithdrawPage;
