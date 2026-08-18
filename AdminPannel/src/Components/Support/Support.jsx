import React, { useState } from 'react';
import { 
  FiHeadphones, FiMail, FiClock, FiCheckCircle, FiActivity, 
  FiDownload, FiPlus, FiSearch, FiFilter, FiEye, FiEdit2, 
  FiTrash2, FiSend, FiPaperclip, FiSmile, FiChevronLeft, 
  FiChevronRight, FiX 
} from 'react-icons/fi';
import './Support.css';

const Support = () => {
  // State for tickets and filtering
  const [tickets, setTickets] = useState([
    { id: '#TK-1001', subject: 'Order not received', customer: 'Rahul Sharma', email: 'rahul@example.com', phone: '+1 987 654 3210', status: 'Open', priority: 'High', updated: 'May 10, 2025, 10:30 AM', created: 'May 10, 2025, 10:30 AM', description: "I have placed an order on May 5, 2025 but haven't received it yet. Please help me with the status.", conversation: [
      { sender: 'customer', text: "I have placed an order on May 5, 2025 but haven't received it yet. Please help me with the status.", time: 'May 10, 10:30 AM' },
      { sender: 'support', text: 'Hi Rahul, we are sorry for the inconvenience. Please allow us some time to check your order status.', time: 'May 10, 10:30 AM' },
      { sender: 'customer', text: 'Sure, please let me know.', time: 'May 10, 10:46 AM' }
    ]},
    { id: '#TK-1002', subject: 'Damaged chocolate box', customer: 'Priya Singh', email: 'priya@example.com', phone: '+1 987 654 3211', status: 'In Progress', priority: 'Medium', updated: 'May 09, 2025, 04:15 PM', created: 'May 09, 2025, 04:15 PM', description: 'The chocolate box I received was completely damaged and melted.', conversation: [
      { sender: 'customer', text: 'The chocolate box I received was completely damaged and melted.', time: 'May 09, 04:15 PM' }
    ]},
    { id: '#TK-1003', subject: 'Refund not received', customer: 'Amit Verma', email: 'amit@example.com', phone: '+1 987 654 3212', status: 'Open', priority: 'High', updated: 'May 09, 2025, 11:20 AM', created: 'May 09, 2025, 11:20 AM', description: 'My refund for returned item has not been credited yet.', conversation: [
      { sender: 'customer', text: 'My refund for returned item has not been credited yet.', time: 'May 09, 11:20 AM' }
    ]},
    { id: '#TK-1004', subject: 'Change in delivery address', customer: 'Neha Gupta', email: 'neha@example.com', phone: '+1 987 654 3213', status: 'Resolved', priority: 'Low', updated: 'May 08, 2025, 03:40 PM', created: 'May 08, 2025, 03:40 PM', description: 'Please update my delivery address for order #TK-1004.', conversation: [
      { sender: 'customer', text: 'Please update my delivery address for order #TK-1004.', time: 'May 08, 03:40 PM' },
      { sender: 'support', text: 'Address updated successfully.', time: 'May 08, 04:00 PM' }
    ]},
    { id: '#TK-1005', subject: 'Product not as described', customer: 'Sneha Patel', email: 'sneha@example.com', phone: '+1 987 654 3214', status: 'In Progress', priority: 'Medium', updated: 'May 08, 2025, 09:10 AM', created: 'May 08, 2025, 09:10 AM', description: 'The color of the dress is different from what was shown online.', conversation: [
      { sender: 'customer', text: 'The color of the dress is different from what was shown online.', time: 'May 08, 09:10 AM' }
    ]},
    { id: '#TK-1006', subject: 'Payment failed but amount deducted', customer: 'Vikash Kumar', email: 'vikash@example.com', phone: '+1 987 654 3215', status: 'Open', priority: 'High', updated: 'May 07, 2025, 06:25 PM', created: 'May 07, 2025, 06:25 PM', description: 'Money was debited from my bank account but order was not placed.', conversation: [
      { sender: 'customer', text: 'Money was debited from my bank account but order was not placed.', time: 'May 07, 06:25 PM' }
    ]},
    { id: '#TK-1007', subject: 'How to track my order?', customer: 'Anjali Mehta', email: 'anjali@example.com', phone: '+1 987 654 3216', status: 'Resolved', priority: 'Low', updated: 'May 07, 2025, 02:50 PM', created: 'May 07, 2025, 02:50 PM', description: 'I want to know the tracking link for my recent purchase.', conversation: [
      { sender: 'customer', text: 'I want to know the tracking link for my recent purchase.', time: 'May 07, 02:50 PM' }
    ]},
    { id: '#TK-1008', subject: 'Need help with coupon', customer: 'Rohit Das', email: 'rohit@example.com', phone: '+1 987 654 3217', status: 'Closed', priority: 'Low', updated: 'May 06, 2025, 01:15 PM', created: 'May 06, 2025, 01:15 PM', description: 'The welcome coupon code is not applying on checkout.', conversation: [
      { sender: 'customer', text: 'The welcome coupon code is not applying on checkout.', time: 'May 06, 01:15 PM' },
      { sender: 'support', text: 'Coupon code has expired, please use WELCOME10.', time: 'May 06, 01:30 PM' }
    ]}
  ]);

  const [activeTab, setActiveTab] = useState('All Tickets');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [replyText, setReplyText] = useState('');
  
  // Modal states
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [actionMenuId, setActionMenuId] = useState(null);

  // New Ticket Form State
  const [newSubject, setNewSubject] = useState('');
  const [newCustomer, setNewCustomer] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newStatus, setNewStatus] = useState('Open');
  const [newDescription, setNewDescription] = useState('');

  // Edit Ticket Form State
  const [editTicketData, setEditTicketData] = useState(null);

  // Filter tickets based on tab and search
  const filteredTickets = tickets.filter(ticket => {
    const matchesTab = activeTab === 'All Tickets' || ticket.status === activeTab;
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Handle Send Reply
  const handleSendReply = () => {
    if (!replyText.trim()) return;
    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        const newConv = [...t.conversation, { sender: 'support', text: replyText, time: 'Just now' }];
        const updatedT = { ...t, conversation: newConv };
        setSelectedTicket(updatedT);
        return updatedT;
      }
      return t;
    });
    setTickets(updatedTickets);
    setReplyText('');
  };

  // Handle Create New Ticket
  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newId = `#TK-100${tickets.length + 1}`;
    const newEntry = {
      id: newId,
      subject: newSubject || 'New Support Request',
      customer: newCustomer || 'Anonymous User',
      email: newEmail || 'user@example.com',
      phone: newPhone || '+1 000 000 0000',
      status: newStatus,
      priority: newPriority,
      updated: 'Just now',
      created: 'Just now',
      description: newDescription || 'No description provided.',
      conversation: [
        { sender: 'customer', text: newDescription || 'No description provided.', time: 'Just now' }
      ]
    };
    setTickets([newEntry, ...tickets]);
    setSelectedTicket(newEntry);
    setIsNewTicketOpen(false);
    // Reset form
    setNewSubject('');
    setNewCustomer('');
    setNewEmail('');
    setNewPhone('');
    setNewPriority('Medium');
    setNewStatus('Open');
    setNewDescription('');
  };

  // Handle Delete Ticket
  const handleDeleteTicket = (id, e) => {
    e.stopPropagation();
    const remaining = tickets.filter(t => t.id !== id);
    setTickets(remaining);
    if (selectedTicket?.id === id) {
      setSelectedTicket(remaining[0] || null);
    }
    setActionMenuId(null);
  };

  // Handle Edit Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTickets = tickets.map(t => {
      if (t.id === editTicketData.id) {
        setSelectedTicket(editTicketData);
        return editTicketData;
      }
      return t;
    });
    setTickets(updatedTickets);
    setIsEditModalOpen(false);
    setActionMenuId(null);
  };

  return (
    <div className="Support-container">
      {/* Top Header */}
      <div className="Support-header-wrapper">
        <div className="Support-title-group">
          <h1 className="Support-main-title">Support Tickets</h1>
          <p className="Support-subtitle">Manage customer support requests and provide quick solutions</p>
        </div>
        <div className="Support-header-actions">
          <button className="Support-btn Support-btn-export">
            <FiDownload /> Export Tickets
          </button>
          <button className="Support-btn Support-btn-primary" onClick={() => setIsNewTicketOpen(true)}>
            <FiPlus /> New Ticket
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="Support-metrics-grid">
        <div className="Support-metric-card">
          <div className="Support-metric-info">
            <span className="Support-metric-title">Total Tickets</span>
            <h2 className="Support-metric-value">423</h2>
            <span className="Support-metric-trend Support-trend-up">▲ 12.5% vs last 30 days</span>
          </div>
          <div className="Support-metric-icon Support-icon-green">
            <FiHeadphones />
          </div>
        </div>

        <div className="Support-metric-card">
          <div className="Support-metric-info">
            <span className="Support-metric-title">Open Tickets</span>
            <h2 className="Support-metric-value">28</h2>
            <span className="Support-metric-trend Support-trend-up">▲ 5.3% vs last 30 days</span>
          </div>
          <div className="Support-metric-icon Support-icon-yellow">
            <FiMail />
          </div>
        </div>

        <div className="Support-metric-card">
          <div className="Support-metric-info">
            <span className="Support-metric-title">In Progress</span>
            <h2 className="Support-metric-value">14</h2>
            <span className="Support-metric-trend Support-trend-up">▲ 3.2% vs last 30 days</span>
          </div>
          <div className="Support-metric-icon Support-icon-blue">
            <FiClock />
          </div>
        </div>

        <div className="Support-metric-card">
          <div className="Support-metric-info">
            <span className="Support-metric-title">Resolved Tickets</span>
            <h2 className="Support-metric-value">381</h2>
            <span className="Support-metric-trend Support-trend-up">▲ 18.7% vs last 30 days</span>
          </div>
          <div className="Support-metric-icon Support-icon-success">
            <FiCheckCircle />
          </div>
        </div>

        <div className="Support-metric-card">
          <div className="Support-metric-info">
            <span className="Support-metric-title">Avg. Response Time</span>
            <h2 className="Support-metric-value">2h 45m</h2>
            <span className="Support-metric-trend Support-trend-down">▼ 8.6% vs last 30 days</span>
          </div>
          <div className="Support-metric-icon Support-icon-purple">
            <FiActivity />
          </div>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="Support-workspace">
        {/* Left Section: Ticket Table & Filters */}
        <div className="Support-table-section">
          {/* Navigation Tabs & Search */}
          <div className="Support-filter-bar">
            <div className="Support-tabs">
              {['All Tickets', 'Open', 'In Progress', 'Resolved', 'Closed'].map((tab) => (
                <button
                  key={tab}
                  className={`Support-tab ${activeTab === tab ? 'Support-tab-active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="Support-search-filter-group">
              <div className="Support-search-box">
                <FiSearch className="Support-search-icon" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="Support-filter-btn">
                <FiFilter /> Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="Support-table-responsive">
            <table className="Support-tickets-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>TICKET ID</th>
                  <th>SUBJECT</th>
                  <th>CUSTOMER</th>
                  <th>STATUS</th>
                  <th>PRIORITY</th>
                  <th>UPDATED</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr 
                      key={ticket.id} 
                      className={selectedTicket?.id === ticket.id ? 'Support-row-selected' : ''}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <td onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td>
                      <td className="Support-ticket-id">{ticket.id}</td>
                      <td className="Support-ticket-subject">{ticket.subject}</td>
                      <td>
                        <div className="Support-table-customer">
                          <span className="Support-cust-name">{ticket.customer}</span>
                          <span className="Support-cust-email">{ticket.email}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`Support-badge Support-status-${ticket.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td>
                        <span className={`Support-badge Support-priority-${ticket.priority.toLowerCase()}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="Support-ticket-updated">{ticket.updated}</td>
                      <td className="Support-action-cell" onClick={(e) => e.stopPropagation()}>
                        <div className="Support-action-wrapper">
                          <button 
                            className="Support-action-icon-btn" 
                            onClick={() => setSelectedTicket(ticket)}
                            title="View"
                          >
                            <FiEye />
                          </button>
                          <button 
                            className="Support-action-icon-btn" 
                            onClick={() => {
                              setEditTicketData(ticket);
                              setIsEditModalOpen(true);
                            }}
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            className="Support-action-icon-btn Support-delete-btn" 
                            onClick={(e) => handleDeleteTicket(ticket.id, e)}
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="Support-no-tickets">No tickets found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="Support-pagination-bar">
            <span className="Support-pagination-info">Showing 1 to {filteredTickets.length} of 423 tickets</span>
            <div className="Support-pagination-controls">
              <button className="Support-page-btn"><FiChevronLeft /></button>
              <button className="Support-page-btn Support-page-active">1</button>
              <button className="Support-page-btn">2</button>
              <button className="Support-page-btn">3</button>
              <button className="Support-page-btn">4</button>
              <button className="Support-page-btn">5</button>
              <span className="Support-page-dots">...</span>
              <button className="Support-page-btn">53</button>
              <button className="Support-page-btn"><FiChevronRight /></button>
            </div>
          </div>
        </div>

        {/* Right Section: Ticket Details Drawer/Panel */}
        {selectedTicket ? (
          <div className="Support-details-section">
            <div className="Support-details-header">
              <h3 className="Support-details-title">Ticket Details</h3>
              <span className={`Support-badge Support-status-${selectedTicket.status.toLowerCase().replace(/\s+/g, '-')}`}>
                ● {selectedTicket.status}
              </span>
            </div>

            <div className="Support-details-meta-grid">
              <div>
                <span className="Support-meta-label">Ticket ID</span>
                <p className="Support-meta-value Support-highlight">{selectedTicket.id}</p>
              </div>
              <div>
                <span className="Support-meta-label">Priority</span>
                <p><span className={`Support-badge Support-priority-${selectedTicket.priority.toLowerCase()}`}>{selectedTicket.priority}</span></p>
              </div>
              <div>
                <span className="Support-meta-label">Created On</span>
                <p className="Support-meta-value">{selectedTicket.created}</p>
              </div>
            </div>

            <div className="Support-details-block">
              <span className="Support-meta-label">Subject</span>
              <p className="Support-subject-text">{selectedTicket.subject}</p>
            </div>

            <div className="Support-details-block">
              <span className="Support-meta-label">Customer</span>
              <div className="Support-customer-card-info">
                <div className="Support-customer-avatar-placeholder">
                  {selectedTicket.customer.charAt(0)}
                </div>
                <div className="Support-customer-details-text">
                  <strong>{selectedTicket.customer}</strong>
                  <span>{selectedTicket.email}</span>
                </div>
                <div className="Support-customer-phone">{selectedTicket.phone}</div>
              </div>
            </div>

            <div className="Support-details-block">
              <span className="Support-meta-label">Description</span>
              <p className="Support-desc-text">{selectedTicket.description}</p>
            </div>

            <div className="Support-conversation-wrapper">
              <span className="Support-meta-label">Conversation</span>
              <div className="Support-conversation-list">
                {selectedTicket.conversation.map((conv, idx) => (
                  <div key={idx} className={`Support-chat-bubble-row ${conv.sender === 'support' ? 'Support-row-support' : 'Support-row-customer'}`}>
                    {conv.sender === 'support' && (
                      <div className="Support-chat-avatar Support-avatar-support"><FiHeadphones /></div>
                    )}
                    <div className={`Support-chat-bubble ${conv.sender === 'support' ? 'Support-bubble-support' : 'Support-bubble-customer'}`}>
                      <p>{conv.text}</p>
                      <span className="Support-chat-time">{conv.time}</span>
                    </div>
                    {conv.sender === 'customer' && (
                      <div className="Support-chat-avatar Support-avatar-customer">{selectedTicket.customer.charAt(0)}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reply Box */}
            <div className="Support-reply-box-container">
              <textarea
                className="Support-reply-textarea"
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="Support-reply-actions-bar">
                <div className="Support-reply-tools">
                  <button className="Support-tool-icon-btn"><FiPaperclip /></button>
                  <button className="Support-tool-icon-btn"><FiSmile /></button>
                </div>
                <button className="Support-btn Support-btn-primary Support-send-btn" onClick={handleSendReply}>
                  <FiSend /> Send Reply
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="Support-details-section Support-no-selection">
            <p>Select a ticket to view details</p>
          </div>
        )}
      </div>

      {/* New Ticket Popup Modal */}
      {isNewTicketOpen && (
        <div className="Support-modal-overlay">
          <div className="Support-modal-content">
            <div className="Support-modal-header">
              <h2>Create New Support Ticket</h2>
              <button className="Support-modal-close" onClick={() => setIsNewTicketOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateTicket} className="Support-modal-form">
              <div className="Support-form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g. Issue with billing" 
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  required 
                />
              </div>
              <div className="Support-form-row">
                <div className="Support-form-group">
                  <label>Customer Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Doe" 
                    value={newCustomer}
                    onChange={(e) => setNewCustomer(e.target.value)}
                    required 
                  />
                </div>
                <div className="Support-form-group">
                  <label>Customer Email</label>
                  <input 
                    type="email" 
                    placeholder="e.g. john@example.com" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="Support-form-row">
                <div className="Support-form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. +1 987 654 3210" 
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                  />
                </div>
                <div className="Support-form-group">
                  <label>Priority</label>
                  <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="Support-form-row">
                <div className="Support-form-group">
                  <label>Status</label>
                  <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="Support-form-group">
                <label>Description / Message</label>
                <textarea 
                  placeholder="Describe the issue in detail..." 
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows="4"
                  required
                />
              </div>
              <div className="Support-modal-footer">
                <button type="button" className="Support-btn Support-btn-secondary" onClick={() => setIsNewTicketOpen(false)}>Cancel</button>
                <button type="submit" className="Support-btn Support-btn-primary">Create Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Ticket Popup Modal */}
      {isEditModalOpen && editTicketData && (
        <div className="Support-modal-overlay">
          <div className="Support-modal-content">
            <div className="Support-modal-header">
              <h2>Edit Ticket ({editTicketData.id})</h2>
              <button className="Support-modal-close" onClick={() => setIsEditModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleEditSubmit} className="Support-modal-form">
              <div className="Support-form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  value={editTicketData.subject}
                  onChange={(e) => setEditTicketData({...editTicketData, subject: e.target.value})}
                  required 
                />
              </div>
              <div className="Support-form-row">
                <div className="Support-form-group">
                  <label>Customer Name</label>
                  <input 
                    type="text" 
                    value={editTicketData.customer}
                    onChange={(e) => setEditTicketData({...editTicketData, customer: e.target.value})}
                    required 
                  />
                </div>
                <div className="Support-form-group">
                  <label>Customer Email</label>
                  <input 
                    type="email" 
                    value={editTicketData.email}
                    onChange={(e) => setEditTicketData({...editTicketData, email: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div className="Support-form-row">
                <div className="Support-form-group">
                  <label>Priority</label>
                  <select 
                    value={editTicketData.priority} 
                    onChange={(e) => setEditTicketData({...editTicketData, priority: e.target.value})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="Support-form-group">
                  <label>Status</label>
                  <select 
                    value={editTicketData.status} 
                    onChange={(e) => setEditTicketData({...editTicketData, status: e.target.value})}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="Support-form-group">
                <label>Description</label>
                <textarea 
                  value={editTicketData.description}
                  onChange={(e) => setEditTicketData({...editTicketData, description: e.target.value})}
                  rows="4"
                  required
                />
              </div>
              <div className="Support-modal-footer">
                <button type="button" className="Support-btn Support-btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="Support-btn Support-btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;