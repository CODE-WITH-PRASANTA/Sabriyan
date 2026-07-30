import React, { useState, useMemo } from 'react';
import { 
  Search, Calendar, Bell, ChevronLeft, ChevronRight, 
  Eye, Edit2, Trash2, Clock, FileText, 
  IndianRupee, ArrowUpRight, ArrowDownRight, Paperclip, Plus, RefreshCw, X, Filter
} from 'lucide-react';
import './RefundManagement.css';

const INITIAL_DATA = [
  { id: '#REF-2025-0023', orderId: '#ORD-2025-3561', orderDate: 'May 29, 2025', customer: 'Rohit Sharma', email: 'rohit@gmail.com', phone: '+91 98765 43210', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', amount: '₹1,299', rawAmount: 1299, reason: 'Product not as described', description: 'The taste and quality is not what I expected. Please process my refund.', method: 'UPI', subMethod: 'PhonePe', status: 'Pending', statusSub: 'Awaiting review', requestedOn: 'May 29, 2025, 10:30 AM', item: 'Dark Classic 55% Cocoa', itemDetails: '200g | Dark Chocolate', qty: 1 },
  { id: '#REF-2025-0022', orderId: '#ORD-2025-3560', orderDate: 'May 29, 2025', customer: 'Anjali Mehta', email: 'anjali@gmail.com', phone: '+91 98765 43211', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', amount: '₹549', rawAmount: 549, reason: 'Changed my mind', description: 'Ordered by mistake.', method: 'UPI', subMethod: 'Google Pay', status: 'Approved', statusSub: 'Refund initiated', requestedOn: 'May 29, 2025, 09:15 AM', item: 'Milk Truffle Collection', itemDetails: '150g | Artisan Chocolate', qty: 1 },
  { id: '#REF-2025-0021', orderId: '#ORD-2025-3559', orderDate: 'May 28, 2025', customer: 'Vikram Singh', email: 'vikram@gmail.com', phone: '+91 98765 43212', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', amount: '₹1,749', rawAmount: 1749, reason: 'Damaged product', description: 'Box arrived crushed and melted.', method: 'Credit Card', subMethod: 'HDFC Bank', status: 'Approved', statusSub: 'Refund completed', requestedOn: 'May 28, 2025, 08:45 PM', item: 'Assorted Gourmet Box', itemDetails: '500g | Luxury Pack', qty: 1 },
  { id: '#REF-2025-0020', orderId: '#ORD-2025-3558', orderDate: 'May 28, 2025', customer: 'Neha Verma', email: 'neha@gmail.com', phone: '+91 98765 43213', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80', amount: '₹499', rawAmount: 499, reason: 'Received wrong item', description: 'Received white chocolate instead of dark.', method: 'UPI', subMethod: 'Paytm', status: 'Rejected', statusSub: 'Not eligible', requestedOn: 'May 28, 2025, 07:20 PM', item: 'White Caramel Bliss', itemDetails: '100g | Bar', qty: 1 },
  { id: '#REF-2025-0019', orderId: '#ORD-2025-3557', orderDate: 'May 29, 2025', customer: 'Arjun Patel', email: 'arjun@gmail.com', phone: '+91 98765 43214', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', amount: '₹1,199', rawAmount: 1199, reason: 'Order cancelled', description: 'Cancelled order prior to dispatch.', method: 'COD', subMethod: 'Cash on Delivery', status: 'Approved', statusSub: 'Refund completed', requestedOn: 'May 28, 2025, 06:10 PM', item: 'Hazelnut Crunch', itemDetails: '250g | Premium', qty: 1 },
  { id: '#REF-2025-0018', orderId: '#ORD-2025-3556', orderDate: 'May 27, 2025', customer: 'Priya Nair', email: 'priya@gmail.com', phone: '+91 98765 43215', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', amount: '₹899', rawAmount: 899, reason: 'Product quality issue', description: 'Texture was bloomed.', method: 'Wallet', subMethod: 'Mobikwik', status: 'Pending', statusSub: 'Awaiting review', requestedOn: 'May 27, 2025, 05:30 PM', item: 'Almond Rochers', itemDetails: '200g | Nut Series', qty: 1 },
  { id: '#REF-2025-0017', orderId: '#ORD-2025-3555', orderDate: 'May 27, 2025', customer: 'Karan Malhotra', email: 'karan@gmail.com', phone: '+91 98765 43216', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', amount: '₹599', rawAmount: 599, reason: 'Late delivery', description: 'Delivered 4 days past estimated date.', method: 'UPI', subMethod: 'PhonePe', status: 'Rejected', statusSub: 'Delivery completed', requestedOn: 'May 27, 2025, 04:15 PM', item: 'Classic Milk Chocolate', itemDetails: '150g | Standard', qty: 1 },
  { id: '#REF-2025-0016', orderId: '#ORD-2025-3554', orderDate: 'May 27, 2025', customer: 'Simran Kaur', email: 'simran@gmail.com', phone: '+91 98765 43217', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', amount: '₹2,199', rawAmount: 2199, reason: 'Multiple reasons', description: 'Package was leaking and items broken.', method: 'Credit Card', subMethod: 'ICICI Bank', status: 'Approved', statusSub: 'Refund initiated', requestedOn: 'May 27, 2025, 03:50 PM', item: 'Celebration Gift Hamper', itemDetails: '1kg | Gift Pack', qty: 1 },
];

const RefundManagement = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState('All Refunds');
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods');
  const [selectedRefund, setSelectedRefund] = useState(INITIAL_DATA[0]);
  const [notes, setNotes] = useState({});
  const [newNote, setNewNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const stats = useMemo(() => {
    const totalCount = 23;
    const totalAmount = 18560;
    const pending = 8;
    const approved = 12;
    const rejected = 3;

    return [
      { title: 'Total Refund Requests', value: totalCount.toString(), trend: '15.2% vs last month', icon: FileText, trendUp: true },
      { title: 'Total Refunded Amount', value: `₹${totalAmount.toLocaleString('en-IN')}`, trend: '22.7% vs last month', icon: IndianRupee, trendUp: true },
      { title: 'Pending Refunds', value: pending.toString(), trend: 'Awaiting action', icon: Clock },
      { title: 'Approved Refunds', value: approved.toString(), trend: 'This month', icon: RefreshCw },
      { title: 'Rejected Refunds', value: rejected.toString(), trend: 'This month', icon: X },
      { title: 'Avg. Refund Time', value: '2.4 Days', trend: '8.6% faster', icon: Clock, trendDown: true },
    ];
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesTab = activeTab === 'All Refunds' ? true : item.status === activeTab;
      const matchesSearch = item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPayment = paymentFilter === 'All Payment Methods' ? true : item.method.toLowerCase().includes(paymentFilter.toLowerCase());
      return matchesTab && matchesSearch && matchesPayment;
    });
  }, [data, activeTab, searchTerm, paymentFilter]);

  const handleStatusChange = (id, newStatus) => {
    const updated = data.map(item => item.id === id ? { ...item, status: newStatus } : item);
    setData(updated);
    if (selectedRefund.id === id) {
      setSelectedRefund(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setNotes(prev => ({
      ...prev,
      [selectedRefund.id]: [...(prev[selectedRefund.id] || []), newNote]
    }));
    setNewNote('');
    setShowNoteInput(false);
  };

  const getStatusBadge = (status, subtext) => {
    switch (status) {
      case 'Approved':
        return (
          <div className="status-badge-container">
            <span className="status-badge badge-approved">Approved</span>
            {subtext && <span className="status-subtext">{subtext}</span>}
          </div>
        );
      case 'Rejected':
        return (
          <div className="status-badge-container">
            <span className="status-badge badge-rejected">Rejected</span>
            {subtext && <span className="status-subtext">{subtext}</span>}
          </div>
        );
      default:
        return (
          <div className="status-badge-container">
            <span className="status-badge badge-pending">Pending</span>
            {subtext && <span className="status-subtext">{subtext}</span>}
          </div>
        );
    }
  };

  return (
    <div className="refund-app-wrapper">
      <div className="refund-container">
        
        {/* Header Navigation */}
        <header className="dashboard-header">
          <div className="header-titles">
            <h1 className="header-heading">Refunds Management</h1>
            <nav className="breadcrumb">
              <span>Dashboard</span>
              <span className="breadcrumb-sep">&gt;</span>
              <span>Orders</span>
              <span className="breadcrumb-sep">&gt;</span>
              <span className="breadcrumb-active">Refunds</span>
            </nav>
          </div>
          
          <div className="header-actions">
            <div className="search-bar-wrapper top-search">
              <Search className="search-icon" size={16} />
              <input 
                type="search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Order ID, Customer, Email..." 
                className="search-input"
              />
            </div>

            <div className="user-profile-controls">
              <div className="date-chip">
                <Calendar className="chip-icon" size={14} />
                <span>May 29, 2025</span>
              </div>
              <button className="icon-btn-ghost relative" title="Notifications">
                <Bell size={18} />
                <span className="notification-indicator">12</span>
              </button>
              <div className="avatar-chip">
                <div className="avatar-inner">G</div>
              </div>
            </div>
          </div>
        </header>

        {/* Top Metrics Cards */}
        <section className="metrics-grid">
          {stats.map((stat, index) => {
            const IconComp = stat.icon;
            return (
              <div key={index} className="metric-card">
                <div className="metric-card-top">
                  <div className={`metric-icon-box box-style-${index}`}>
                    <IconComp size={18} />
                  </div>
                </div>
                <div className="metric-card-bottom">
                  <span className="metric-title">{stat.title}</span>
                  <p className="metric-value">{stat.value}</p>
                  <div className={`metric-trend ${stat.trendUp ? 'trend-up' : stat.trendDown ? 'trend-down' : 'trend-neutral'}`}>
                    {stat.trendUp && <ArrowUpRight size={12} />}
                    {stat.trendDown && <ArrowDownRight size={12} />}
                    {stat.trend}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Content Workspace */}
        <div className="workspace-grid">
          
          {/* Main Table Column */}
          <section className="table-column">
            
            {/* Filter Navigation Tabs and Options */}
            <div className="controls-bar">
              <nav className="tabs-navigation">
                {['All Refunds', 'Pending', 'Approved', 'Rejected', 'Completed'].map((tab) => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`tab-btn ${activeTab === tab ? 'tab-active' : ''}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Filter controls row */}
            <div className="table-filter-row">
              <div className="search-bar-wrapper table-search">
                <Search className="search-icon" size={16} />
                <input 
                  type="search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by Order ID, Customer, Email..." 
                  className="search-input"
                />
              </div>

              <div className="filters-group">
                <select className="custom-select">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>

                <select 
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="custom-select"
                >
                  <option value="All Payment Methods">All Payment Methods</option>
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="COD">COD</option>
                  <option value="Wallet">Wallet</option>
                </select>

                <div className="date-picker-box">
                  <span>Start Date &nbsp;&rarr;&nbsp; End Date</span>
                  <Calendar size={14} />
                </div>

                <button className="filter-btn">
                  <Filter size={14} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="table-card">
              <div className="table-wrapper">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Refund ID</th>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Reason</th>
                      <th>Payment Method</th>
                      <th>Status</th>
                      <th>Requested On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((row) => {
                        const isSelected = selectedRefund.id === row.id;
                        return (
                          <tr 
                            key={row.id} 
                            onClick={() => setSelectedRefund(row)}
                            className={`table-row ${isSelected ? 'row-selected' : ''}`}
                          >
                            <td className="font-id-cell">{row.id}</td>
                            <td>
                              <div className="font-order">{row.orderId}</div>
                              <div className="font-subtext">{row.orderDate}</div>
                            </td>
                            <td>
                              <div className="customer-cell">
                                <img src={row.avatar} alt={row.customer} className="customer-avatar" />
                                <div className="customer-meta">
                                  <div className="customer-name">{row.customer}</div>
                                  <div className="font-subtext">{row.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="font-amount">{row.amount}</td>
                            <td>
                              <span className="reason-truncate">{row.reason}</span>
                            </td>
                            <td>
                              <div className="method-title">{row.method}</div>
                              <div className="font-subtext">{row.subMethod}</div>
                            </td>
                            <td>
                              {getStatusBadge(row.status, row.statusSub)}
                            </td>
                            <td>
                              <div className="font-subtext">{row.requestedOn}</div>
                            </td>
                            <td onClick={(e) => e.stopPropagation()}>
                              <div className="action-buttons-group">
                                <button onClick={() => setSelectedRefund(row)} className="action-icon-btn" title="View Details">
                                  <Eye size={14} />
                                </button>
                                <button onClick={() => handleStatusChange(row.id, 'Approved')} className="action-icon-btn" title="Edit">
                                  <Edit2 size={14} />
                                </button>
                                <button onClick={() => handleStatusChange(row.id, 'Rejected')} className="action-icon-btn action-delete" title="Delete">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="9" className="empty-table-state">
                          No refund requests found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <footer className="table-footer">
                <p className="table-footer-text">
                  Showing 1 to {filteredData.length} of {data.length} refunds
                </p>
                <div className="pagination">
                  <button className="page-btn">&laquo;</button>
                  <button className="page-btn page-active">1</button>
                  <button className="page-btn">2</button>
                  <button className="page-btn">3</button>
                  <button className="page-btn">...</button>
                  <button className="page-btn">&raquo;</button>
                </div>
                <div className="rows-per-page">
                  <span>Rows per page:</span>
                  <select className="rows-select">
                    <option>10</option>
                    <option>20</option>
                  </select>
                </div>
              </footer>
            </div>
          </section>

          {/* Details Sidebar Column */}
          <aside className="details-sidebar">
            <div className="sidebar-header">
              <h2 className="sidebar-title">Refund Details</h2>
              <span className={`sidebar-status-tag tag-${selectedRefund.status.toLowerCase()}`}>
                {selectedRefund.status}
              </span>
            </div>

            {/* Product Card */}
            <div className="item-summary-box">
              <div className="item-preview-placeholder">
                <img src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=150&auto=format&fit=crop&q=80" alt="Product" />
              </div>
              <div className="item-info">
                <h4 className="item-title">{selectedRefund.item}</h4>
                <p className="item-subtext">{selectedRefund.itemDetails}</p>
                <div className="item-bottom-row">
                  <span className="item-qty">Qty: {selectedRefund.qty}</span>
                  <span className="item-price">{selectedRefund.amount}</span>
                </div>
              </div>
            </div>

            {/* Details Table List */}
            <div className="details-list">
              <div className="detail-row">
                <span className="detail-label">Refund ID</span>
                <span className="detail-value">{selectedRefund.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Order ID</span>
                <span className="detail-value">{selectedRefund.orderId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Customer</span>
                <span className="detail-value">{selectedRefund.customer}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{selectedRefund.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{selectedRefund.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Method</span>
                <span className="detail-value">{selectedRefund.method} ({selectedRefund.subMethod})</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Refund Amount</span>
                <span className="detail-value highlight-amount">{selectedRefund.amount}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Requested On</span>
                <span className="detail-value">{selectedRefund.requestedOn}</span>
              </div>
              <div className="detail-row block-row">
                <span className="detail-label">Reason</span>
                <span className="detail-value">{selectedRefund.reason}</span>
              </div>
              <div className="detail-row block-row">
                <span className="detail-label">Description</span>
                <p className="description-text">{selectedRefund.description}</p>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="sidebar-section">
              <span className="section-title">Attachments</span>
              <div className="attachments-grid">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="attachment-thumb">
                    <img src={`https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=80`} alt="attachment" />
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Section */}
            <div className="sidebar-section">
              <span className="section-title">Timeline</span>
              <div className="timeline-container">
                <div className="timeline-item">
                  <div className="timeline-dot dot-green"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Refund requested</div>
                    <div className="timeline-time">May 29, 2025, 10:30 AM</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot dot-yellow"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Under review</div>
                    <div className="timeline-time">May 29, 2025, 10:35 AM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Team Notes List */}
            {notes[selectedRefund.id] && notes[selectedRefund.id].length > 0 && (
              <div className="sidebar-section">
                <span className="section-title">Notes</span>
                <div className="notes-list">
                  {notes[selectedRefund.id].map((note, idx) => (
                    <div key={idx} className="note-card">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar Buttons Footer */}
            <div className="sidebar-actions-footer">
              <div className="primary-actions">
                <button 
                  onClick={() => handleStatusChange(selectedRefund.id, 'Approved')}
                  className="btn-approve"
                >
                  Approve Refund
                </button>
                <button 
                  onClick={() => handleStatusChange(selectedRefund.id, 'Rejected')}
                  className="btn-reject"
                >
                  Reject Refund
                </button>
              </div>

              {showNoteInput ? (
                <div className="note-input-container">
                  <textarea 
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Type an internal note..." 
                    className="note-textarea"
                    rows={2}
                    autoFocus
                  />
                  <div className="note-buttons">
                    <button onClick={() => setShowNoteInput(false)} className="btn-cancel">Cancel</button>
                    <button onClick={handleAddNote} className="btn-save-note">Save Note</button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowNoteInput(true)}
                  className="btn-add-note"
                >
                  Add Note
                </button>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default RefundManagement;