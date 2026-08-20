import React, { useState, useEffect } from 'react';
import './Marketings.css';
import API, { IMG_URL } from "../../api/axios";

const Marketings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [currentCampaign, setCurrentCampaign] = useState({
    _id: null,
    name: '',
    desc: '',
    type: 'Discount',
    channel: 'Instagram',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'Scheduled',
    thumbnail: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=80'
  });

  const [campaigns, setCampaigns] = useState([]);

  // Fetch Campaigns on Load
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await API.get('/campaigns');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  // Action handlers
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        const response = await API.delete(`/campaigns/${id}`);
        if (response.status === 200 || response.status === 204) {
          setCampaigns(campaigns.filter(c => c._id !== id));
        }
      } catch (error) {
        console.error('Error deleting campaign:', error);
      }
    }
  };

  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedFile(null);
    setCurrentCampaign({
      _id: null,
      name: '',
      desc: '',
      type: 'Discount',
      channel: 'Instagram',
      startDate: '',
      endDate: '',
      budget: '',
      status: 'Scheduled',
      thumbnail: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=80'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (camp) => {
    setModalMode('edit');
    setSelectedFile(null);
    setCurrentCampaign(camp);
    setIsModalOpen(true);
  };

  const handleOpenView = (camp) => {
    setModalMode('view');
    setSelectedFile(null);
    setCurrentCampaign(camp);
    setIsModalOpen(true);
  };

  const handleSaveCampaign = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', currentCampaign.name);
    formData.append('desc', currentCampaign.desc);
    formData.append('type', currentCampaign.type);
    formData.append('channel', currentCampaign.channel);
    formData.append('startDate', currentCampaign.startDate);
    formData.append('endDate', currentCampaign.endDate);
    formData.append('budget', currentCampaign.budget);
    formData.append('status', currentCampaign.status);
    
    if (selectedFile) {
      formData.append('thumbnail', selectedFile);
    } else {
      formData.append('thumbnail', currentCampaign.thumbnail);
    }

    try {
      if (modalMode === 'create') {
        const response = await API.post('/campaigns', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setCampaigns([response.data, ...campaigns]);
      } else if (modalMode === 'edit') {
        const response = await API.put(`/campaigns/${currentCampaign._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setCampaigns(campaigns.map(c => c._id === response.data._id ? response.data : c));
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  // Export functionality (CSV download)
  const handleExport = () => {
    if (campaigns.length === 0) return;
    const headers = ['ID', 'Name', 'Description', 'Type', 'Channel', 'Start Date', 'End Date', 'Budget', 'Reach', 'Status'];
    const csvRows = [
      headers.join(','),
      ...filteredCampaigns.map(c => [
        c._id,
        `"${c.name || ''}"`,
        `"${c.desc || ''}"`,
        c.type || '',
        c.channel || '',
        `"${c.startDate || ''}"`,
        `"${c.endDate || ''}"`,
        `"${c.budget || ''}"`,
        c.reach || 0,
        c.status || ''
      ].join(','))
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'marketing_campaigns.csv');
    a.click();
  };

  // Filtering Logic
  const filteredCampaigns = campaigns.filter(camp => {
    const matchesSearch = (camp.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                          (camp.desc?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                          (camp.channel?.toLowerCase() || '').includes(searchQuery.toLowerCase());
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

  const totalReachCount = campaigns.reduce((acc, curr) => acc + (parseInt(curr.reach) || 0), 0);

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
            <h3 className="marketings-kpi-value">{totalReachCount.toLocaleString()}</h3>
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
            <button className="marketings-btn marketings-btn-outline" onClick={handleExport}>
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
                  <tr key={camp._id}>
                    <td>
                      <div className="marketings-cell-info">
                        <img 
                          src={camp.thumbnail?.startsWith('http') ? camp.thumbnail : `${IMG_URL}/${camp.thumbnail}`} 
                          alt={camp.name} 
                          className="marketings-thumb" 
                        />
                        <div>
                          <div className="marketings-camp-name">{camp.name}</div>
                          <div className="marketings-camp-desc">{camp.desc}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`marketings-badge-type marketings-type-${(camp.type || '').toLowerCase()}`}>
                        {camp.type}
                      </span>
                    </td>
                    <td>
                      <div className="marketings-channel-cell">
                        <span>{camp.channel}</span>
                      </div>
                    </td>
                    <td className="marketings-duration-cell">{camp.duration || `${camp.startDate} - ${camp.endDate}`}</td>
                    <td>{camp.budget}</td>
                    <td>{camp.reach || 0}</td>
                    <td>
                      <span className={`marketings-badge-status marketings-status-${(camp.status || '').toLowerCase()}`}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="marketings-text-right">
                      <div className="marketings-actions-cell">
                        <button className="marketings-action-icon-btn marketings-view" title="View" onClick={() => handleOpenView(camp)}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button className="marketings-action-icon-btn marketings-edit" title="Edit" onClick={() => handleOpenEdit(camp)}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button className="marketings-action-icon-btn marketings-delete" title="Delete" onClick={() => handleDelete(camp._id)}>
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

      {/* Modal Popup (Create, Edit, View) */}
      {isModalOpen && (
        <div className="marketings-modal-overlay">
          <div className="marketings-modal-container">
            <div className="marketings-modal-header">
              <div className="marketings-modal-title-wrap">
                <div className="marketings-kpi-icon marketings-green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l18-5v12L3 14v-3z"/></svg>
                </div>
                <div>
                  <h3>
                    {modalMode === 'create' && 'Create Campaign'}
                    {modalMode === 'edit' && 'Edit Campaign'}
                    {modalMode === 'view' && 'Campaign Details'}
                  </h3>
                  <p>
                    {modalMode === 'view' ? 'Review campaign metrics and specs' : 'Configure your marketing campaign details'}
                  </p>
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
                  disabled={modalMode === 'view'}
                  required 
                />
              </div>

              <div className="marketings-form-row-2">
                <div className="marketings-form-group">
                  <label>Campaign Type *</label>
                  <select 
                    value={currentCampaign.type}
                    onChange={(e) => setCurrentCampaign({...currentCampaign, type: e.target.value})}
                    disabled={modalMode === 'view'}
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
                    disabled={modalMode === 'view'}
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
                      placeholder="e.g. May 20, 2025" 
                      value={currentCampaign.startDate}
                      onChange={(e) => setCurrentCampaign({...currentCampaign, startDate: e.target.value})}
                      disabled={modalMode === 'view'}
                      required
                    />
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  </div>
                </div>
                <div className="marketings-form-group">
                  <label>End Date *</label>
                  <div className="marketings-input-with-icon">
                    <input 
                      type="text" 
                      placeholder="e.g. Jun 10, 2025" 
                      value={currentCampaign.endDate}
                      onChange={(e) => setCurrentCampaign({...currentCampaign, endDate: e.target.value})}
                      disabled={modalMode === 'view'}
                      required
                    />
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  </div>
                </div>
              </div>

              <div className="marketings-form-row-2">
                <div className="marketings-form-group">
                  <label>Budget (₹)</label>
                  <input 
                    type="text" 
                    placeholder="Enter budget" 
                    value={currentCampaign.budget}
                    onChange={(e) => setCurrentCampaign({...currentCampaign, budget: e.target.value})}
                    disabled={modalMode === 'view'}
                    required
                  />
                </div>
                <div className="marketings-form-group">
                  <label>Status</label>
                  <select 
                    value={currentCampaign.status}
                    onChange={(e) => setCurrentCampaign({...currentCampaign, status: e.target.value})}
                    disabled={modalMode === 'view'}
                  >
                    <option>Scheduled</option>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="marketings-form-group">
                <label>Description</label>
                <textarea 
                  rows="3" 
                  placeholder="Enter campaign description"
                  value={currentCampaign.desc}
                  onChange={(e) => setCurrentCampaign({...currentCampaign, desc: e.target.value})}
                  disabled={modalMode === 'view'}
                ></textarea>
              </div>

              {modalMode !== 'view' && (
                <div className="marketings-form-group">
                  <label>Banner / Image (Converts automatically to WebP)</label>
                  <div className="marketings-dropzone-area" style={{ position: 'relative' }}>
                    <input 
                      type="file" 
                      accept="image/*"
                      style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <span>{selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}</span>
                    <span className="marketings-dropzone-sub">PNG, JPG, WEBP up to 5MB</span>
                  </div>
                </div>
              )}

              <div className="marketings-modal-actions">
                <button type="button" className="marketings-btn marketings-btn-outline marketings-reset-btn" onClick={() => setIsModalOpen(false)}>
                  <span>{modalMode === 'view' ? 'Close' : 'Cancel'}</span>
                </button>
                {modalMode !== 'view' && (
                  <button type="submit" className="marketings-btn marketings-btn-primary marketings-save-btn">
                    <span>Save Campaign</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketings;