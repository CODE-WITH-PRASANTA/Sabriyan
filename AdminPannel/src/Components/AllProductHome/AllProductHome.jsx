import React from 'react';
import './AllProductHome.css';

const AllProductHome = () => {
  // Stat cards dummy data
  const statData = [
    {
      id: 1,
      title: 'Total Products',
      value: 128,
      subtext: '↑ 8.7% vs last month',
      subtextType: 'green',
      icon: '📦',
      themeClass: 'theme-green',
    },
    {
      id: 2,
      title: 'Chocolate Products',
      value: 86,
      subtext: '↑ 6.4% vs last month',
      subtextType: 'green',
      icon: '🍫',
      themeClass: 'theme-orange',
    },
    {
      id: 3,
      title: 'Honey Products',
      value: 42,
      subtext: '↑ 12.8% vs last month',
      subtextType: 'green',
      icon: '🍯',
      themeClass: 'theme-yellow',
    },
    {
      id: 4,
      title: 'Low Stock Items',
      value: 14,
      subtext: 'Needs attention',
      subtextType: 'red',
      icon: '⚠️',
      themeClass: 'theme-red',
    },
  ];

  return (
    <div className="aph-container">
      <div className="aph-stats-grid">
        {statData.map((stat) => (
          <div key={stat.id} className="aph-stat-card">
            {/* Left Circular Icon Badge */}
            <div className={`aph-icon-wrapper ${stat.themeClass}`}>
              <span className="aph-icon">{stat.icon}</span>
            </div>

            {/* Right Stat Details */}
            <div className="aph-stat-content">
              <span className="aph-stat-title">{stat.title}</span>
              <h2 className="aph-stat-value">{stat.value}</h2>
              <span className={`aph-stat-sub ${stat.subtextType === 'green' ? 'text-green' : 'text-red'}`}>
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