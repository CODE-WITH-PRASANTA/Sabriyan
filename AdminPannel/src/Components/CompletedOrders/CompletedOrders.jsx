import React, { useState, useEffect, useRef } from 'react';
import './CompletedOrders.css';

const initialOrders = [
  { id: '#ORD-2025-3548', customerName: 'Rohit Kumar', phone: '+91 9876543210', date: 'May 29, 2025', time: '10:30 AM', items: 3, amount: '₹1,250', payment: 'UPI', status: 'Delivered', rawDate: new Date('2025-05-29') },
  { id: '#ORD-2025-3547', customerName: 'Priya Sharma', phone: '+91 8765432109', date: 'May 29, 2025', time: '09:15 AM', items: 2, amount: '₹850', payment: 'Razorpay', status: 'Delivered', rawDate: new Date('2025-05-29') },
  { id: '#ORD-2025-3546', customerName: 'Amit Verma', phone: '+91 7654321098', date: 'May 28, 2025', time: '08:45 PM', items: 4, amount: '₹2,150', payment: 'UPI', status: 'Delivered', rawDate: new Date('2025-05-28') },
  { id: '#ORD-2025-3545', customerName: 'Neha Patel', phone: '+91 6543210987', date: 'May 28, 2025', time: '07:20 PM', items: 1, amount: '₹650', payment: 'COD', status: 'Delivered', rawDate: new Date('2025-05-28') },
  { id: '#ORD-2025-3544', customerName: 'Suresh Singh', phone: '+91 5432109876', date: 'May 28, 2025', time: '05:10 PM', items: 5, amount: '₹2,900', payment: 'Card', status: 'Delivered', rawDate: new Date('2025-05-28') },
  { id: '#ORD-2025-3543', customerName: 'Anjali Mehta', phone: '+91 4321098765', date: 'May 28, 2025', time: '04:05 PM', items: 2, amount: '₹780', payment: 'UPI', status: 'Delivered', rawDate: new Date('2025-05-28') },
  { id: '#ORD-2025-3542', customerName: 'Vikram Joshi', phone: '+91 3210987654', date: 'May 27, 2025', time: '09:50 PM', items: 3, amount: '₹1,470', payment: 'Razorpay', status: 'Delivered', rawDate: new Date('2025-05-27') },
  { id: '#ORD-2025-3541', customerName: 'Pooja Nair', phone: '+91 2109876543', date: 'May 27, 2025', time: '08:30 PM', items: 2, amount: '₹950', payment: 'Card', status: 'Delivered', rawDate: new Date('2025-05-27') },
  { id: '#ORD-2025-3540', customerName: 'Karan Malhotra', phone: '+91 1098765432', date: 'May 27, 2025', time: '06:40 PM', items: 6, amount: '₹3,250', payment: 'UPI', status: 'Delivered', rawDate: new Date('2025-05-27') },
  { id: '#ORD-2025-3539', customerName: 'Meera Iyer', phone: '+91 9988776655', date: 'May 27, 2025', time: '05:15 PM', items: 1, amount: '₹420', payment: 'COD', status: 'Delivered', rawDate: new Date('2025-05-27') },
  // Additional items for pagination check
  { id: '#ORD-2025-3538', customerName: 'Rahul Dravid', phone: '+91 9811223344', date: 'May 26, 2025', time: '02:15 PM', items: 2, amount: '₹1,100', payment: 'UPI', status: 'Delivered', rawDate: new Date('2025-05-26') },
  { id: '#ORD-2025-3537', customerName: 'Smriti Mandhana', phone: '+91 9822334455', date: 'May 26, 2025', time: '11:00 AM', items: 3, amount: '₹1,850', payment: 'Card', status: 'Delivered', rawDate: new Date('2025-05-26') }
];

const CompletedOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods');
  const [dateFilter, setDateFilter] = useState('Date Range');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filterRef = useRef(null);

  // Close filter modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter and Search Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);

    const matchesPayment = 
      paymentFilter === 'All Payment Methods' || order.payment.toLowerCase() === paymentFilter.toLowerCase();

    return matchesSearch && matchesPayment;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Action handlers
  const handleViewDetails = (order) => {
    alert(`Viewing details for Order ID: ${order.id}\nCustomer: ${order.customerName}\nAmount: ${order.amount}`);
  };

  const handleSaveInvoice = (order) => {
    alert(`Downloading/Saving invoice record for ${order.id}`);
  };

  return (
    <div className="completed-orders-container">
      {/* Top Metrics Grid */}
      <div className="completed-orders-metrics-grid">
        <div className="completed-orders-metric-card">
          <div className="completed-orders-metric-icon green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <div className="completed-orders-metric-content">
            <span className="completed-orders-metric-title">Total Completed Orders</span>
            <div className="completed-orders-metric-row">
              <h2>212</h2>
              <span className="completed-orders-badge positive">↑ 18.6% vs last month</span>
            </div>
          </div>
        </div>

        <div className="completed-orders-metric-card">
          <div className="completed-orders-metric-icon orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </div>
          <div className="completed-orders-metric-content">
            <span className="completed-orders-metric-title">Total Revenue</span>
            <div className="completed-orders-metric-row">
              <h2>₹86,750</h2>
              <span className="completed-orders-badge positive">↑ 22.4% vs last month</span>
            </div>
          </div>
        </div>

        <div className="completed-orders-metric-card">
          <div className="completed-orders-metric-icon green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          </div>
          <div className="completed-orders-metric-content">
            <span className="completed-orders-metric-title">Items Delivered</span>
            <div className="completed-orders-metric-row">
              <h2>438</h2>
              <span className="completed-orders-badge positive">↑ 16.3% vs last month</span>
            </div>
          </div>
        </div>

        <div className="completed-orders-metric-card">
          <div className="completed-orders-metric-icon purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
          </div>
          <div className="completed-orders-metric-content">
            <span className="completed-orders-metric-title">Happy Customers</span>
            <div className="completed-orders-metric-row">
              <h2>198</h2>
              <span className="completed-orders-subtext">93.4% satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Filters */}
      <div className="completed-orders-toolbar">
        <div className="completed-orders-search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search by Order ID, Customer, Phone..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div className="completed-orders-filter-group">
          {/* Date Range Dropdown */}
          <div className="completed-orders-select-wrapper">
            <select 
              value={dateFilter} 
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="Date Range">Date Range</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
          </div>

          {/* Payment Method Dropdown */}
          <div className="completed-orders-select-wrapper">
            <select 
              value={paymentFilter} 
              onChange={(e) => { setPaymentFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="All Payment Methods">All Payment Methods</option>
              <option value="UPI">UPI</option>
              <option value="Razorpay">Razorpay</option>
              <option value="COD">COD</option>
              <option value="Card">Card</option>
            </select>
          </div>

          {/* Filter Popover Button */}
          <div className="completed-orders-filter-wrapper" ref={filterRef}>
            <button 
              className="completed-orders-filter-btn"
              onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Filter
            </button>

            {isFilterModalOpen && (
              <div className="completed-orders-filter-popover">
                <h4>Advanced Filters</h4>
                <div className="completed-orders-filter-field">
                  <label>Status</label>
                  <select defaultValue="Delivered">
                    <option value="Delivered">Delivered Only</option>
                    <option value="All">All Statuses</option>
                  </select>
                </div>
                <button 
                  className="completed-orders-apply-btn"
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
      <div className="completed-orders-table-container">
        <table className="completed-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="completed-orders-id">{order.id}</span>
                    <button className="completed-orders-link-btn" onClick={() => handleViewDetails(order)}>
                      View Details
                    </button>
                  </td>
                  <td>
                    <div className="completed-orders-customer">
                      <span className="completed-orders-name">{order.customerName}</span>
                      <span className="completed-orders-phone">{order.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="completed-orders-datetime">
                      <span>{order.date}</span>
                      <span className="completed-orders-time">{order.time}</span>
                    </div>
                  </td>
                  <td>{order.items}</td>
                  <td><strong className="completed-orders-amount">{order.amount}</strong></td>
                  <td>
                    <span className="completed-orders-pay-method">{order.payment}</span>
                  </td>
                  <td>
                    <span className="completed-orders-status-badge">{order.status}</span>
                  </td>
                  <td>
                    <div className="completed-orders-actions">
                      <button 
                        className="completed-orders-action-icon" 
                        title="View Details"
                        onClick={() => handleViewDetails(order)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                      <button 
                        className="completed-orders-action-icon" 
                        title="Save / Invoice"
                        onClick={() => handleSaveInvoice(order)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="completed-orders-no-data">No completed orders found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="completed-orders-pagination-footer">
        <span className="completed-orders-page-info">
          Showing {filteredOrders.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
        </span>
        <div className="completed-orders-pagination-controls">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="completed-orders-page-arrow"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`completed-orders-page-num ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="completed-orders-page-arrow"
          >
            &gt;
          </button>
          <div className="completed-orders-per-page-display">
            <span>{itemsPerPage} / page</span>
          </div>
        </div>
      </div>

      {/* Bottom Insights Section */}
      <div className="completed-orders-insights-section">
        <div className="completed-orders-insights-header">
          <h3>Completion Insights</h3>
          <button className="completed-orders-link-btn" onClick={() => alert('Opening full reviews panel...')}>View All Reviews</button>
        </div>
        <div className="completed-orders-insights-grid">
          <div className="completed-orders-insight-card">
            <div className="completed-orders-insight-icon green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
            </div>
            <div>
              <span className="completed-orders-insight-title">On Time Delivery</span>
              <h4 className="completed-orders-insight-val">96.2%</h4>
              <span className="completed-orders-badge positive">↑ 4.5%</span>
            </div>
          </div>

          <div className="completed-orders-insight-card">
            <div className="completed-orders-insight-icon orange">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div>
              <span className="completed-orders-insight-title">Average Delivery Time</span>
              <h4 className="completed-orders-insight-val">2.4 Days</h4>
              <span className="completed-orders-badge negative">↓ 0.3 days</span>
            </div>
          </div>

          <div className="completed-orders-insight-card">
            <div className="completed-orders-insight-icon brown">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div>
              <span className="completed-orders-insight-title">Repeat Customers</span>
              <h4 className="completed-orders-insight-val">68</h4>
              <span className="completed-orders-badge positive">↑ 12.5%</span>
            </div>
          </div>

          <div className="completed-orders-insight-card">
            <div className="completed-orders-insight-icon yellow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <div>
              <span className="completed-orders-insight-title">Positive Reviews</span>
              <h4 className="completed-orders-insight-val">156</h4>
              <div className="completed-orders-stars">★★★★★</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedOrders;