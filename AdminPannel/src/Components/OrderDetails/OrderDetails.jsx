import React, { useState, useMemo } from 'react';
import './OrderDetails.css';

// SVG Icons Component
const Icons = {
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Export: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Filter: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Edit: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Delete: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
  Close: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
};

// Mock Data
const INITIAL_ORDERS = [
  { id: '#ORD-2025-3561', customer: 'Rohit Sharma', email: 'rohit@gmail.com', avatar: 'https://i.pravatar.cc/100?img=11', brand: 'Chocolate', amount: 1299, payment: 'Paid', method: 'Online', status: 'Delivered', date: 'May 29, 2025', time: '10:30 AM', itemsCount: 3 },
  { id: '#ORD-2025-3560', customer: 'Anjali Mehta', email: 'anjali.mehta@gmail.com', avatar: 'https://i.pravatar.cc/100?img=5', brand: 'Honey', amount: 549, payment: 'Paid', method: 'Online', status: 'Processing', date: 'May 29, 2025', time: '09:15 AM', itemsCount: 2 },
  { id: '#ORD-2025-3559', customer: 'Vikram Singh', email: 'vikram.singh@gmail.com', avatar: 'https://i.pravatar.cc/100?img=12', brand: 'Chocolate', amount: 1749, payment: 'Paid', method: 'COD', status: 'Shipped', date: 'May 28, 2025', time: '08:45 PM', itemsCount: 4 },
  { id: '#ORD-2025-3558', customer: 'Neha Verma', email: 'neha.verma@gmail.com', avatar: 'https://i.pravatar.cc/100?img=9', brand: 'Honey', amount: 499, payment: 'Paid', method: 'Online', status: 'Pending', date: 'May 28, 2025', time: '07:20 PM', itemsCount: 1 },
  { id: '#ORD-2025-3557', customer: 'Arjun Patel', email: 'arjunpatel@gmail.com', avatar: 'https://i.pravatar.cc/100?img=13', brand: 'Combo', amount: 1199, payment: 'Paid', method: 'Online', status: 'Delivered', date: 'May 28, 2025', time: '06:10 PM', itemsCount: 2 },
  { id: '#ORD-2025-3556', customer: 'Priya Nair', email: 'priya.nair@gmail.com', avatar: 'https://i.pravatar.cc/100?img=10', brand: 'Chocolate', amount: 899, payment: 'Failed', method: 'Online', status: 'Cancelled', date: 'May 27, 2025', time: '05:30 PM', itemsCount: 3 },
  { id: '#ORD-2025-3555', customer: 'Karan Malhotra', email: 'karan.malhotra@gmail.com', avatar: 'https://i.pravatar.cc/100?img=14', brand: 'Honey', amount: 599, payment: 'Paid', method: 'COD', status: 'Delivered', date: 'May 27, 2025', time: '04:15 PM', itemsCount: 1 },
  { id: '#ORD-2025-3554', customer: 'Simran Kaur', email: 'simran.kaur@gmail.com', avatar: 'https://i.pravatar.cc/100?img=20', brand: 'Combo', amount: 2199, payment: 'Paid', method: 'Online', status: 'Processing', date: 'May 27, 2025', time: '03:50 PM', itemsCount: 5 },
];

