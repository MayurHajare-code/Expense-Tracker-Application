import React, { useState, useEffect } from 'react';
import '../styles/editTransaction.css';

const EditTransaction = ({ transaction, onClose, onUpdate }) => {
  const [category, setCategory] = useState(transaction.category);
  const [amount, setAmount] = useState(transaction.amount);
  const [description, setDescription] = useState(transaction.description || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setCategory(transaction.category);
    setAmount(transaction.amount);
    setDescription(transaction.description || '');
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount || amount <= 0) {
      setError('Please enter a valid category and positive amount');
      return;
    }

    onUpdate({ ...transaction, category, amount: parseFloat(amount), description });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Transaction</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>

          <label>
            Amount:
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} className="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
