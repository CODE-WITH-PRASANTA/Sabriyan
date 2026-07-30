import React from 'react';
import './OrderHome.css';

const OrderHome = () => {
  const orderStats = [
    {
      id: 1,
      title: 'Total Orders',
      value: '356',
      subtext: '↑ 18.4% vs last month',
      subtextType: 'green',
      icon: '🛍️',
      badgeClass: 'badge-green',
    },
    {
      id: 2,
      title: 'Total Revenue',
      value: '₹1,24,560',
      subtext: '↑ 24.5% vs last month',
      subtextType: 'green',
      icon: '💰',
      badgeClass: 'badge-yellow',
    },
    {
      id: 3,
      title: 'Pending Orders',
      value: '42',
      subtext: '↓ 5.6% vs last month',
      subtextType: 'green',
      icon: '⏳',
      badgeClass: 'badge-purple',
    },
    {
      id: 4,
      title: 'Processing Orders',
      value: '96',
      subtext: '↑ 12.8% vs last month',
      subtextType: 'green',
      icon: '🔄',
      badgeClass: 'badge-blue',
    },
    {
      id: 5,
      title: 'Delivered Orders',
      value: '178',
      subtext: '↑ 20.6% vs last month',
      subtextType: 'green',
      icon: '✅',
      badgeClass: 'badge-emerald',
    },
    {
      id: 6,
      title: 'Cancelled Orders',
      value: '17',
      subtext: '↓ 2.4% vs last month',
      subtextType: 'red',
      icon: '❌',
      badgeClass: 'badge-red',
    },
  ];

  return (
    <div className="odh-container">
      <div className="odh-stats-grid">
        {orderStats.map((stat) => (
          <div key={stat.id} className="odh-stat-card">
            {/* Left Circular Icon Badge */}
            <div className={`odh-icon-badge ${stat.badgeClass}`}>
              <span className="odh-icon">{stat.icon}</span>
            </div>

            {/* Right Content Details */}
            <div className="odh-stat-info">
              <span className="odh-stat-title">{stat.title}</span>
              <h2 className="odh-stat-value">{stat.value}</h2>
              <span
                className={`odh-stat-sub ${
                  stat.subtextType === 'green' ? 'sub-green' : 'sub-red'
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

export default OrderHome;