import React, { useState, useRef, useEffect } from 'react';
import './Customers.css';

const initialCustomers = [
  { id: 1, name: 'John Doe', email: 'john.doe@email.com', phone: '+91 98765 43210', totalOrders: 18, totalSpent: '₹24,850.00', status: 'Active', lastOrder: 'May 28, 2025', vip: true, group: 'VIP Customers', joined: 'May 10, 2024', dob: '15 Aug 1990', gender: 'Male', address: '221B Baker Street, London, UK, NW1 6XE', rewards: 14, category: ['Dark Chocolate', 'Honey'] },
  { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 91234 56789', totalOrders: 12, totalSpent: '₹18,650.00', status: 'Active', lastOrder: 'May 27, 2025', vip: true, group: 'VIP Customers', joined: 'Jan 12, 2024', dob: '22 Feb 1992', gender: 'Female', address: '12 Park Street, Mumbai, India', rewards: 9, category: ['Organic Tea'] },
  { id: 3, name: 'Rahul Verma', email: 'rahul.verma@email.com', phone: '+91 99887 66554', totalOrders: 8, totalSpent: '₹9,450.00', status: 'Active', lastOrder: 'May 26, 2025', vip: false, group: 'Regular', joined: 'Mar 05, 2024', dob: '10 Jul 1995', gender: 'Male', address: '45 MG Road, Bangalore, India', rewards: 4, category: ['Coffee Beans'] },
  { id: 4, name: 'Anita Patel', email: 'anita.patel@email.com', phone: '+91 98701 23456', totalOrders: 15, totalSpent: '₹21,230.00', status: 'Active', lastOrder: 'May 25, 2025', vip: false, group: 'Regular', joined: 'Feb 18, 2024', dob: '05 Dec 1988', gender: 'Female', address: '78 Ashram Road, Ahmedabad, India', rewards: 11, category: ['Spices'] },
  { id: 5, name: 'Vikash Kumar', email: 'vikash.kumar@email.com', phone: '+91 91234 00011', totalOrders: 5, totalSpent: '₹6,780.00', status: 'Inactive', lastOrder: 'May 20, 2025', vip: false, group: 'Regular', joined: 'Apr 20, 2024', dob: '14 Nov 1993', gender: 'Male', address: '90 Boring Road, Patna, India', rewards: 2, category: ['Snacks'] },
  { id: 6, name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '+91 90000 11122', totalOrders: 9, totalSpent: '₹11,350.00', status: 'Active', lastOrder: 'May 19, 2025', vip: false, group: 'Regular', joined: 'May 01, 2024', dob: '30 Jan 1994', gender: 'Female', address: '56 Banjara Hills, Hyderabad, India', rewards: 6, category: ['Skincare'] },
  { id: 7, name: 'Amit Kumar', email: 'amit.kumar@email.com', phone: '+91 90000 22233', totalOrders: 7, totalSpent: '₹7,890.00', status: 'Active', lastOrder: 'May 18, 2025', vip: false, group: 'Regular', joined: 'Jun 11, 2024', dob: '12 Sep 1991', gender: 'Male', address: '12 Civil Lines, Delhi, India', rewards: 3, category: ['Books'] },
  { id: 8, name: 'Kavita Singh', email: 'kavita.singh@email.com', phone: '+91 90000 33344', totalOrders: 11, totalSpent: '₹15,600.00', status: 'Active', lastOrder: 'May 17, 2025', vip: false, group: 'Regular', joined: 'Jul 22, 2024', dob: '03 Oct 1990', gender: 'Female', address: '89 Mall Road, Kanpur, India', rewards: 8, category: ['Apparel'] },
  { id: 9, name: 'Siddharth Roy', email: 'siddharth.roy@email.com', phone: '+91 90000 44455', totalOrders: 4, totalSpent: '₹4,200.00', status: 'Active', lastOrder: 'May 15, 2025', vip: false, group: 'Regular', joined: 'Aug 14, 2024', dob: '19 Jun 1996', gender: 'Male', address: '10 Park Street, Kolkata, India', rewards: 1, category: ['Electronics'] },
  { id: 10, name: 'Neha Gupta', email: 'neha.gupta@email.com', phone: '+91 90000 55566', totalOrders: 14, totalSpent: '₹19,400.00', status: 'Active', lastOrder: 'May 12, 2025', vip: true, group: 'VIP Customers', joined: 'Sep 09, 2024', dob: '25 Mar 1989', gender: 'Female', address: '34 Civil Lines, Jaipur, India', rewards: 12, category: ['Home Decor'] },
  { id: 11, name: 'Manoj Bajpayee', email: 'manoj.b@email.com', phone: '+91 90000 66677', totalOrders: 3, totalSpent: '₹3,100.00', status: 'Inactive', lastOrder: 'Apr 30, 2025', vip: false, group: 'Regular', joined: 'Oct 01, 2024', dob: '11 Apr 1985', gender: 'Male', address: '77 Gomti Nagar, Lucknow, India', rewards: 0, category: ['Groceries'] }
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupFilter, setGroupFilter] = useState('All Groups');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
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

  // Filter & Search logic
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);

    const matchesGroup = 
      groupFilter === 'All Groups' || c.group === groupFilter;

    const matchesStatus = 
      statusFilter === 'All' || c.status === statusFilter;

    return matchesSearch && matchesGroup && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Toggle Status (Active / Inactive)
  const toggleStatus = (id, e) => {
    e.stopPropagation();
    setCustomers(customers.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c));
    setActiveMenuId(null);
    if (selectedCustomer && selectedCustomer.id === id) {
      setSelectedCustomer(prev => ({ ...prev, status: prev.status === 'Active' ? 'Inactive' : 'Active' }));
    }
  };

  // Add Customer Handler
  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: customers.length + 1,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      totalOrders: 0,
      totalSpent: '₹0.00',
      status: 'Active',
      lastOrder: 'New',
      vip: newCustomer.group === 'VIP Customers',
      group: newCustomer.group,
      joined: 'Just now',
      dob: '01 Jan 2000',
      gender: 'Other',
      address: 'Not Provided',
      rewards: 0,
      category: ['General']
    };
    setCustomers([created, ...customers]);
    setIsAddModalOpen(false);
    setNewCustomer({ name: '', email: '', phone: '', group: 'Regular' });
  };

  // Export handler
  const handleExport = (type) => {
    alert(`Exporting customer data as ${type}...`);
    setIsExportOpen(false);
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
              <h2>2,845</h2>
              <span className="customers-badge positive">↑ 11.2% vs last month</span>
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
              <h2>2,354</h2>
              <span className="customers-subtext">82.7% of total</span>
            </div>
          </div>
        </div>

        <div className="customers-metric-card">
          <div className="customers-metric-icon yellow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <div className="customers-metric-info">
            <span className="customers-metric-title">Repeat Customers</span>
            <div className="customers-metric-row">
              <h2>1,678</h2>
              <span className="customers-subtext">59.0% of total</span>
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
              <h2>₹678.57</h2>
              <span className="customers-badge positive">↑ 6.4% vs last month</span>
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
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((c) => (
                    <tr 
                      key={c.id} 
                      onClick={() => setSelectedCustomer(c)}
                      className={selectedCustomer?.id === c.id ? 'selected-row' : ''}
                    >
                      <td onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td>
                      <td>
                        <div className="customers-user-cell">
                          <div className="customers-avatar">
                            {c.name.charAt(0)}
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
                      <td><strong>{c.totalOrders}</strong></td>
                      <td><strong className="spent">{c.totalSpent}</strong></td>
                      <td>
                        <span className={`customers-status-badge ${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>
                      <td><span className="date">{c.lastOrder}</span></td>
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
                              onClick={() => setActiveMenuId(activeMenuId === c.id ? null : c.id)}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                            {activeMenuId === c.id && (
                              <div className="customers-row-dropdown">
                                <div onClick={(e) => toggleStatus(c.id, e)}>
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
              Showing {filteredCustomers.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} customers
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
                <div className="drawer-avatar">{selectedCustomer.name.charAt(0)}</div>
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
                <span className={`drawer-status-badge ${selectedCustomer.status.toLowerCase()}`}>
                  {selectedCustomer.status}
                </span>
                <button className="drawer-close-btn" onClick={() => setSelectedCustomer(null)}>✕</button>
              </div>
            </div>

            <div className="drawer-id-row">
              <span>Customer ID: CUS-2025-{String(selectedCustomer.id).padStart(4, '0')}</span>
              <span>Joined on {selectedCustomer.joined} | 1 Year</span>
            </div>

            <div className="drawer-metrics-bar">
              <div><strong>{selectedCustomer.totalOrders}</strong><span>Total Orders</span></div>
              <div><strong>{selectedCustomer.totalSpent}</strong><span>Total Spent</span></div>
              <div><strong>₹1,380.56</strong><span>Avg. Order Value</span></div>
              <div><strong>{selectedCustomer.rewards}</strong><span>Reward Points</span></div>
            </div>

            <div className="drawer-tabs">
              <span className="active-tab">Overview</span>
              <span>Orders ({selectedCustomer.totalOrders})</span>
              <span>Addresses (2)</span>
              <span>Wishlist (6)</span>
              <span>Notes</span>
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
                  <div><span>Date of Birth</span><strong>{selectedCustomer.dob}</strong></div>
                  <div><span>Gender</span><strong>{selectedCustomer.gender}</strong></div>
                </div>
              </div>

              <div className="drawer-panel">
                <div className="panel-title-row">
                  <h4>Customer Group</h4>
                </div>
                <div className="group-badge-box">
                  👥 {selectedCustomer.group}
                </div>
                <h4 style={{marginTop: '15px'}}>Preferred Category</h4>
                <div className="category-tags">
                  {selectedCustomer.category.map((cat, idx) => (
                    <span key={idx} className="cat-tag">{cat}</span>
                  ))}
                </div>
                <div className="info-grid" style={{marginTop: '15px'}}>
                  <div><span>Registration Source</span><strong>Website</strong></div>
                  <div><span>Marketing Consent</span><strong className="subscribed">✓ Subscribed</strong></div>
                </div>
              </div>
            </div>

            <div className="drawer-body-grid" style={{marginTop: '15px'}}>
              <div className="drawer-panel">
                <div className="panel-title-row">
                  <h4>Default Address</h4>
                  <span className="edit-link">Edit</span>
                </div>
                <p className="address-text">{selectedCustomer.address}</p>
                <button className="add-address-btn">+ Add Address</button>
              </div>

              <div className="drawer-panel">
                <h4>Recent Activity</h4>
                <ul className="activity-list">
                  <li>🟢 Order #ORD-2025-3541 <br/><small>May 28, 2025</small></li>
                  <li>🟢 Earned 120 Reward Points <br/><small>May 28, 2025</small></li>
                  <li>🟢 Newsletter Subscription <br/><small>{selectedCustomer.joined}</small></li>
                </ul>
              </div>
            </div>

            <div className="drawer-footer-actions">
              <button 
                className="drawer-block-btn"
                onClick={(e) => toggleStatus(selectedCustomer.id, e)}
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
    </div>
  );
};

export default Customers;