import React, { useState, useEffect, useRef } from 'react';
import './ManageBrands.css';

// Using proper standard string paths for images to prevent module-loading errors based on the reference design
const bannerImg = "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1200&auto=format&fit=crop";
const brand1Img = "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=200&auto=format&fit=crop";
const brand2Img = "https://images.unsplash.com/photo-1587049352847-4a222e784d38?q=80&w=200&auto=format&fit=crop";
const brand3Img = "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=200&auto=format&fit=crop";
const brand4Img = "https://images.unsplash.com/photo-1471943311424-646960669fbc?q=80&w=200&auto=format&fit=crop";
const brand5Img = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=200&auto=format&fit=crop";
const brand6Img = "https://images.unsplash.com/photo-1579888944782-cb5d265e094d?q=80&w=200&auto=format&fit=crop";
const brand7Img = "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=200&auto=format&fit=crop";
const brand8Img = "https://images.unsplash.com/photo-1582398553254-20b17172e25d?q=80&w=200&auto=format&fit=crop";

const initialBrands = [
  { id: 1, name: 'Sabriyana Chocolates', description: 'Our premium chocolate brand', products: '25 Products', status: 'Active', image: brand1Img },
  { id: 2, name: 'Sabriyana Honey', description: 'Pure & natural honey brand', products: '15 Products', status: 'Active', image: brand2Img },
  { id: 3, name: 'Cocoa Bliss', description: 'Luxury chocolate collections', products: '12 Products', status: 'Active', image: brand3Img },
  { id: 4, name: 'Honey Pure', description: '100% natural honey products', products: '10 Products', status: 'Active', image: brand4Img },
  { id: 5, name: 'Sweet Origins', description: 'Artisanal chocolate brand', products: '8 Products', status: 'Inactive', image: brand5Img },
  { id: 6, name: 'Golden Harvest', description: 'Raw & organic honey brand', products: '6 Products', status: 'Active', image: brand6Img },
  { id: 7, name: 'Choco Dreams', description: 'Premium gift chocolate brand', products: '5 Products', status: 'Active', image: brand7Img },
  { id: 8, name: 'Nature\'s Nectar', description: 'Natural honey & bee products', products: '4 Products', status: 'Active', image: brand8Img },
];

const ManageBrands = () => {
  const [brands, setBrands] = useState(initialBrands);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('A to Z');
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

  // Toggle brand status handler for the 3-dot menu
  const handleToggleStatus = (id) => {
    setBrands(prev =>
      prev.map(brand =>
        brand.id === id ? { ...brand, status: brand.status === 'Active' ? 'Inactive' : 'Active' } : brand
      )
    );
    setOpenMenuId(null);
  };

  // Filter logic
  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || brand.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort logic (A to Z or Z to A)
  const sortedBrands = [...filteredBrands].sort((a, b) => {
    if (sortOrder === 'A to Z') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'Z to A') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedBrands.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBrands.slice(indexOfFirstItem, indexOfLastItem);

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
    <div className="manage-brands-container">
      {/* Top Navigation Bar */}
      <header className="manage-brands-header">
        <div className="manage-brands-header__left">
          <button className="manage-brands-menu-btn" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <div className="manage-brands-title-wrapper">
            <h1 className="manage-brands-main-title">Brands</h1>
            <span className="manage-brands-breadcrumb">Dashboard &gt; Products &gt; Brands</span>
          </div>
        </div>
        <div className="manage-brands-header__right">
          <div className="manage-brands-search-bar">
            <svg className="manage-brands-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search..." />
          </div>
          
          {/* Working Date Picker Component */}
          <div className="manage-brands-date-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
              className="manage-brands-date-input"
              aria-label="Select Date"
            />
            <span className="manage-brands-date-display">{formattedDisplayDate}</span>
          </div>

          <button className="manage-brands-icon-btn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span className="manage-brands-badge-dot"></span>
          </button>
          <div className="manage-brands-avatar"></div>
        </div>
      </header>

      {/* Banner Section */}
      <section className="manage-brands-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="manage-brands-banner__content">
          <h2>Manage Brands</h2>
          <p>Add and manage product brands</p>
          <button className="manage-brands-add-btn">
            <span>+</span> Add New Brand
          </button>
        </div>
      </section>

      {/* Analytics Cards */}
      <div className="manage-brands-stats-grid">
        <div className="manage-brands-stat-card">
          <div className="manage-brands-stat-icon teal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </div>
          <div>
            <span className="manage-brands-stat-label">Total Brands</span>
            <h3 className="manage-brands-stat-value">{brands.length}</h3>
          </div>
        </div>
        <div className="manage-brands-stat-card">
          <div className="manage-brands-stat-icon green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div>
            <span className="manage-brands-stat-label">Active Brands</span>
            <h3 className="manage-brands-stat-value">
              {brands.filter(b => b.status === 'Active').length}
            </h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Table Controls */}
      <div className="manage-brands-controls">
        <div className="manage-brands-table-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search brands..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="manage-brands-filters">
          <div className="manage-brands-dropdown">
            <span>Status: </span>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="manage-brands-dropdown">
            <span>Sort: </span>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="A to Z">A to Z</option>
              <option value="Z to A">Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Brands List View */}
      <div className="manage-brands-list">
        {currentItems.length > 0 ? (
          currentItems.map((brand) => (
            <div className="manage-brands-card-item" key={brand.id}>
              <div className="manage-brands-card-left">
                <img src={brand.image} alt={brand.name} className="manage-brands-item-img" />
                <div className="manage-brands-item-info">
                  <h4>{brand.name}</h4>
                  <p>{brand.description}</p>
                </div>
              </div>
              <div className="manage-brands-card-right">
                <span className="manage-brands-product-count">{brand.products}</span>
                <span className={`manage-brands-status-badge ${brand.status.toLowerCase()}`}>
                  {brand.status}
                </span>
                
                {/* 3-Dot Options Button with Active/Inactive Dropdown */}
                <div className="manage-brands-action-wrapper" ref={openMenuId === brand.id ? menuRef : null}>
                  <button 
                    className="manage-brands-options-btn" 
                    aria-label="More options"
                    onClick={() => setOpenMenuId(openMenuId === brand.id ? null : brand.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>

                  {openMenuId === brand.id && (
                    <div className="manage-brands-dropdown-menu">
                      <button onClick={() => handleToggleStatus(brand.id)}>
                        Mark as {brand.status === 'Active' ? 'Inactive' : 'Active'}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="manage-brands-no-data">No brands found.</p>
        )}
      </div>

      {/* Pagination Footer */}
      <footer className="manage-brands-footer">
        <span className="manage-brands-pagination-info">
          Showing {filteredBrands.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredBrands.length)} of {filteredBrands.length} brands
        </span>
        <div className="manage-brands-pagination-controls">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="manage-brands-page-arrow"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`manage-brands-page-num ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="manage-brands-page-arrow"
          >
            &gt;
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ManageBrands;