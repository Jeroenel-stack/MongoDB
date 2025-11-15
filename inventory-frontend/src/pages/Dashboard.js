import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/productService';
import { transactionService } from '../services/transactionService';
import Card from '../components/common/Card';
import Loading from '../components/Loading';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalTransactions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, transactionsRes] = await Promise.all([
        productService.getAll(),
        transactionService.getAll({ limit: 1 })
      ]);

      const products = productsRes.data || [];
      const lowStock = products.filter(p => p.quantity < 10).length;

      setStats({
        totalProducts: products.length,
        lowStock,
        totalTransactions: transactionsRes.total || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard">
      <h1>Welcome back, {user?.firstName}!</h1>
      
      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-value">{stats.totalProducts}</div>
          <div className="stat-label">Total Products</div>
        </Card>

        <Card className="stat-card warning">
          <div className="stat-value">{stats.lowStock}</div>
          <div className="stat-label">Low Stock Items</div>
        </Card>

        <Card className="stat-card">
          <div className="stat-value">{stats.totalTransactions}</div>
          <div className="stat-label">Total Transactions</div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;