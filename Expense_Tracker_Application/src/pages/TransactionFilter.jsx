import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TransactionFilter.css'; 

const TransactionFilter = () => {
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { type };
      if (category) params.category = category;
      if (date) params.date = date; 

      const res = await axios.get('http://localhost:5000/api/transactions', { params });
      setTransactions(res.data);
      if (res.data.length === 0) showMessage('No transactions found for this filter.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setCurrentPage(1); 
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2>Filter Transactions</h2>

      {message && <div className="popup-message">{message}</div>}

      <div className="filter-form">
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Optional"/>
        </label>

        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <button onClick={fetchTransactions}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      {transactions.length > 0 && (
        <>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((tx) => (
                <tr key={tx._id} className={tx.type}>
                  <td>{tx.type.toUpperCase()}</td>
                  <td>{tx.category}</td>
                  <td>{tx.description || '-'}</td>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td>{tx.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionFilter;
