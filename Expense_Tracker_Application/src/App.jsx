import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import './App.css';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expanse from './pages/Expanse';
import AddExpenses from './pages/AddExpenses';
import TransactionFilter from './pages/TransactionFilter';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incomes" element={<Income />} />
            <Route path="/expenses" element={<Expanse />} />
            <Route path="/add" element={<AddExpenses />} />
            <Route path="/search" element={<TransactionFilter />} />
            
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
