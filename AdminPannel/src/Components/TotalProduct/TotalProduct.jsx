import React from 'react';
import './TotalProduct.css';

const TotalProduct = () => {
  const metricsData = [
    {
      id: 1,
      title: 'Total Products',
      value: 128,
      subtext: 'Across all brands',
      icon: '📦',
      titleColor: 'text-green',
      iconBg: 'bg-green',
    },
    {
      id: 2,
      title: 'Chocolate Products',
      value: 86,
      subtext: '67.2% of total',
      icon: '🍫',
      titleColor: 'text-orange',
      iconBg: 'bg-orange',
    },
    {
      id: 3,
      title: 'Honey Products',
      value: 42,
      subtext: '32.8% of total',
      icon: '🍯',
      titleColor: 'text-yellow',
      iconBg: 'bg-yellow',
    },
    {
      id: 4,
      title: 'Total Categories',
      value: 16,
      subtext: 'Active categories',
      icon: '🏷️',
      titleColor: 'text-purple',
      iconBg: 'bg-purple',
    },
    {
      id: 5,
      title: 'Total Brands',
      value: 3,
      subtext: 'Chocolate, Honey, Combo',
      icon: '🌐',
      titleColor: 'text-blue',
      iconBg: 'bg-blue',
    },
    {
      id: 6,
      title: 'Total Reviews',
      value: 245,
      subtext: 'Across all products',
      icon: '⭐',
      titleColor: 'text-gold',
      iconBg: 'bg-gold',
    },
  ];

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