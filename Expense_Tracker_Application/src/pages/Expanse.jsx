import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditTransaction from './EditTransaction';
import '../styles/income.css'; 

const Expense = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/transactions?type=expense');
        setTransactions(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000); 
  };

  const handleDelete = async (id) => {
     try {
        await axios.delete(`http://localhost:5000/api/transactions/${id}`);
        setTransactions(transactions.filter(tx => tx._id !== id));
        showMessage('Transaction deleted successfully!');
      } catch (err) {
        showMessage('Error deleting transaction: ' + (err.response?.data?.message || err.message));
      }
  };

  const handleEdit = (transaction) => setEditingTransaction(transaction);

  const handleUpdate = async (updatedTransaction) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/transactions/${updatedTransaction._id}`,
        updatedTransaction
      );
      setTransactions(transactions.map(tx =>
        tx._id === res.data._id ? res.data : tx
      ));
      showMessage('Transaction updated successfully!');
      setEditingTransaction(null);
    } catch (err) {
      showMessage('Error updating transaction: ' + (err.response?.data?.message || err.message));
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p className="loading">Loading transactions...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="container">
     
      {message && <div className="popup-message">{message}</div>}

      {transactions.length === 0 ? (
        <p className="empty">No expenses found.</p>
      ) : (
        <>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount ($)</th>
                <th>Actions</th>
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
                  <td>
                    <button className="edit" onClick={() => handleEdit(tx)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(tx._id)}>Delete</button>
                  </td>
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

      {editingTransaction && (
        <EditTransaction
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Expense;
