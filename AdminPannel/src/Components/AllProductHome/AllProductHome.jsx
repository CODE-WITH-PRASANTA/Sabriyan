import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './AllProductHome.css';
import API from '../../api/axios';

const AllProductHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch live product dataset from Backend API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get('/products');

      if (response.data && response.data.success) {
        setProducts(response.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch product stats:', err);
      setError('Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 2. Real-Time Dynamic Analytics Engine
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const chocolateCount = products.filter((p) => p.brand === 'Chocolate').length;
    const honeyCount = products.filter((p) => p.brand === 'Honey').length;
    
    // Low stock items threshold (<= 20 units)
    const lowStockCount = products.filter((p) => Number(p.stock) <= 20).length;

    // Relative percentage calculations
    const chocPercent = totalProducts > 0 ? ((chocolateCount / totalProducts) * 100).toFixed(1) : '0';
    const honeyPercent = totalProducts > 0 ? ((honeyCount / totalProducts) * 100).toFixed(1) : '0';

    return [
      {
        id: 1,
        title: 'Total Products',
        value: totalProducts,
        subtext: totalProducts > 0 ? 'Across all brands' : 'No products found',
        subtextType: 'green',
        icon: '📦',
        themeClass: 'theme-green',
      },
      {
        id: 2,
        title: 'Chocolate Products',
        value: chocolateCount,
        subtext: `${chocPercent}% of total inventory`,
        subtextType: 'green',
        icon: '🍫',
        themeClass: 'theme-orange',
      },
      {
        id: 3,
        title: 'Honey Products',
        value: honeyCount,
        subtext: `${honeyPercent}% of total inventory`,
        subtextType: 'green',
        icon: '🍯',
        themeClass: 'theme-yellow',
      },
      {
        id: 4,
        title: 'Low Stock Items',
        value: lowStockCount,
        subtext: lowStockCount > 0 ? 'Needs attention' : 'Inventory optimal',
        subtextType: lowStockCount > 0 ? 'red' : 'green',
        icon: '⚠️',
        themeClass: 'theme-red',
      },
    ];
  }, [products]);

  if (loading) {
    return (
      <div className="aph-container">
        <div className="aph-loading">Loading inventory metrics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aph-container">
        <div className="aph-error-box">{error}</div>
      </div>
    );
  }

  return (
    <div className="aph-container">
      <div className="aph-stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="aph-stat-card">
            {/* Left Circular Icon Badge */}
            <div className={`aph-icon-wrapper ${stat.themeClass}`}>
              <span className="aph-icon">{stat.icon}</span>
            </div>

            {/* Right Stat Details */}
            <div className="aph-stat-content">
              <span className="aph-stat-title">{stat.title}</span>
              <h2 className="aph-stat-value">{stat.value}</h2>
              <span
                className={`aph-stat-sub ${
                  stat.subtextType === 'green' ? 'text-green' : 'text-red'
                }`}
              >
                {stat.subtext}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductHome;