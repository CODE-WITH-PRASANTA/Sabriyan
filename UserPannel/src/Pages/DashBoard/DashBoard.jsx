import React, { useState } from 'react';
import './DashBoard.css';

// Initial Mock Orders Data
const ALL_ORDERS = [
  {
    id: 'ORD-2561',
    name: 'Dark Chocolate 55%',
    date: 'May 28, 2025',
    status: 'Delivered',
    statusClass: 'status-delivered',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=80',
    trackingSteps: ['Order Placed', 'Processed', 'Shipped', 'Out for Delivery', 'Delivered']
  },
  {
    id: 'ORD-2560',
    name: 'Honey Gift Pack',
    date: 'May 26, 2025',
    status: 'Processing',
    statusClass: 'status-processing',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&auto=format&fit=crop&q=80',
    trackingSteps: ['Order Placed', 'Processing']
  },
  {
    id: 'ORD-2559',
    name: 'Nut Fusion Box',
    date: 'May 23, 2025',
    status: 'Shipped',
    statusClass: 'status-shipped',
    image: 'https://images.unsplash.com/photo-1536591375315-1b8388cc8a8a?w=100&auto=format&fit=crop&q=80',
    trackingSteps: ['Order Placed', 'Processed', 'Shipped']
  },
  {
    id: 'ORD-2558',
    name: 'Combo Pack',
    date: 'May 21, 2025',
    status: 'Delivered',
    statusClass: 'status-delivered',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=100&auto=format&fit=crop&q=80',
    trackingSteps: ['Order Placed', 'Processed', 'Shipped', 'Out for Delivery', 'Delivered']
  },
  {
    id: 'ORD-2557',
    name: 'Artisan Coffee Beans',
    date: 'May 18, 2025',
    status: 'Delivered',
    statusClass: 'status-delivered',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&auto=format&fit=crop&q=80',
    trackingSteps: ['Order Placed', 'Processed', 'Shipped', 'Out for Delivery', 'Delivered']
  },
  {
    id: 'ORD-2556',
    name: 'Organic Green Tea',
    date: 'May 14, 2025',
    status: 'Delivered',
    statusClass: 'status-delivered',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=100&auto=format&fit=crop&q=80',
    trackingSteps: ['Order Placed', 'Processed', 'Shipped', 'Out for Delivery', 'Delivered']
  }
];

// Graph Datasets per Dropdown Selection
const GRAPH_DATA_BY_TIMEFRAME = {
  'This Month': [
    { label: 'May 1', value: 4500, x: 20, y: 155 },
    { label: 'May 6', value: 10000, x: 90, y: 125 },
    { label: 'May 9', value: 8500, x: 140, y: 135 },
    { label: 'May 11', value: 16000, x: 200, y: 80 },
    { label: 'May 14', value: 12500, x: 260, y: 110 },
    { label: 'May 16', value: 19000, x: 320, y: 65 },
    { label: 'May 21', value: 15000, x: 380, y: 95 },
    { label: 'May 26', value: 20500, x: 440, y: 55 },
    { label: 'May 28', value: 19800, x: 490, y: 60 },
    { label: 'May 31', value: 24560, x: 550, y: 20 }
  ],
  'Last Month': [
    { label: 'Apr 1', value: 3000, x: 20, y: 165 },
    { label: 'Apr 6', value: 7000, x: 90, y: 145 },
    { label: 'Apr 11', value: 12000, x: 200, y: 110 },
    { label: 'Apr 16', value: 14000, x: 320, y: 95 },
    { label: 'Apr 21', value: 18000, x: 380, y: 75 },
    { label: 'Apr 30', value: 21000, x: 550, y: 50 }
  ],
  'This Year': [
    { label: 'Jan', value: 12000, x: 20, y: 110 },
    { label: 'Feb', value: 15000, x: 120, y: 95 },
    { label: 'Mar', value: 22000, x: 230, y: 45 },
    { label: 'Apr', value: 21000, x: 340, y: 50 },
    { label: 'May', value: 24560, x: 550, y: 20 }
  ]
};

