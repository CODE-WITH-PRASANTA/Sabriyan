import React, { useState, useEffect, useRef } from 'react';
import './Attributes.css';

// Using proper standard string paths for banner and attribute item icons based on the design
const bannerImg = "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1200&auto=format&fit=crop";
const attr1Img = "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=200&auto=format&fit=crop";
const attr2Img = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=200&auto=format&fit=crop";
const attr3Img = "https://images.unsplash.com/photo-1579888944782-cb5d265e094d?q=80&w=200&auto=format&fit=crop";
const attr4Img = "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=200&auto=format&fit=crop";
const attr5Img = "https://images.unsplash.com/photo-1587049352847-4a222e784d38?q=80&w=200&auto=format&fit=crop";
const attr6Img = "https://images.unsplash.com/photo-1471943311424-646960669fbc?q=80&w=200&auto=format&fit=crop";
const attr7Img = "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=200&auto=format&fit=crop";
const attr8Img = "https://images.unsplash.com/photo-1582398553254-20b17172e25d?q=80&w=200&auto=format&fit=crop";

const initialAttributes = [
  { id: 1, name: 'Flavor', description: 'Product flavor or taste', values: 'Values: 12', status: 'Active', image: attr1Img },
  { id: 2, name: 'Chocolate Type', description: 'Type of chocolate', values: 'Values: 4', status: 'Active', image: attr2Img },
  { id: 3, name: 'Packaging Type', description: 'Type of packaging', values: 'Values: 6', status: 'Active', image: attr3Img },
  { id: 4, name: 'Weight', description: 'Product weight options', values: 'Values: 8', status: 'Active', image: attr4Img },
  { id: 5, name: 'Origin', description: 'Country of origin', values: 'Values: 5', status: 'Active', image: attr5Img },
  { id: 6, name: 'Dietary Info', description: 'Dietary information', values: 'Values: 7', status: 'Active', image: attr6Img },
  { id: 7, name: 'Gift Occasion', description: 'Suitable gift occasions', values: 'Values: 9', status: 'Active', image: attr7Img },
  { id: 8, name: 'Honey Type', description: 'Type of honey', values: 'Values: 6', status: 'Active', image: attr8Img },
];

const Attributes = () => {
  const [attributes, setAttributes] = useState(initialAttributes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2025-05-29');

  const itemsPerPage = 6; // 6 items shown per page as requested
  const menuRef = useRef(null);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle attribute status handler for the 3-dot menu
  const handleToggleStatus = (id) => {
    setAttributes(prev =>
      prev.map(attr =>
        attr.id === id ? { ...attr, status: attr.status === 'Active' ? 'Inactive' : 'Active' } : attr
      )
    );
    setOpenMenuId(null);
  };

  // Filter logic
  const filteredAttributes = attributes.filter((attr) => {
    const matchesSearch = attr.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || attr.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort logic (Newest, Oldest, or A to Z)
  const sortedAttributes = [...filteredAttributes].sort((a, b) => {
    if (sortOrder === 'Newest') {
      return b.id - a.id;
    } else if (sortOrder === 'Oldest') {
      return a.id - b.id;
    } else if (sortOrder === 'A to Z') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Pagination logic (6 items per page, exactly 2 pages for 8 total items)
  const totalPages = Math.ceil(sortedAttributes.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAttributes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Format date nicely for display
  const formattedDisplayDate = new Date(selectedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="attributes-container">
      {/* Top Navigation Bar */}
      <header className="attributes-header">
        <div className="attributes-header__left">
          <button className="attributes-menu-btn" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <div className="attributes-title-wrapper">
            <h1 className="attributes-main-title">Attributes</h1>
            <span className="attributes-breadcrumb">Dashboard &gt; Products &gt; Attributes</span>
          </div>
        </div>
        <div className="attributes-header__right">
          <div className="attributes-search-bar">
            <svg className="attributes-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search..." />
          </div>
          
          {/* Working Date Picker Component */}
          <div className="attributes-date-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
              className="attributes-date-input"
              aria-label="Select Date"
            />
            <span className="attributes-date-display">{formattedDisplayDate}</span>
          </div>

          <button className="attributes-icon-btn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span className="attributes-badge-dot"></span>
          </button>
          <div className="attributes-avatar"></div>
        </div>
      </header>

      {/* Banner Section */}
      <section className="attributes-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="attributes-banner__content">
          <h2>Manage Attributes</h2>
          <p>Create and manage product attributes</p>
          <button className="attributes-add-btn">
            <span>+</span> Add New Attribute
          </button>
        </div>
      </section>

      {/* Analytics Cards */}
      <div className="attributes-stats-grid">
        <div className="attributes-stat-card">
          <div className="attributes-stat-icon yellow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </div>
          <div>
            <span className="attributes-stat-label">Total Attributes</span>
            <h3 className="attributes-stat-value">14</h3>
          </div>
        </div>
        <div className="attributes-stat-card">
          <div className="attributes-stat-icon green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div>
            <span className="attributes-stat-label">Active Attributes</span>
            <h3 className="attributes-stat-value">12</h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Table Controls */}
      <div className="attributes-controls">
        <div className="attributes-table-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search attributes..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="attributes-filters">
          <div className="attributes-dropdown">
            <span>Status: </span>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="attributes-dropdown">
            <span>Sort: </span>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="A to Z">A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attributes List View */}
      <div className="attributes-list">
        {currentItems.length > 0 ? (
          currentItems.map((attr) => (
            <div className="attributes-card-item" key={attr.id}>
              <div className="attributes-card-left">
                <img src={attr.image} alt={attr.name} className="attributes-item-img" />
                <div className="attributes-item-info">
                  <h4>{attr.name}</h4>
                  <p>{attr.description}</p>
                </div>
              </div>
              <div className="attributes-card-right">
                <span className="attributes-value-badge">{attr.values}</span>
                <span className={`attributes-status-badge ${attr.status.toLowerCase()}`}>
                  {attr.status}
                </span>
                
                {/* 3-Dot Options Button with Active/Inactive Dropdown */}
                <div className="attributes-action-wrapper" ref={openMenuId === attr.id ? menuRef : null}>
                  <button 
                    className="attributes-options-btn" 
                    aria-label="More options"
                    onClick={() => setOpenMenuId(openMenuId === attr.id ? null : attr.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>

                  {openMenuId === attr.id && (
                    <div className="attributes-dropdown-menu">
                      <button onClick={() => handleToggleStatus(attr.id)}>
                        Mark as {attr.status === 'Active' ? 'Inactive' : 'Active'}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="attributes-no-data">No attributes found.</p>
        )}
      </div>

      {/* Pagination Footer */}
      <footer className="attributes-footer">
        <span className="attributes-pagination-info">
          Showing 1 to 8 of 14 attributes
        </span>
        <div className="attributes-pagination-controls">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="attributes-page-arrow"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`attributes-page-num ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="attributes-page-arrow"
          >
            &gt;
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Attributes;