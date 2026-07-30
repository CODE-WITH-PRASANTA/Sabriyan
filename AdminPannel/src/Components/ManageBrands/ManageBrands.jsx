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

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBrandData, setNewBrandData] = useState({
    name: '',
    slug: '',
    category: '',
    description: '',
    website: '',
    status: 'Active',
    featured: false,
    seoTitle: '',
    metaDesc: '',
    displayOrder: 1,
    image: ''
  });

  const itemsPerPage = 6; 
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

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

  // Handle file selection and preview generation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBrandData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle brand status handler for the 3-dot menu
  const handleToggleStatus = (id) => {
    setBrands(prev =>
      prev.map(brand =>
        brand.id === id ? { ...brand, status: brand.status === 'Active' ? 'Inactive' : 'Active' } : brand
      )
    );
    setOpenMenuId(null);
  };

  // Handle Form Submission for Adding Brand
  const handleSaveBrand = (e) => {
    e.preventDefault();
    if (!newBrandData.name.trim()) return;

    const newBrand = {
      id: brands.length + 1,
      name: newBrandData.name,
      description: newBrandData.description || 'No description provided',
      products: '0 Products',
      status: newBrandData.status,
      image: newBrandData.image || brand1Img
    };

    setBrands([newBrand, ...brands]);
    setIsModalOpen(false);
    // Reset form
    setNewBrandData({
      name: '',
      slug: '',
      category: '',
      description: '',
      website: '',
      status: 'Active',
      featured: false,
      seoTitle: '',
      metaDesc: '',
      displayOrder: 1,
      image: ''
    });
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

  return (
    <div className="manage-brands-container">
      {/* Banner Section */}
      <section className="manage-brands-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="manage-brands-banner__content">
          <h2>Manage Brands</h2>
          <p>Add and manage product brands</p>
          <button className="manage-brands-add-btn" onClick={() => setIsModalOpen(true)}>
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

      {/* POPUP MODAL FOR ADDING BRAND */}
      {isModalOpen && (
        <div className="manage-brands-modal-overlay">
          <div className="manage-brands-modal-card">
            <div className="manage-brands-modal-header">
              <div>
                <h3>Add New Brand</h3>
                <p>Create a new product brand</p>
              </div>
              <button className="manage-brands-modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveBrand} className="manage-brands-modal-form">
              <div className="manage-brands-form-grid">
                
                {/* Left Column: Functional Upload Image Box */}
                <div className="manage-brands-form-col">
                  <label className="manage-brands-form-label">Brand Logo</label>
                  
                  {/* Hidden file input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageChange}
                  />

                  {/* Clickable upload container */}
                  <div 
                    className="manage-brands-upload-box" 
                    onClick={() => fileInputRef.current.click()}
                  >
                    {newBrandData.image ? (
                      <div className="manage-brands-preview-container">
                        <img src={newBrandData.image} alt="Logo Preview" className="manage-brands-preview-img" />
                        <button 
                          type="button" 
                          className="manage-brands-remove-img" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewBrandData(prev => ({ ...prev, image: '' }));
                          }}
                        >
                          Change Image
                        </button>
                      </div>
                    ) : (
                      <div className="manage-brands-upload-content">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <strong>Upload Image</strong>
                        <span>Drag & drop or click to browse</span>
                        <small>JPG, PNG, WEBP (Max 2MB)</small>
                      </div>
                    )}
                  </div>

                  <label className="manage-brands-form-label" style={{marginTop: '20px'}}>Description</label>
                  <textarea 
                    rows="3" 
                    placeholder="Enter brand description..." 
                    className="manage-brands-input"
                    value={newBrandData.description}
                    onChange={(e) => setNewBrandData({...newBrandData, description: e.target.value})}
                  />

                  <label className="manage-brands-form-label" style={{marginTop: '20px'}}>Brand Status</label>
                  <div className="manage-brands-radio-group">
                    <label className="manage-brands-radio-label">
                      <input 
                        type="radio" 
                        name="status" 
                        checked={newBrandData.status === 'Active'} 
                        onChange={() => setNewBrandData({...newBrandData, status: 'Active'})}
                      /> Active
                    </label>
                    <label className="manage-brands-radio-label">
                      <input 
                        type="radio" 
                        name="status" 
                        checked={newBrandData.status === 'Inactive'} 
                        onChange={() => setNewBrandData({...newBrandData, status: 'Inactive'})}
                      /> Inactive
                    </label>
                  </div>

                  <label className="manage-brands-form-label" style={{marginTop: '20px'}}>SEO Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter SEO title" 
                    className="manage-brands-input"
                    value={newBrandData.seoTitle}
                    onChange={(e) => setNewBrandData({...newBrandData, seoTitle: e.target.value})}
                  />

                  <label className="manage-brands-form-label" style={{marginTop: '20px'}}>Display Order</label>
                  <input 
                    type="number" 
                    className="manage-brands-input"
                    value={newBrandData.displayOrder}
                    onChange={(e) => setNewBrandData({...newBrandData, displayOrder: e.target.value})}
                  />
                </div>

                {/* Right Column: Text inputs */}
                <div className="manage-brands-form-col">
                  <label className="manage-brands-form-label">Brand Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter brand name" 
                    className="manage-brands-input"
                    value={newBrandData.name}
                    onChange={(e) => setNewBrandData({...newBrandData, name: e.target.value})}
                  />

                  <label className="manage-brands-form-label" style={{marginTop: '20px'}}>Brand Slug</label>
                  <input 
                    type="text" 
                    placeholder="auto-generated or custom" 
                    className="manage-brands-input"
                    value={newBrandData.slug}
                    onChange={(e) => setNewBrandData({...newBrandData, slug: e.target.value})}
                  />

                  <label className="manage-brands-form-label" style={{marginTop: '20px'}}>Brand Category</label>
                  <select 
                    className="manage-brands-input manage-brands-select"
                    value={newBrandData.category}
                    onChange={(e) => setNewBrandData({...newBrandData, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="Chocolates">Chocolates</option>
                    <option value="Honey">Honey</option>
                    <option value="Gifts">Gifts</option>
                  </select>

                  <label className="manage-brands-form-label" style={{marginTop: '20px'}}>Website</label>
                  <input 
                    type="text" 
                    placeholder="https://" 
                    className="manage-brands-input"
                    value={newBrandData.website}
                    onChange={(e) => setNewBrandData({...newBrandData, website: e.target.value})}
                  />

                  <label className="manage-brands-form-label" style={{marginTop: '20px'}}>Featured Brand</label>
                  <div className="manage-brands-checkbox-wrapper">
                    <label className="manage-brands-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={newBrandData.featured}
                        onChange={(e) => setNewBrandData({...newBrandData, featured: e.target.checked})}
                      /> Show on Homepage
                    </label>
                  </div>

                  <label className="manage-brands-form-label" style={{marginTop: '20px'}}>Meta Description</label>
                  <textarea 
                    rows="3" 
                    placeholder="Enter meta description..." 
                    className="manage-brands-input"
                    value={newBrandData.metaDesc}
                    onChange={(e) => setNewBrandData({...newBrandData, metaDesc: e.target.value})}
                  />
                </div>

              </div>

              {/* Footer Buttons */}
              <div className="manage-brands-modal-actions">
                <button type="button" className="manage-brands-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="manage-brands-btn-save">Save Brand</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBrands;