import React, { useState, useEffect, useRef } from 'react';
import './CancelOrders.css';

const initialOrders = [
  { id: '#ORD-2025-3528', customerName: 'Arjun Mehta', phone: '+91 9876543210', date: 'May 29, 2025', time: '11:20 AM', amount: '₹1,250', reason: 'Customer changed mind', subReason: 'Cancelled by Customer', status: 'Refunded' },
  { id: '#ORD-2025-3527', customerName: 'Sneha Kapoor', phone: '+91 8765432109', date: 'May 29, 2025', time: '10:05 AM', amount: '₹850', reason: 'Found better price elsewhere', subReason: 'Cancelled by Customer', status: 'Refunded' },
  { id: '#ORD-2025-3526', customerName: 'Ravi Singh', phone: '+91 7654321098', date: 'May 28, 2025', time: '09:30 PM', amount: '₹2,150', reason: 'Delivery time too long', subReason: 'Cancelled by Customer', status: 'Refunded' },
  { id: '#ORD-2025-3525', customerName: 'Kavya Reddy', phone: '+91 6543210987', date: 'May 28, 2025', time: '07:45 PM', amount: '₹650', reason: 'Ordered by mistake', subReason: 'Cancelled by Customer', status: 'Refunded' },
  { id: '#ORD-2025-3524', customerName: 'Manish Gupta', phone: '+91 5432109876', date: 'May 28, 2025', time: '06:10 PM', amount: '₹2,900', reason: 'Address not serviceable', subReason: 'Cancelled by System', status: 'Refunded' },
  { id: '#ORD-2025-3523', customerName: 'Deepika Sharma', phone: '+91 4321098765', date: 'May 27, 2025', time: '08:55 PM', amount: '₹780', reason: 'Wanted to modify items', subReason: 'Cancelled by Customer', status: 'Refunded' },
  { id: '#ORD-2025-3522', customerName: 'Nikhil Verma', phone: '+91 3210987654', date: 'May 27, 2025', time: '07:20 PM', amount: '₹1,470', reason: 'Payment failed', subReason: 'Cancelled by System', status: 'Refund Pending' },
  { id: '#ORD-2025-3521', customerName: 'Simran Kaur', phone: '+91 2109876543', date: 'May 27, 2025', time: '05:40 PM', amount: '₹950', reason: 'Out of stock', subReason: 'Cancelled by System', status: 'Refund Pending' },
  { id: '#ORD-2025-3520', customerName: 'Gaurav Malhotra', phone: '+91 1098765432', date: 'May 27, 2025', time: '04:30 PM', amount: '₹3,250', reason: 'Wrong product ordered', subReason: 'Cancelled by Customer', status: 'Refunded' },
  { id: '#ORD-2025-3519', customerName: 'Isha Nair', phone: '+91 9988776655', date: 'May 26, 2025', time: '09:15 PM', amount: '₹420', reason: 'Changed delivery address', subReason: 'Cancelled by Customer', status: 'Refund Pending' },
  // Additional items for page 2 testing
  { id: '#ORD-2025-3518', customerName: 'Rohit Sharma', phone: '+91 9811223344', date: 'May 26, 2025', time: '02:15 PM', amount: '₹1,100', reason: 'Customer changed mind', subReason: 'Cancelled by Customer', status: 'Refunded' },
  { id: '#ORD-2025-3517', customerName: 'Virat Kohli', phone: '+91 9822334455', date: 'May 26, 2025', time: '11:00 AM', amount: '₹1,850', reason: 'Out of stock', subReason: 'Cancelled by System', status: 'Refund Pending' }
];

const CancelOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('Date Range');
  const [reasonFilter, setReasonFilter] = useState('Cancellation Reason');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filterRef = useRef(null);

  // Close advanced filter modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter and search logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);

    const matchesReason = 
      reasonFilter === 'Cancellation Reason' || order.reason.toLowerCase() === reasonFilter.toLowerCase();

    return matchesSearch && matchesReason;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleViewDetails = (order) => {
    alert(`Viewing details for Cancelled Order ID: ${order.id}\nCustomer: ${order.customerName}\nReason: ${order.reason}`);
  };

  return (
    <div className="cancel-orders-container">
      {/* Top Metrics Grid */}
      <div className="cancel-orders-metrics-grid">
        <div className="cancel-orders-metric-card">
          <div className="cancel-orders-metric-icon orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div className="cancel-orders-metric-content">
            <span className="cancel-orders-metric-title">Total Cancelled Orders</span>
            <div className="cancel-orders-metric-row">
              <h2>28</h2>
              <span className="cancel-orders-badge negative">↓ 12.5% vs last month</span>
            </div>
          </div>
        </div>

        <div className="cancel-orders-metric-card">
          <div className="cancel-orders-metric-icon green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <div className="cancel-orders-metric-content">
            <span className="cancel-orders-metric-title">Refunded Amount</span>
            <div className="cancel-orders-metric-row">
              <h2>₹8,450</h2>
              <span className="cancel-orders-badge negative">↓ 8.3% vs last month</span>
            </div>
          </div>
        </div>

        <div className="cancel-orders-metric-card">
          <div className="cancel-orders-metric-icon yellow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="cancel-orders-metric-content">
            <span className="cancel-orders-metric-title">Cancellation Rate</span>
            <div className="cancel-orders-metric-row">
              <h2>3.2%</h2>
              <span className="cancel-orders-badge negative">↓ 0.8% vs last month</span>
            </div>
          </div>
        </div>

        <div className="cancel-orders-metric-card">
          <div className="cancel-orders-metric-icon warning">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div className="cancel-orders-metric-content">
            <span className="cancel-orders-metric-title">Pending Refunds</span>
            <div className="cancel-orders-metric-row">
              <h2>5</h2>
              <span className="cancel-orders-subtext">₹1,250 pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="cancel-orders-toolbar">
        <div className="cancel-orders-search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search by Order ID, Customer, Phone..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div className="cancel-orders-filter-group">
          {/* Date Range Dropdown */}
          <div className="cancel-orders-select-wrapper">
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="Date Range">Date Range</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
          </div>

          {/* Cancellation Reasons Dropdown */}
          <div className="cancel-orders-select-wrapper">
            <select value={reasonFilter} onChange={(e) => { setReasonFilter(e.target.value); setCurrentPage(1); }}>
              <option value="Cancellation Reason">Cancellation Reason</option>
              <option value="Customer changed mind">Customer changed mind</option>
              <option value="Found better price elsewhere">Found better price elsewhere</option>
              <option value="Delivery time too long">Delivery time too long</option>
              <option value="Ordered by mistake">Ordered by mistake</option>
              <option value="Address not serviceable">Address not serviceable</option>
              <option value="Wanted to modify items">Wanted to modify items</option>
              <option value="Payment failed">Payment failed</option>
              <option value="Out of stock">Out of stock</option>
              <option value="Wrong product ordered">Wrong product ordered</option>
              <option value="Changed delivery address">Changed delivery address</option>
            </select>
          </div>

          {/* Advanced Filter Popover */}
          <div className="cancel-orders-filter-wrapper" ref={filterRef}>
            <button 
              className="cancel-orders-filter-btn"
              onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Filter
            </button>

            {isFilterModalOpen && (
              <div className="cancel-orders-filter-popover">
                <h4>Advanced Filters</h4>
                <div className="cancel-orders-filter-field">
                  <label>Refund Status</label>
                  <select defaultValue="All">
                    <option value="All">All Statuses</option>
                    <option value="Refunded">Refunded</option>
                    <option value="Refund Pending">Refund Pending</option>
                  </select>
                </div>
                <button 
                  className="cancel-orders-apply-btn"
                  onClick={() => setIsFilterModalOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="cancel-orders-table-container">
        <table className="cancel-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="cancel-orders-id">{order.id}</span>
                    <button className="cancel-orders-link-btn" onClick={() => handleViewDetails(order)}>
                      View Details
                    </button>
                  </td>
                  <td>
                    <div className="cancel-orders-customer">
                      <span className="cancel-orders-name">{order.customerName}</span>
                      <span className="cancel-orders-phone">{order.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="cancel-orders-datetime">
                      <span>{order.date}</span>
                      <span className="cancel-orders-time">{order.time}</span>
                    </div>
                  </td>
                  <td><strong className="cancel-orders-amount">{order.amount}</strong></td>
                  <td>
                    <div className="cancel-orders-reason-box">
                      <span className="cancel-orders-main-reason">{order.reason}</span>
                      <span className="cancel-orders-sub-reason">{order.subReason}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`cancel-orders-status-badge ${order.status === 'Refunded' ? 'refunded' : 'pending'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="cancel-orders-actions">
                      <button 
                        className="cancel-orders-action-btn"
                        onClick={() => handleViewDetails(order)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="cancel-orders-no-data">No cancelled orders found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="cancel-orders-pagination-footer">
        <span className="cancel-orders-page-info">
          Showing {filteredOrders.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
        </span>
        <div className="cancel-orders-pagination-controls">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="cancel-orders-page-arrow"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`cancel-orders-page-num ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="cancel-orders-page-arrow"
          >
            &gt;
          </button>
          <div className="cancel-orders-per-page-display">
            <span>{itemsPerPage} / page</span>
          </div>
        </div>
      </div>

      {/* Bottom Insights Section */}
      <div className="cancel-orders-insights-grid-bottom">
        {/* Card 1: Cancellation Insights Pie summary */}
        <div className="cancel-orders-insight-panel">
          <h3>Cancellation Insights</h3>
          <div className="cancel-orders-pie-container">
            <div className="cancel-orders-donut-chart">
              <div className="cancel-orders-donut-inner">
                <strong>28</strong>
                <span>Total</span>
              </div>
            </div>
            <div className="cancel-orders-donut-legend">
              <div className="legend-item"><span className="dot orange"></span> Customer changed mind <span className="val">10 (35.7%)</span></div>
              <div className="legend-item"><span className="dot purple"></span> Found better price <span className="val">6 (21.4%)</span></div>
              <div className="legend-item"><span className="dot blue"></span> Delivery time too long <span className="val">4 (14.3%)</span></div>
              <div className="legend-item"><span className="dot red"></span> Out of stock / Unavailable <span className="val">3 (10.7%)</span></div>
              <div className="legend-item"><span className="dot grey"></span> Others <span className="val">5 (17.9%)</span></div>
            </div>
          </div>
        </div>

        {/* Card 2: Top Cancellation Reasons */}
        <div className="cancel-orders-insight-panel">
          <h3>Top Cancellation Reasons</h3>
          <div className="cancel-orders-progress-list">
            <div className="progress-row">
              <div className="progress-label"><span>1</span> Customer changed mind</div>
              <div className="progress-track"><div className="progress-fill orange" style={{width: '35.7%'}}></div></div>
              <span className="progress-percent">35.7%</span>
            </div>
            <div className="progress-row">
              <div className="progress-label"><span>2</span> Found better price elsewhere</div>
              <div className="progress-track"><div className="progress-fill purple" style={{width: '21.4%'}}></div></div>
              <span className="progress-percent">21.4%</span>
            </div>
            <div className="progress-row">
              <div className="progress-label"><span>3</span> Delivery time too long</div>
              <div className="progress-track"><div className="progress-fill blue" style={{width: '14.3%'}}></div></div>
              <span className="progress-percent">14.3%</span>
            </div>
            <div className="progress-row">
              <div className="progress-label"><span>4</span> Out of stock / Unavailable</div>
              <div className="progress-track"><div className="progress-fill red" style={{width: '10.7%'}}></div></div>
              <span className="progress-percent">10.7%</span>
            </div>
            <div className="progress-row">
              <div className="progress-label"><span>5</span> Others</div>
              <div className="progress-track"><div className="progress-fill grey" style={{width: '17.9%'}}></div></div>
              <span className="progress-percent">17.9%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Refund Summary */}
        <div className="cancel-orders-insight-panel">
          <h3>Refund Summary</h3>
          <div className="cancel-orders-refund-summary">
            <div className="refund-row"><span>Total Refunds</span> <strong>₹8,450</strong></div>
            <div className="refund-row"><span>Completed Refunds</span> <strong>₹7,200</strong></div>
            <div className="refund-row"><span>Pending Refunds</span> <strong>₹1,250</strong></div>
            <div className="refund-row success-rate">
              <span>Refund Success Rate</span>
              <strong>96.4%</strong>
            </div>
            <div className="success-bar-track">
              <div className="success-bar-fill" style={{width: '96.4%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrders;