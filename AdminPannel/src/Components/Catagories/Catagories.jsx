import React, { useState, useEffect, useRef } from 'react';
import './Catagories.css';

// Using proper standard string paths for images to prevent module-loading errors
const bannerImg = "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1200&auto=format&fit=crop";
const darkChocImg = "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=200&auto=format&fit=crop";
const milkChocImg = "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=200&auto=format&fit=crop";
const honeyImg = "https://images.unsplash.com/photo-1587049352847-4a222e784d38?q=80&w=200&auto=format&fit=crop";
const chocGiftsImg = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=200&auto=format&fit=crop";
const comboPacksImg = "https://images.unsplash.com/photo-1579888944782-cb5d265e094d?q=80&w=200&auto=format&fit=crop";
const honeyGiftsImg = "https://images.unsplash.com/photo-1471943311424-646960669fbc?q=80&w=200&auto=format&fit=crop";

const initialCategories = [
  { id: 1, name: 'Dark Chocolate', description: 'Delicious dark chocolate products', products: '18 Products', status: 'Active', image: darkChocImg },
  { id: 2, name: 'Milk Chocolate', description: 'Smooth and creamy milk chocolate', products: '22 Products', status: 'Active', image: milkChocImg },
  { id: 3, name: 'Honey', description: 'Pure and natural honey products', products: '15 Products', status: 'Active', image: honeyImg },
  { id: 4, name: 'Chocolate Gifts', description: 'Perfect gift packs for all occasions', products: '8 Products', status: 'Active', image: chocGiftsImg },
  { id: 5, name: 'Combo Packs', description: 'Best combination of chocolates & more', products: '12 Products', status: 'Active', image: comboPacksImg },
  { id: 6, name: 'Honey Gifts', description: 'Premium honey gift collections', products: '6 Products', status: 'Inactive', image: honeyGiftsImg },
];

const Catagories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const itemsPerPage = 6;

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

  // Toggle status handler for the 3-dot menu
  const handleToggleStatus = (id) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, status: cat.status === 'Active' ? 'Inactive' : 'Active' } : cat
      )
    );
    setOpenMenuId(null);
  };

  // Filter logic
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || cat.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort logic
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortOrder === 'Newest') {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  // Pagination logic (6 items per page)
  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedCategories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="catagories-container">
      {/* Top Navigation Bar */}
      <header className="catagories-header">
        <div className="catagories-header__left">
          <button className="catagories-menu-btn" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <div className="catagories-title-wrapper">
            <h1 className="catagories-main-title">Categories</h1>
            <span className="catagories-breadcrumb">Dashboard &gt; Products &gt; Categories</span>
          </div>
        </div>
        <div className="catagories-header__right">
          <div className="catagories-search-bar">
            <svg className="catagories-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="catagories-date-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>May 29, 2025</span>
          </div>
          <button className="catagories-icon-btn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span className="catagories-badge-dot"></span>
          </button>
          <div className="catagories-avatar"></div>
        </div>
      </header>

      {/* Banner Section with Add Button Below Text */}
      <section className="catagories-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="catagories-banner__content">
          <h2>Manage Product Categories</h2>
          <p>Organize your products into meaningful categories</p>
          <button className="catagories-add-btn">
            <span>+</span> Add New Category
          </button>
        </div>
      </section>

      {/* Analytics Cards */}
      <div className="catagories-stats-grid">
        <div className="catagories-stat-card">
          <div className="catagories-stat-icon yellow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </div>
          <div>
            <span className="catagories-stat-label">Total Categories</span>
            <h3 className="catagories-stat-value">{categories.length}</h3>
          </div>
        </div>
        <div className="catagories-stat-card">
          <div className="catagories-stat-icon green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div>
            <span className="catagories-stat-label">Active Categories</span>
            <h3 className="catagories-stat-value">
              {categories.filter(c => c.status === 'Active').length}
            </h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Table Controls */}
      <div className="catagories-controls">
        <div className="catagories-table-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="catagories-filters">
          <div className="catagories-dropdown">
            <span>Status: </span>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="catagories-dropdown">
            <span>Sort: </span>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories List View */}
      <div className="catagories-list">
        {currentItems.length > 0 ? (
          currentItems.map((category) => (
            <div className="catagories-card-item" key={category.id}>
              <div className="catagories-card-left">
                <img src={category.image} alt={category.name} className="catagories-item-img" />
                <div className="catagories-item-info">
                  <h4>{category.name}</h4>
                  <p>{category.description}</p>
                  <span className="catagories-product-count">{category.products}</span>
                </div>
              </div>
              <div className="catagories-card-right">
                <span className={`catagories-status-badge ${category.status.toLowerCase()}`}>
                  {category.status}
                </span>
                
                {/* 3-Dot Options Button with Dropdown */}
                <div className="catagories-action-wrapper" ref={openMenuId === category.id ? menuRef : null}>
                  <button 
                    className="catagories-options-btn" 
                    aria-label="More options"
                    onClick={() => setOpenMenuId(openMenuId === category.id ? null : category.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>

                  {openMenuId === category.id && (
                    <div className="catagories-dropdown-menu">
                      <button onClick={() => handleToggleStatus(category.id)}>
                        Mark as {category.status === 'Active' ? 'Inactive' : 'Active'}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="catagories-no-data">No categories found.</p>
        )}
      </div>

      {/* Pagination Footer */}
      <footer className="catagories-footer">
        <span className="catagories-pagination-info">
          Showing {filteredCategories.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredCategories.length)} of {filteredCategories.length} categories
        </span>
        <div className="catagories-pagination-controls">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="catagories-page-arrow"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`catagories-page-num ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="catagories-page-arrow"
          >
            &gt;
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Catagories;