const DashBoard = () => {
  const [viewAll, setViewAll] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Month');
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);

  const displayedOrders = viewAll ? ALL_ORDERS : ALL_ORDERS.slice(0, 4);
  const currentGraphData = GRAPH_DATA_BY_TIMEFRAME[selectedTimeframe];

  // Helper to generate SVG smooth curve and area path
  const buildSvgPaths = (points) => {
    if (!points || points.length === 0) return { linePath: '', areaPath: '' };
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlX = (current.x + next.x) / 2;
      path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
    }
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    const area = `${path} L ${lastPoint.x} 180 L ${firstPoint.x} 180 Z`;
    return { linePath: path, areaPath: area };
  };

  const { linePath, areaPath } = buildSvgPaths(currentGraphData);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const found = ALL_ORDERS.find(
      (ord) => ord.id.toLowerCase() === trackOrderId.trim().toLowerCase()
    );
    setSearchedOrder(found || { notFound: true, id: trackOrderId });
  };

  return (
    <div className="dashboard-container">
      {/* Top 4 Stat Cards */}
      <section className="top-cards-grid">
        <div className="stat-card">
          <div className="stat-card-icon icon-purple">🛍️</div>
          <div className="stat-card-content">
            <span className="stat-card-title">Total Orders</span>
            <div className="stat-card-value">12</div>
            <span className="stat-card-badge badge-green">+ 20% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon icon-orange">⏰</div>
          <div className="stat-card-content">
            <span className="stat-card-title">Total Spent</span>
            <div className="stat-card-value">₹ 24,560</div>
            <span className="stat-card-badge badge-green">+ 15% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon icon-red">❤️</div>
          <div className="stat-card-content">
            <span className="stat-card-title">Wishlist Items</span>
            <div className="stat-card-value">8</div>
            <span className="stat-card-badge badge-green">2 new items</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon icon-indigo">🎟️</div>
          <div className="stat-card-content">
            <div className="stat-card-header-action">
              <span className="stat-card-title">Available Coupons</span>
              <span className="stat-card-arrow">↗</span>
            </div>
            <div className="stat-card-value">5</div>
            <span className="stat-card-badge badge-purple">Save More!</span>
          </div>
        </div>
      </section>

      {/* Middle Section: Recent Orders & Spending Overview */}
      <section className="middle-dashboard-grid">
        {/* Recent Orders Card */}
        <div className="dashboard-panel orders-panel">
          <div className="panel-header">
            <h3>Recent Orders</h3>
            <button
              type="button"
              className="view-all-btn"
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? 'Show Less' : 'View All'}
            </button>
          </div>

          <div className="orders-scroll-container">
            {displayedOrders.map((order) => (
              <div key={order.id} className="order-item">
                <img src={order.image} alt={order.name} className="order-image" />
                <div className="order-details">
                  <span className="order-id">{order.id}</span>
                  <span className="order-name">{order.name}</span>
                  <span className="order-date">{order.date}</span>
                </div>
                <span className={`status-pill ${order.statusClass}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="track-order-btn"
            onClick={() => {
              setSearchedOrder(null);
              setTrackOrderId('');
              setTrackingModalOpen(true);
            }}
          >
            📦 Track Your Order
          </button>
        </div>

        {/* Spending Overview Card */}
        <div className="dashboard-panel chart-panel">
          <div className="panel-header">
            <h3>Spending Overview</h3>
            <div className="dropdown-container">
              <select
                value={selectedTimeframe}
                onChange={(e) => {
                  setSelectedTimeframe(e.target.value);
                  setActiveTooltip(null);
                }}
                className="timeframe-select"
              >
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
                <option value="This Year">This Year</option>
              </select>
            </div>
          </div>

          <div className="chart-wrapper">
            <div className="chart-y-axis">
              <span>25K</span>
              <span>20K</span>
              <span>15K</span>
              <span>10K</span>
              <span>5K</span>
              <span>0</span>
            </div>

            <div className="chart-svg-container">
              <svg viewBox="0 0 570 190" className="spending-svg">
                <defs>
                  <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f39c12" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f39c12" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-Axis Grid Lines */}
                <line x1="10" y1="20" x2="560" y2="20" className="grid-line" />
                <line x1="10" y1="55" x2="560" y2="55" className="grid-line" />
                <line x1="10" y1="90" x2="560" y2="90" className="grid-line" />
                <line x1="10" y1="125" x2="560" y2="125" className="grid-line" />
                <line x1="10" y1="160" x2="560" y2="160" className="grid-line" />
                <line x1="10" y1="180" x2="560" y2="180" className="grid-axis-base" />

                {/* Gradient Fill Area */}
                <path d={areaPath} fill="url(#spendingGradient)" />

                {/* Smooth Graph Stroke */}
                <path d={linePath} fill="none" stroke="#e67e22" strokeWidth="3" />

                {/* Data Points with Live Hover Tooltip */}
                {currentGraphData.map((pt, idx) => (
                  <g key={idx}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="5"
                      className="chart-dot"
                      onMouseEnter={() => setActiveTooltip(pt)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    />
                  </g>
                ))}
              </svg>

              {/* Dynamic Interactive Tooltip */}
              {activeTooltip && (
                <div
                  className="chart-live-tooltip"
                  style={{
                    left: `${(activeTooltip.x / 570) * 100}%`,
                    top: `${(activeTooltip.y / 190) * 100}%`
                  }}
                >
                  <strong>{activeTooltip.label}</strong>
                  <span>₹ {activeTooltip.value.toLocaleString()}</span>
                </div>
              )}

              {/* X-Axis Labels */}
              <div className="chart-x-axis">
                {currentGraphData.map((pt, i) => (
                  <span key={i}>{pt.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom 4 Navigation/Action Cards */}
      <section className="bottom-cards-grid">
        <div className="nav-card">
          <div className="nav-card-icon icon-rose">📍</div>
          <div className="nav-card-text">
            <span className="nav-card-title">My Addresses</span>
            <span className="nav-card-sub">3 Saved Addresses</span>
          </div>
        </div>

        <div className="nav-card">
          <div className="nav-card-icon icon-mint">💳</div>
          <div className="nav-card-text">
            <span className="nav-card-title">Payment Methods</span>
            <span className="nav-card-sub">2 Saved Cards</span>
          </div>
        </div>

        <div className="nav-card">
          <div className="nav-card-icon icon-amber">⭐</div>
          <div className="nav-card-text">
            <span className="nav-card-title">My Reviews</span>
            <span className="nav-card-sub">4 Reviews</span>
          </div>
        </div>

        <div className="nav-card">
          <div className="nav-card-icon icon-forest">👥</div>
          <div className="nav-card-text">
            <span className="nav-card-title">Refer & Earn</span>
            <span className="nav-card-sub">Earn Rewards</span>
          </div>
        </div>
      </section>

      {/* Track Order Interactive Modal */}
      {trackingModalOpen && (
        <div className="modal-overlay" onClick={() => setTrackingModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Track Your Shipment</h4>
              <button
                type="button"
                className="close-btn"
                onClick={() => setTrackingModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleTrackSubmit} className="track-form">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. ORD-2561)"
                value={trackOrderId}
                onChange={(e) => setTrackOrderId(e.target.value)}
                required
              />
              <button type="submit">Track</button>
            </form>

            {searchedOrder && !searchedOrder.notFound && (
              <div className="tracking-result">
                <div className="tracking-order-info">
                  <strong>{searchedOrder.name}</strong> ({searchedOrder.id})
                  <span className={`status-pill ${searchedOrder.statusClass}`}>
                    {searchedOrder.status}
                  </span>
                </div>
                <div className="tracking-timeline">
                  {searchedOrder.trackingSteps.map((step, idx) => (
                    <div key={idx} className="timeline-step">
                      <div className="step-dot" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchedOrder && searchedOrder.notFound && (
              <p className="tracking-error">
                No order found matching &quot;{searchedOrder.id}&quot;. Try &quot;ORD-2561&quot;.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;