const OrderDetails = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Filters & Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [brandFilter, setBrandFilter] = useState('All');
  const [timeRange, setTimeRange] = useState('This Month');
  
  // Table Interaction States
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Dynamic Filtering Logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchesPayment = paymentFilter === 'All' || order.payment === paymentFilter;
      const matchesBrand = brandFilter === 'All' || order.brand === brandFilter;

      return matchesSearch && matchesStatus && matchesPayment && matchesBrand;
    });
  }, [orders, searchTerm, statusFilter, paymentFilter, brandFilter]);

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage) || 1;

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredOrders.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredOrders, currentPage, rowsPerPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(paginatedOrders.map(o => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setPaymentFilter('All');
    setBrandFilter('All');
    setCurrentPage(1);
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm(`Are you sure you want to delete order ${id}?`)) {
      setOrders(prev => prev.filter(order => order.id !== id));
      setSelectedOrders(prev => prev.filter(item => item !== id));
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setOrders(prev => prev.map(o => o.id === editingOrder.id ? editingOrder : o));
    setEditingOrder(null);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Order ID,Customer,Email,Brand,Amount,Status,Date"]
      .concat(filteredOrders.map(o => `${o.id},${o.customer},${o.email},${o.brand},${o.amount},${o.status},${o.date}`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Orders_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-container">
      {/* FILTER & CONTROL BAR */}
      <header className="controls-header">
        <div className="search-box">
          <Icons.Search />
          <input 
            type="text" 
            placeholder="Search Order ID, Customer, Email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="filters-group">
          <select 
            value={statusFilter} 
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} 
            className="dropdown-select"
          >
            <option value="All">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select 
            value={paymentFilter} 
            onChange={(e) => { setPaymentFilter(e.target.value); setCurrentPage(1); }} 
            className="dropdown-select"
          >
            <option value="All">All Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </select>

          <select 
            value={brandFilter} 
            onChange={(e) => { setBrandFilter(e.target.value); setCurrentPage(1); }} 
            className="dropdown-select"
          >
            <option value="All">All Brands</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Honey">Honey</option>
            <option value="Combo">Combo</option>
          </select>

          <button className="btn-secondary" onClick={handleExport}>
            <Icons.Export />
            <span>Export</span>
          </button>

          <button className="btn-primary" onClick={handleResetFilters}>
            <Icons.Filter />
            <span>Reset Filters</span>
          </button>
        </div>
      </header>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="dashboard-grid">
        
        {/* TABLE CONTAINER */}
        <section className="table-card">
          <div className="table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th width="40">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={paginatedOrders.length > 0 && selectedOrders.length === paginatedOrders.length}
                    />
                  </th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Brand</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <tr key={order.id} className={selectedOrders.includes(order.id) ? 'row-selected' : ''}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelectOne(order.id)}
                        />
                      </td>
                      <td className="font-mono">{order.id}</td>
                      <td>
                        <div className="customer-cell">
                          <img src={order.avatar} alt={order.customer} className="avatar" />
                          <div>
                            <div className="customer-name">{order.customer}</div>
                            <div className="customer-email">{order.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`brand-badge brand-${order.brand.toLowerCase()}`}>
                          {order.brand}
                        </span>
                      </td>
                      <td>
                        <div className="items-cell">
                          <div className="thumb-stack">
                            <span className="item-thumb">🍫</span>
                            <span className="item-thumb">🍯</span>
                          </div>
                          <span className="items-count">+{order.itemsCount}</span>
                        </div>
                      </td>
                      <td className="amount-cell">₹{order.amount.toLocaleString()}</td>
                      <td>
                        <div className="payment-cell">
                          <span className={`payment-pill ${order.payment.toLowerCase()}`}>
                            {order.payment}
                          </span>
                          <span className="payment-method">{order.method}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div className="date-cell">
                          <div>{order.date}</div>
                          <div className="time-subtext">{order.time}</div>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-action edit" 
                            title="Edit Order" 
                            onClick={() => setEditingOrder({ ...order })}
                          >
                            <Icons.Edit />
                            <span>Edit</span>
                          </button>
                          <button 
                            className="btn-action delete" 
                            title="Delete Order" 
                            onClick={() => handleDeleteOrder(order.id)}
                          >
                            <Icons.Delete />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="no-data">No orders matching the current filter criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* DYNAMIC PAGINATION FOOTER */}
          <footer className="pagination-footer">
            <div className="pagination-info">
              Showing {filteredOrders.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
            </div>
            
            <div className="pagination-controls">
              <button 
                className="page-nav" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button 
                  key={pageNum} 
                  className={`page-num ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button 
                className="page-nav"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                &gt;
              </button>
            </div>

            <div className="rows-per-page">
              <span>Rows per page:</span>
              <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </footer>
        </section>

        {/* RIGHT ANALYTICS SIDEBAR */}
        <aside className="analytics-sidebar">
          
          {/* 1. ORDER SUMMARY */}
          <div className="analytics-card">
            <h3 className="card-title">Order Summary</h3>
            <div className="summary-chart-container">
              <div className="donut-chart">
                <div className="donut-center">
                  <span className="donut-total">{orders.length}</span>
                  <span className="donut-label">Total</span>
                </div>
              </div>
              <ul className="chart-legend">
                <li><span className="dot delivered"></span> Delivered <span className="val">{orders.filter(o => o.status === 'Delivered').length}</span></li>
                <li><span className="dot processing"></span> Processing <span className="val">{orders.filter(o => o.status === 'Processing').length}</span></li>
                <li><span className="dot pending"></span> Pending <span className="val">{orders.filter(o => o.status === 'Pending').length}</span></li>
                <li><span className="dot cancelled"></span> Cancelled <span className="val">{orders.filter(o => o.status === 'Cancelled').length}</span></li>
              </ul>
            </div>
          </div>

          {/* 2. TOP SELLING BRANDS */}
          <div className="analytics-card">
            <div className="card-header">
              <h3 className="card-title">Top Selling Brands</h3>
              <select 
                className="mini-dropdown" 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
              </select>
            </div>
            
            <div className="brand-progress-list">
              <div className="brand-progress-item">
                <div className="brand-info">
                  <span className="brand-name">Chocolate</span>
                  <span className="brand-metrics">₹78,450 &nbsp; <b className="pct">62.9%</b></span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-fill chocolate" style={{ width: '62.9%' }}></div>
                </div>
              </div>

              <div className="brand-progress-item">
                <div className="brand-info">
                  <span className="brand-name">Honey</span>
                  <span className="brand-metrics">₹28,760 &nbsp; <b className="pct">23.1%</b></span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-fill honey" style={{ width: '23.1%' }}></div>
                </div>
              </div>

              <div className="brand-progress-item">
                <div className="brand-info">
                  <span className="brand-name">Combo</span>
                  <span className="brand-metrics">₹17,350 &nbsp; <b className="pct">13.9%</b></span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-fill combo" style={{ width: '13.9%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. PAYMENT METHOD */}
          <div className="analytics-card">
            <h3 className="card-title">Payment Method</h3>
            <ul className="payment-metrics-list">
              <li>
                <span className="pm-label"><span className="sq-dot online"></span> Online Payment</span>
                <span className="pm-values"><span className="pm-pct">65.4%</span> ₹81,450</span>
              </li>
              <li>
                <span className="pm-label"><span className="sq-dot cod"></span> COD</span>
                <span className="pm-values"><span className="pm-pct">30.3%</span> ₹37,680</span>
              </li>
              <li>
                <span className="pm-label"><span className="sq-dot wallet"></span> Wallet</span>
                <span className="pm-values"><span className="pm-pct">3.2%</span> ₹3,980</span>
              </li>
              <li>
                <span className="pm-label"><span className="sq-dot upi"></span> UPI</span>
                <span className="pm-values"><span className="pm-pct">1.1%</span> ₹1,450</span>
              </li>
            </ul>
          </div>

          {/* 4. DOWNLOAD REPORTS */}
          <div className="analytics-card">
            <h3 className="card-title">Download Reports</h3>
            <div className="reports-grid">
              <button className="report-btn sales" onClick={handleExport}>
                <Icons.Download /> Sales Report
              </button>
              <button className="report-btn order" onClick={handleExport}>
                <Icons.Download /> Order Report
              </button>
              <button className="report-btn payment" onClick={handleExport}>
                <Icons.Download /> Payment Report
              </button>
              <button className="report-btn customer" onClick={handleExport}>
                <Icons.Download /> Customer Report
              </button>
            </div>
          </div>

        </aside>
      </main>

      {/* EDIT MODAL */}
      {editingOrder && (
        <div className="modal-overlay" onClick={() => setEditingOrder(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Order - {editingOrder.id}</h3>
              <button className="close-btn" onClick={() => setEditingOrder(null)}>
                <Icons.Close />
              </button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input 
                    type="text" 
                    value={editingOrder.customer} 
                    onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input 
                    type="number" 
                    value={editingOrder.amount} 
                    onChange={(e) => setEditingOrder({ ...editingOrder, amount: Number(e.target.value) })} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Order Status</label>
                  <select 
                    value={editingOrder.status} 
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                  >
                    <option value="Delivered">Delivered</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Status</label>
                  <select 
                    value={editingOrder.payment} 
                    onChange={(e) => setEditingOrder({ ...editingOrder, payment: e.target.value })}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setEditingOrder(null)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;