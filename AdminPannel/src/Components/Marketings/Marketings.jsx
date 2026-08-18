import React, { useState } from 'react';
import './Marketings.css';

const Marketings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [currentCampaign, setCurrentCampaign] = useState({
    id: null,
    name: '',
    type: 'Discount',
    channel: 'Instagram',
    startDate: '',
    endDate: '',
    budget: '',
    audience: 'All Audience',
    description: '',
    status: 'Scheduled'
  });

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Bonanza',
      desc: '20% off on all chocolates',
      type: 'Discount',
      channel: 'Instagram',
      duration: 'May 20, 2025 - Jun 10, 2025',
      budget: '₹5,000',
      reach: '12,450',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'New Product Launch',
      desc: 'Introducing Honey Truffle',
      type: 'Launch',
      channel: 'Facebook',
      duration: 'May 15, 2025 - May 30, 2025',
      budget: '₹3,500',
      reach: '8,230',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Festive Offer',
      desc: 'Flat 25% off on gift boxes',
      type: 'Offer',
      channel: 'Email',
      duration: 'May 01, 2025 - May 15, 2025',
      budget: '₹2,000',
      reach: '6,785',
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      name: "Valentine's Special",
      desc: 'Share love with chocolate',
      type: 'Seasonal',
      channel: 'Website',
      duration: 'Feb 05, 2025 - Feb 14, 2025',
      budget: '₹4,000',
      reach: '9,120',
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      name: 'Referral Program',
      desc: 'Refer & earn rewards',
      type: 'Referral',
      channel: 'All Channels',
      duration: 'Apr 10, 2025 - Apr 30, 2025',
      budget: '₹1,500',
      reach: '4,980',
      status: 'Scheduled',
      thumbnail: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      name: 'Chocolate Day Offer',
      desc: 'Special offer on Chocolate Day',
      type: 'Offer',
      channel: 'Instagram',
      duration: 'Jul 07, 2025 - Jul 09, 2025',
      budget: '₹2,500',
      reach: '—',
      status: 'Scheduled',
      thumbnail: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 7,
      name: 'Winter Warmers',
      desc: 'Warm up with hot chocolates',
      type: 'Seasonal',
      channel: 'Facebook',
      duration: 'Dec 10, 2024 - Dec 31, 2024',
      budget: '₹2,800',
      reach: '3,665',
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=100&auto=format&fit=crop&q=80'
    }
  ]);

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  const handleOpenCreate = () => {
    setModalMode('create');
    setCurrentCampaign({
      id: null,
      name: '',
      type: 'Discount',
      channel: 'Instagram',
      startDate: '',
      endDate: '',
      budget: '',
      audience: 'All Audience',
      description: '',
      status: 'Scheduled'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (camp) => {
    setModalMode('edit');
    setCurrentCampaign(camp);
    setIsModalOpen(true);
  };

  const handleSaveCampaign = (e) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newEntry = {
        id: Date.now(),
        name: currentCampaign.name || 'New Campaign',
        desc: currentCampaign.description || 'Marketing campaign description',
        type: currentCampaign.type,
        channel: currentCampaign.channel,
        duration: `${currentCampaign.startDate || 'May 20, 2025'} - ${currentCampaign.endDate || 'Jun 10, 2025'}`,
        budget: currentCampaign.budget ? `₹${currentCampaign.budget}` : '₹2,000',
        reach: '0',
        status: currentCampaign.status,
        thumbnail: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=80'
      };
      setCampaigns([newEntry, ...campaigns]);
    } else {
      setCampaigns(campaigns.map(c => c.id === currentCampaign.id ? currentCampaign : c));
    }
    setIsModalOpen(false);
  };

  // Filtering Logic
  const filteredCampaigns = campaigns.filter(camp => {
    const matchesSearch = camp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          camp.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || camp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCampaigns.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="marketings-container">

      {/* KPI Cards Row */}
      <section className="marketings-kpi-grid">
        <div className="marketings-kpi-card">
          <div className="marketings-kpi-icon marketings-green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-4.2-4.2"/></svg>
          </div>
          <div className="marketings-kpi-content">
            <span className="marketings-kpi-title">Total Campaigns</span>
            <h3 className="marketings-kpi-value">{campaigns.length}</h3>
            <span className="marketings-kpi-subtitle">All Campaigns</span>
          </div>
        </div>

        <div className="marketings-kpi-card">
          <div className="marketings-kpi-icon marketings-purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          </div>
          <div className="marketings-kpi-content">
            <span className="marketings-kpi-title">Active Campaigns</span>
            <h3 className="marketings-kpi-value">{campaigns.filter(c => c.status === 'Active').length}</h3>
            <span className="marketings-kpi-subtitle">Currently Running</span>
          </div>
        </div>

        <div className="marketings-kpi-card">
          <div className="marketings-kpi-icon marketings-yellow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
          </div>
          <div className="marketings-kpi-content">
            <span className="marketings-kpi-title">Scheduled</span>
            <h3 className="marketings-kpi-value">{campaigns.filter(c => c.status === 'Scheduled').length}</h3>
            <span className="marketings-kpi-subtitle">Upcoming</span>
          </div>
        </div>

        <div className="marketings-kpi-card">
          <div className="marketings-kpi-icon marketings-red">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>
          </div>
          <div className="marketings-kpi-content">
            <span className="marketings-kpi-title">Completed</span>
            <h3 className="marketings-kpi-value">{campaigns.filter(c => c.status === 'Completed').length}</h3>
            <span className="marketings-kpi-subtitle">Finished</span>
          </div>
        </div>

        <div className="marketings-kpi-card">
          <div className="marketings-kpi-icon marketings-blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
          <div className="marketings-kpi-content">
            <span className="marketings-kpi-title">Total Reach</span>
            <h3 className="marketings-kpi-value">45,230</h3>
            <span className="marketings-kpi-subtitle">People Reached</span>
          </div>
        </div>
      </section>

      {/* All Campaigns Section */}
      <section className="marketings-section">
        <div className="marketings-header-action">
          <div className="marketings-title-group">
            <div className="marketings-section-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l18-5v12L3 14v-3z"/></svg>
            </div>
            <div>
              <h2>All Campaigns</h2>
              <p>Manage and track all your marketing campaigns</p>
            </div>
          </div>
          <div className="marketings-action-buttons-group">
            <button className="marketings-btn marketings-btn-outline">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Export</span>
            </button>
            <button className="marketings-btn marketings-btn-primary" onClick={handleOpenCreate}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>New Campaign</span>
            </button>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="marketings-toolbar">
          <div className="marketings-search-input">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="marketings-toolbar-filters">
            <select 
              className="marketings-status-dropdown" 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Scheduled</option>
            </select>
            <button className="marketings-filter-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="marketings-table-wrapper">
          <table className="marketings-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Type</th>
                <th>Channel</th>
                <th>Duration</th>
                <th>Budget</th>
                <th>Reach</th>
                <th>Status</th>
                <th className="marketings-text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((camp) => (
                  <tr key={camp.id}>
                    <td>
                      <div className="marketings-cell-info">
                        <img src={camp.thumbnail} alt={camp.name} className="marketings-thumb" />
                        <div>
                          <div className="marketings-camp-name">{camp.name}</div>
                          <div className="marketings-camp-desc">{camp.desc}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`marketings-badge-type marketings-type-${camp.type.toLowerCase()}`}>
                        {camp.type}
                      </span>
                    </td>
                    <td>
                      <div className="marketings-channel-cell">
                        <span>{camp.channel}</span>
                      </div>
                    </td>
                    <td className="marketings-duration-cell">{camp.duration}</td>
                    <td>{camp.budget}</td>
                    <td>{camp.reach}</td>
                    <td>
                      <span className={`marketings-badge-status marketings-status-${camp.status.toLowerCase()}`}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="marketings-text-right">
                      <div className="marketings-actions-cell">
                        <button className="marketings-action-icon-btn marketings-view" title="View">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button className="marketings-action-icon-btn marketings-edit" title="Edit" onClick={() => handleOpenEdit(camp)}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button className="marketings-action-icon-btn marketings-delete" title="Delete" onClick={() => handleDelete(camp.id)}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="marketings-no-data">No matching campaigns found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="marketings-pagination">
          <div className="marketings-pagination-info">
            Showing {filteredCampaigns.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
          </div>
          <div className="marketings-pagination-controls">
            <button className="marketings-page-nav-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button 
                key={num} 
                className={`marketings-page-num-btn ${currentPage === num ? 'marketings-active' : ''}`} 
                onClick={() => handlePageChange(num)}
              >
                {num}
              </button>
            ))}

            <button className="marketings-page-nav-btn" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <div className="marketings-per-page-select">
              <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup matching design */}
      {isModalOpen && (
        <div className="marketings-modal-overlay">
          <div className="marketings-modal-container">
            <div className="marketings-modal-header">
              <div className="marketings-modal-title-wrap">
                <div className="marketings-kpi-icon marketings-green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l18-5v12L3 14v-3z"/></svg>
                </div>
                <div>
                  <h3>{modalMode === 'create' ? 'Create Campaign' : 'Edit Campaign'}</h3>
                  <p>Configure your marketing campaign details</p>
                </div>
              </div>
              <button className="marketings-close-modal-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSaveCampaign} className="marketings-modal-form">
              <div className="marketings-form-group">
                <label>Campaign Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter campaign name" 
                  value={currentCampaign.name}
                  onChange={(e) => setCurrentCampaign({...currentCampaign, name: e.target.value})}
                  required 
                />
              </div>

              <div className="marketings-form-row-2">
                <div className="marketings-form-group">
                  <label>Campaign Type *</label>
                  <select 
                    value={currentCampaign.type}
                    onChange={(e) => setCurrentCampaign({...currentCampaign, type: e.target.value})}
                  >
                    <option>Discount</option>
                    <option>Launch</option>
                    <option>Offer</option>
                    <option>Seasonal</option>
                    <option>Referral</option>
                  </select>
                </div>
                <div className="marketings-form-group">
                  <label>Channel *</label>
                  <select 
                    value={currentCampaign.channel}
                    onChange={(e) => setCurrentCampaign({...currentCampaign, channel: e.target.value})}
                  >
                    <option>Instagram</option>
                    <option>Facebook</option>
                    <option>Email</option>
                    <option>Website</option>
                    <option>All Channels</option>
                  </select>
                </div>
              </div>

              <div className="marketings-form-row-2">
                <div className="marketings-form-group">
                  <label>Start Date *</label>
                  <div className="marketings-input-with-icon">
                    <input 
                      type="text" 
                      placeholder="Select start date" 
                      value={currentCampaign.startDate}
                      onChange={(e) => setCurrentCampaign({...currentCampaign, startDate: e.target.value})}
                    />
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  </div>
                </div>
                <div className="marketings-form-group">
                  <label>End Date *</label>
                  <div className="marketings-input-with-icon">
                    <input 
                      type="text" 
                      placeholder="Select end date" 
                      value={currentCampaign.endDate}
                      onChange={(e) => setCurrentCampaign({...currentCampaign, endDate: e.target.value})}
                    />
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  </div>
                </div>
              </div>

              <div className="marketings-form-group">
                <label>Budget (₹)</label>
                <input 
                  type="text" 
                  placeholder="Enter budget" 
                  value={currentCampaign.budget}
                  onChange={(e) => setCurrentCampaign({...currentCampaign, budget: e.target.value})}
                />
              </div>

              <div className="marketings-form-group">
                <label>Description</label>
                <textarea 
                  rows="3" 
                  placeholder="Enter campaign description"
                  value={currentCampaign.description}
                  onChange={(e) => setCurrentCampaign({...currentCampaign, description: e.target.value})}
                ></textarea>
              </div>

              <div className="marketings-form-group">
                <label>Banner / Image</label>
                <div className="marketings-dropzone-area">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <span>Click to upload or drag and drop</span>
                  <span className="marketings-dropzone-sub">PNG, JPG, WEBP up to 5MB</span>
                </div>
              </div>

              <div className="marketings-modal-actions">
                <button type="button" className="marketings-btn marketings-btn-outline marketings-reset-btn" onClick={() => setIsModalOpen(false)}>
                  <span>Cancel</span>
                </button>
                <button type="submit" className="marketings-btn marketings-btn-primary marketings-save-btn">
                  <span>Save Campaign</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketings;