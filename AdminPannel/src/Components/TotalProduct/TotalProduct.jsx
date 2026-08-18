import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './TotalProduct.css';
import API from '../../api/axios';

const TotalProduct = () => {
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch live products from Backend API
  const fetchProducts = useCallback(async () => {
    try {
      const response = await API.get('/products');
      if (response.data && response.data.success) {
        setProducts(response.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to fetch products metrics');
    }
  }, []);

  // 2. Fetch active categories for real total category counts
  const fetchCategories = useCallback(async () => {
    try {
      const response = await API.get('/categories', { params: { status: 'Active', limit: 100 } });
      if (response.data && response.data.success) {
        setCategoriesList(response.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  // 3. Fetch active brands for real total brand counts
  const fetchBrands = useCallback(async () => {
    try {
      const response = await API.get('/brands', { params: { status: 'Active', limit: 100 } });
      if (response.data && response.data.success) {
        setBrandsList(response.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch brands:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    const loadAllMetrics = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories(), fetchBrands()]);
      setLoading(false);
    };
    loadAllMetrics();
  }, [fetchProducts, fetchCategories, fetchBrands]);

  // Real-Time Dynamic Metrics Engine
  const metricsData = useMemo(() => {
    const totalProducts = products.length;
    const chocolateCount = products.filter((p) => p.brand === 'Chocolate').length;
    const honeyCount = products.filter((p) => p.brand === 'Honey').length;

    const chocPercent = totalProducts > 0 ? ((chocolateCount / totalProducts) * 100).toFixed(1) : '0';
    const honeyPercent = totalProducts > 0 ? ((honeyCount / totalProducts) * 100).toFixed(1) : '0';

    const brandNamesStr = brandsList.length > 0 
      ? brandsList.map(b => b.name).slice(0, 3).join(', ') 
      : 'Chocolate, Honey, Combo';

    return [
      {
        id: 1,
        title: 'Total Products',
        value: totalProducts,
        subtext: 'Across all brands',
        icon: '📦',
        titleColor: 'text-green',
        iconBg: 'bg-green',
      },
      {
        id: 2,
        title: 'Chocolate Products',
        value: chocolateCount,
        subtext: `${chocPercent}% of total`,
        icon: '🍫',
        titleColor: 'text-orange',
        iconBg: 'bg-orange',
      },
      {
        id: 3,
        title: 'Honey Products',
        value: honeyCount,
        subtext: `${honeyPercent}% of total`,
        icon: '🍯',
        titleColor: 'text-yellow',
        iconBg: 'bg-yellow',
      },
      {
        id: 4,
        title: 'Total Categories',
        value: categoriesList.length,
        subtext: 'Active categories',
        icon: '🏷️',
        titleColor: 'text-purple',
        iconBg: 'bg-purple',
      },
      {
        id: 5,
        title: 'Total Brands',
        value: brandsList.length,
        subtext: brandNamesStr,
        icon: '🌐',
        titleColor: 'text-blue',
        iconBg: 'bg-blue',
      },
      {
        id: 6,
        title: 'Total Reviews',
        value: 245, // Can be connected to a Reviews API endpoint if available
        subtext: 'Across all products',
        icon: '⭐',
        titleColor: 'text-gold',
        iconBg: 'bg-gold',
      },
    ];
  }, [products, categoriesList, brandsList]);

  if (loading) {
    return (
      <div className="tp-container">
        <div className="tp-loading">Loading live metrics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tp-container">
        <div className="tp-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="tp-container">
      <div className="tp-metrics-grid">
        {metricsData.map((item) => (
          <div key={item.id} className="tp-metric-card">
            {/* Circle Icon Badge */}
            <div className={`tp-icon-wrapper ${item.iconBg}`}>
              <span className="tp-icon">{item.icon}</span>
            </div>

            {/* Metric Info Details */}
            <div className="tp-metric-info">
              <span className={`tp-metric-title ${item.titleColor}`}>
                {item.title}
              </span>
              <h3 className="tp-metric-value">{item.value}</h3>
              <span className="tp-metric-sub">{item.subtext}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalProduct;