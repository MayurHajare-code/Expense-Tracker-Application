import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const incomeRes = await axios.get('http://localhost:5000/api/transactions?type=income');
        const expenseRes = await axios.get('http://localhost:5000/api/transactions?type=expense');

        const incomeSum = incomeRes.data.reduce((sum, tx) => sum + tx.amount, 0);
        const expenseSum = expenseRes.data.reduce((sum, tx) => sum + tx.amount, 0);

        setTotalIncome(incomeSum);
        setTotalExpenses(expenseSum);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotals();
  }, []);

  if (loading) return <p className="loading">Loading dashboard...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  const balance = totalIncome - totalExpenses;

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Financial Overview',
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#4CAF50', '#F44336'], 
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
     
      <div className="dashboard-cards">
        <div className="card income">
          <h3>Total Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="card expenses">
          <h3>Total Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>
        <div className={`card balance ${balance >= 0 ? 'positive' : 'negative'}`}>
          <h3>Remaining Balance</h3>
          <p>${balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Income vs Expenses</h3>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
