import React, { useState, useRef, useEffect, useMemo } from 'react';
import './Customers.css';
import API from "../../api/axios";

const Customers = () => {
  // State for dynamic backend data
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [groupFilter, setGroupFilter] = useState('All Groups');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCustomersCount, setTotalCustomersCount] = useState(0);
  const itemsPerPage = 10;

  // Dropdown open states
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Actions menu per row ID
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Selected Customer for Drawer
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Add Customer Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', group: 'Regular' });

  // Edit Customer Modal / State
  const [editingCustomer, setEditingCustomer] = useState(null);

  const groupRef = useRef(null);
  const filterRef = useRef(null);
  const exportRef = useRef(null);

  // Fetch Customers from Backend API
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get('/customers', {
        params: {
          search: searchTerm,
          group: groupFilter,
          status: statusFilter,
          page: currentPage,
          limit: itemsPerPage
        }
      });

      if (response.data && response.data.success) {
        setCustomers(response.data.data);
        setTotalPages(response.data.totalPages || 1);
        setTotalCustomersCount(response.data.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch customers:', err);
      setError('Unable to load customer records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, groupFilter, statusFilter, currentPage]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (groupRef.current && !groupRef.current.contains(e.target)) setIsGroupOpen(false);
      if (filterRef.current && !filterRef.current.contains(e.target)) setIsFilterOpen(false);
      if (exportRef.current && !exportRef.current.contains(e.target)) setIsExportOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Dynamic AOV Calculation for overall metric card
  const overallAvgOrderValue = useMemo(() => {
    if (!customers || customers.length === 0) return 0;
    
    let grandTotalSpent = 0;
    let grandTotalOrders = 0;

    customers.forEach((c) => {
      const spent = typeof c.totalSpent === 'number' ? c.totalSpent : parseFloat(c.totalSpent) || 0;
      const orders = Number(c.totalOrders) || 0;
      grandTotalSpent += spent;
      grandTotalOrders += orders;
    });

    return grandTotalOrders > 0 ? grandTotalSpent / grandTotalOrders : 0;
  }, [customers]);

  // Dynamic AOV Calculation for selected drawer customer
  const getCustomerAvgOrderValue = (customer) => {
    if (!customer) return 0;
    const spent = typeof customer.totalSpent === 'number' ? customer.totalSpent : parseFloat(customer.totalSpent) || 0;
    const orders = Number(customer.totalOrders) || 0;
    return orders > 0 ? spent / orders : 0;
  };

  // Toggle Status (Active / Inactive) via Backend API
  const toggleStatus = async (id, currentStatus, e) => {
    if (e) e.stopPropagation();
    const targetStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      const response = await API.put(`/customers/${id}`, { status: targetStatus });
      if (response.data && response.data.success) {
        setCustomers(prev => prev.map(c => c._id === id ? { ...c, status: targetStatus } : c));
        if (selectedCustomer && selectedCustomer._id === id) {
          setSelectedCustomer(prev => ({ ...prev, status: targetStatus }));
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update customer status.');
    }
    setActiveMenuId(null);
  };

  // Add Customer Form Submit Handler
  const handleAddCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/customers', newCustomer);
      if (response.data && response.data.success) {
        setIsAddModalOpen(false);
        setNewCustomer({ name: '', email: '', phone: '', group: 'Regular' });
        fetchCustomers(); // Reload list
      }
    } catch (err) {
      console.error('Failed to create customer:', err);
      alert(err.response?.data?.message || 'Failed to add customer.');
    }
  };

  // Edit Customer Submission Handler
  const handleEditCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`/customers/${editingCustomer._id}`, editingCustomer);
      if (response.data && response.data.success) {
        setEditingCustomer(null);
        if (selectedCustomer && selectedCustomer._id === editingCustomer._id) {
          setSelectedCustomer(response.data.data);
        }
        fetchCustomers();
      }
    } catch (err) {
      console.error('Failed to update customer:', err);
      alert(err.response?.data?.message || 'Failed to update customer details.');
    }
  };

  // Export handler
  const handleExport = (type) => {
    alert(`Exporting customer data as ${type}...`);
    setIsExportOpen(false);
  };

  // Helper formatting methods
  const formatMoney = (val) => {
    const num = typeof val === 'number' ? val : parseFloat(val) || 0;
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'New') return dateStr || 'N/A';
    try {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="customers-container">
      {/* Top Metric Cards */}
      <div className="customers-metrics-grid">
        <div className="customers-metric-card">
          <div className="customers-metric-icon purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="customers-metric-info">
            <span className="customers-metric-title">Total Customers</span>
            <div className="customers-metric-row">
              <h2>{totalCustomersCount}</h2>
              <span className="customers-badge positive">Live Backend</span>
            </div>
          </div>
        </div>

        <div className="customers-metric-card">
          <div className="customers-metric-icon blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          </div>
          <div className="customers-metric-info">
            <span className="customers-metric-title">New This Month</span>
            <div className="customers-metric-row">
              <h2>156</h2>
              <span className="customers-badge positive">↑ 8.7% vs last month</span>
            </div>
          </div>
        </div>

        <div className="customers-metric-card">
          <div className="customers-metric-icon green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
          </div>
          <div className="customers-metric-info">
            <span className="customers-metric-title">Active Customers</span>
            <div className="customers-metric-row">
              <h2>{customers.filter(c => c.status === 'Active').length}</h2>
              <span className="customers-subtext">Active on page</span>
            </div>
          </div>
        </div>

        <div className="customers-metric-card">
          <div className="customers-metric-icon yellow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <div className="customers-metric-info">
            <span className="customers-metric-title">VIP Customers</span>
            <div className="customers-metric-row">
              <h2>{customers.filter(c => c.vip).length}</h2>
              <span className="customers-subtext">VIP Status</span>
            </div>
          </div>
        </div>

        <div className="customers-metric-card">
          <div className="customers-metric-icon teal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </div>
          <div className="customers-metric-info">
            <span className="customers-metric-title">Avg. Order Value</span>
            <div className="customers-metric-row">
              <h2>{formatMoney(overallAvgOrderValue)}</h2>
              <span className="customers-badge positive">Live Calc</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Area with Table & Drawer */}
      <div className={`customers-main-layout ${selectedCustomer ? 'with-drawer' : ''}`}>
        <div className="customers-content-wrapper">
          {/* Toolbar & Filters */}
          <div className="customers-toolbar">
            <div className="customers-search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                placeholder="Search customers by name, email, phone..." 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div className="customers-dropdown-group">
              {/* All Groups Custom Dropdown */}
              <div className="customers-dropdown-container" ref={groupRef}>
                <button className="customers-dropdown-btn" onClick={() => setIsGroupOpen(!isGroupOpen)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                  {groupFilter}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                {isGroupOpen && (
                  <div className="customers-dropdown-menu">
                    <div onClick={() => { setGroupFilter('All Groups'); setIsGroupOpen(false); setCurrentPage(1); }}>All Groups</div>
                    <div onClick={() => { setGroupFilter('VIP Customers'); setIsGroupOpen(false); setCurrentPage(1); }}>VIP Customers</div>
                    <div onClick={() => { setGroupFilter('Regular'); setIsGroupOpen(false); setCurrentPage(1); }}>Regular</div>
                  </div>
                )}
              </div>

              {/* Filter Custom Dropdown */}
              <div className="customers-dropdown-container" ref={filterRef}>
                <button className="customers-dropdown-btn" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  {statusFilter === 'All' ? 'Filter' : `Status: ${statusFilter}`}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                {isFilterOpen && (
                  <div className="customers-dropdown-menu">
                    <div onClick={() => { setStatusFilter('All'); setIsFilterOpen(false); setCurrentPage(1); }}>All Status</div>
                    <div onClick={() => { setStatusFilter('Active'); setIsFilterOpen(false); setCurrentPage(1); }}>Active Status</div>
                    <div onClick={() => { setStatusFilter('Inactive'); setIsFilterOpen(false); setCurrentPage(1); }}>Inactive Status</div>
                  </div>
                )}
              </div>

              {/* Export Custom Dropdown */}
              <div className="customers-dropdown-container" ref={exportRef}>
                <button className="customers-dropdown-btn" onClick={() => setIsExportOpen(!isExportOpen)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Export
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                {isExportOpen && (
                  <div className="customers-dropdown-menu">
                    <div onClick={() => handleExport('CSV')}>Export as CSV</div>
                    <div onClick={() => handleExport('Excel')}>Export as Excel</div>
                    <div onClick={() => handleExport('PDF')}>Export as PDF</div>
                  </div>
                )}
              </div>

              {/* Add Customer Button */}
              <button className="customers-add-btn" onClick={() => setIsAddModalOpen(true)}>
                + Add Customer
              </button>
            </div>
          </div>

          {/* Customers Table */}
          <div className="customers-table-container">
            <table className="customers-table">
              <thead>
                <tr>
                  <th style={{width: '40px'}}><input type="checkbox" /></th>
                  <th>Customer</th>
                  <th>Email / Phone</th>
                  <th>Total Orders</th>
                  <th>Total Spent</th>
                  <th>Status</th>
                  <th>Last Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="no-data">Loading customer data...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" className="no-data" style={{ color: '#e74c3c' }}>{error}</td>
                  </tr>
                ) : customers.length > 0 ? (
                  customers.map((c) => (
                    <tr 
                      key={c._id || c.id} 
                      onClick={() => setSelectedCustomer(c)}
                      className={selectedCustomer?._id === c._id ? 'selected-row' : ''}
                    >
                      <td onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td>
                      <td>
                        <div className="customers-user-cell">
                          <div className="customers-avatar">
                            {c.name ? c.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div className="customers-user-details">
                            <span className="customers-name">
                              {c.name} {c.vip && <span className="vip-badge">VIP</span>}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="customers-contact-cell">
                          <span className="email">{c.email}</span>
                          <span className="phone">{c.phone}</span>
                        </div>
                      </td>
                      <td><strong>{c.totalOrders || 0}</strong></td>
                      <td><strong className="spent">{formatMoney(c.totalSpent)}</strong></td>
                      <td>
                        <span className={`customers-status-badge ${(c.status || 'Active').toLowerCase()}`}>
                          {c.status || 'Active'}
                        </span>
                      </td>
                      <td><span className="date">{formatDate(c.lastOrder || c.createdAt)}</span></td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div className="customers-action-buttons">
                          <button 
                            className="action-icon-btn view" 
                            title="View Details"
                            onClick={() => setSelectedCustomer(c)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                          </button>
                          <button 
                            className="action-icon-btn edit" 
                            title="Edit Customer"
                            onClick={() => { setEditingCustomer(c); setSelectedCustomer(c); }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          </button>
                          <div className="customers-menu-wrapper">
                            <button 
                              className="action-icon-btn more"
                              onClick={() => setActiveMenuId(activeMenuId === c._id ? null : c._id)}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                            {activeMenuId === c._id && (
                              <div className="customers-row-dropdown">
                                <div onClick={(e) => toggleStatus(c._id, c.status, e)}>
                                  Set {c.status === 'Active' ? 'Inactive' : 'Active'}
                                </div>
                                <div onClick={() => { setSelectedCustomer(c); setActiveMenuId(null); }}>
                                  View Full Profile
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">No customers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="customers-pagination-footer">
            <span className="pagination-info">
              Showing page {currentPage} of {totalPages} ({totalCustomersCount} total customers)
            </span>
            <div className="pagination-controls">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="page-arrow">&lt;</button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="page-arrow">&gt;</button>
              <div className="per-page-box">10 / page</div>
            </div>
          </div>
        </div>

        {/* Right Side Customer Drawer */}
        {selectedCustomer && (
          <div className="customers-right-drawer">
            <div className="drawer-header">
              <div className="drawer-user-info">
                <div className="drawer-avatar">
                  {selectedCustomer.name ? selectedCustomer.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="drawer-name-row">
                    <h3>{selectedCustomer.name}</h3>
                    {selectedCustomer.vip && <span className="vip-badge-lg">VIP Customer</span>}
                  </div>
                  <p className="drawer-meta-line">✉ {selectedCustomer.email}</p>
                  <p className="drawer-meta-line">📞 {selectedCustomer.phone}</p>
                </div>
              </div>
              <div className="drawer-top-actions">
                <span className={`drawer-status-badge ${(selectedCustomer.status || 'Active').toLowerCase()}`}>
                  {selectedCustomer.status || 'Active'}
                </span>
                <button className="drawer-close-btn" onClick={() => setSelectedCustomer(null)}>✕</button>
              </div>
            </div>

            <div className="drawer-id-row">
              <span>Customer ID: {selectedCustomer._id ? `CUS-${selectedCustomer._id.slice(-6).toUpperCase()}` : 'N/A'}</span>
              <span>Joined on {formatDate(selectedCustomer.createdAt || selectedCustomer.joined)}</span>
            </div>

            <div className="drawer-metrics-bar">
              <div><strong>{selectedCustomer.totalOrders || 0}</strong><span>Total Orders</span></div>
              <div><strong>{formatMoney(selectedCustomer.totalSpent)}</strong><span>Total Spent</span></div>
              <div><strong>{formatMoney(getCustomerAvgOrderValue(selectedCustomer))}</strong><span>Avg. Order Value</span></div>
              <div><strong>{selectedCustomer.rewards || 0}</strong><span>Reward Points</span></div>
            </div>

            <div className="drawer-tabs">
              <span className="active-tab">Overview</span>
              <span>Orders ({selectedCustomer.totalOrders || 0})</span>
              <span>Addresses</span>
            </div>

            <div className="drawer-body-grid">
              <div className="drawer-panel">
                <div className="panel-title-row">
                  <h4>Personal Information</h4>
                  <span className="edit-link" onClick={() => setEditingCustomer(selectedCustomer)}>Edit</span>
                </div>
                <div className="info-grid">
                  <div><span>Full Name</span><strong>{selectedCustomer.name}</strong></div>
                  <div><span>Email Address</span><strong>{selectedCustomer.email}</strong></div>
                  <div><span>Phone Number</span><strong>{selectedCustomer.phone}</strong></div>
                  <div><span>Date of Birth</span><strong>{selectedCustomer.dob || 'Not Provided'}</strong></div>
                  <div><span>Gender</span><strong>{selectedCustomer.gender || 'Other'}</strong></div>
                </div>
              </div>

              <div className="drawer-panel">
                <div className="panel-title-row">
                  <h4>Customer Group</h4>
                </div>
                <div className="group-badge-box">
                  👥 {selectedCustomer.group || 'Regular'}
                </div>
                {selectedCustomer.category && selectedCustomer.category.length > 0 && (
                  <>
                    <h4 style={{marginTop: '15px'}}>Preferred Category</h4>
                    <div className="category-tags">
                      {selectedCustomer.category.map((cat, idx) => (
                        <span key={idx} className="cat-tag">{cat}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="drawer-body-grid" style={{marginTop: '15px'}}>
              <div className="drawer-panel">
                <div className="panel-title-row">
                  <h4>Default Address</h4>
                </div>
                <p className="address-text">{selectedCustomer.address || 'Not Provided'}</p>
              </div>
            </div>

            <div className="drawer-footer-actions">
              <button 
                className="drawer-block-btn"
                onClick={(e) => toggleStatus(selectedCustomer._id, selectedCustomer.status, e)}
              >
                🔒 {selectedCustomer.status === 'Active' ? 'Block Customer' : 'Unblock Customer'}
              </button>
              <button className="drawer-email-btn" onClick={() => alert(`Opening email composer for ${selectedCustomer.email}`)}>
                ✉ Send Email
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="customers-modal-overlay">
          <div className="customers-modal">
            <h3>Add New Customer</h3>
            <form onSubmit={handleAddCustomerSubmit}>
              <div className="modal-field">
                <label>Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. John Smith" 
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                />
              </div>
              <div className="modal-field">
                <label>Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="e.g. john@email.com" 
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                />
              </div>
              <div className="modal-field">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. +91 9876543210" 
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                />
              </div>
              <div className="modal-field">
                <label>Customer Group</label>
                <select 
                  value={newCustomer.group}
                  onChange={(e) => setNewCustomer({...newCustomer, group: e.target.value})}
                >
                  <option value="Regular">Regular</option>
                  <option value="VIP Customers">VIP Customers</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <div className="customers-modal-overlay">
          <div className="customers-modal">
            <h3>Edit Customer</h3>
            <form onSubmit={handleEditCustomerSubmit}>
              <div className="modal-field">
                <label>Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={editingCustomer.name || ''}
                  onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                />
              </div>
              <div className="modal-field">
                <label>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={editingCustomer.email || ''}
                  onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                />
              </div>
              <div className="modal-field">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  required 
                  value={editingCustomer.phone || ''}
                  onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                />
              </div>
              <div className="modal-field">
                <label>Customer Group</label>
                <select 
                  value={editingCustomer.group || 'Regular'}
                  onChange={(e) => setEditingCustomer({...editingCustomer, group: e.target.value})}
                >
                  <option value="Regular">Regular</option>
                  <option value="VIP Customers">VIP Customers</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingCustomer(null)}>Cancel</button>
                <button type="submit" className="btn-submit">Update Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;