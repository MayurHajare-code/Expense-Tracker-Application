import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddExpenses.css'; 

const AddExpenses = ({ onAdd }) => {
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount || !date) {
      setError('Please fill all required fields');
      return;
    }

    try {
      const newTransaction = { type, category, amount, date, description };
      const res = await axios.post('http://localhost:5000/api/transactions', newTransaction);

      if (onAdd) onAdd(res.data);

      setType('income');
      setCategory('');
      setAmount('');
      setDate('');
      setDescription('');
      setError('');

      setSuccess('Transaction added successfully!');
      setTimeout(() => setSuccess(''), 3000); 
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="add-transaction-container">
      <h2>Add New Incomes / Expenses </h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>} 
      
      <form onSubmit={handleSubmit} className="add-transaction-form">
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Category: *
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>

        <label>
          Amount: *
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <label>
          Date: *
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddExpenses;
