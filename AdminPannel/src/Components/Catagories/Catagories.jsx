import React, { useState, useEffect, useRef } from 'react';
import API, { IMG_URL } from "../../api/axios";
import './Catagories.css';

// Standard background banner
const bannerImg = "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1200&auto=format&fit=crop";

const Catagories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  
  // Dropdown & Modal State
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [newCatData, setNewCatData] = useState({
    name: '',
    slug: '',
    description: '',
    displayOrder: 0,
    status: 'Active'
  });

  const itemsPerPage = 6;
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  // 1. Fetch Categories from Express Backend API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await API.get('/categories', {
        params: {
          search: searchTerm,
          status: statusFilter,
          sort: sortOrder,
          page: currentPage,
          limit: itemsPerPage
        }
      });

      if (response.data && response.data.success) {
        setCategories(response.data.data);
        setTotalPages(response.data.totalPages || 1);
        setTotalCount(response.data.total || 0);

        // Count active categories from current response
        const activeList = response.data.data.filter(c => c.status === 'Active').length;
        setActiveCount(activeList);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [searchTerm, statusFilter, sortOrder, currentPage]);

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

  // Handle local image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 2. Toggle Status Handler via API (PUT)
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      const response = await API.put(`/categories/${id}`, { status: newStatus });
      if (response.data && response.data.success) {
        setCategories(prev =>
          prev.map(cat => (cat._id === id ? { ...cat, status: newStatus } : cat))
        );
      }
    } catch (err) {
      console.error('Failed to toggle category status:', err);
      alert('Failed to update category status.');
    }
    setOpenMenuId(null);
  };

  // 3. Save New Category Submission via FormData (POST)
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!newCatData.name.trim()) return alert('Category name is required');
    if (!selectedFile) return alert('Category image file is required');

    try {
      const formData = new FormData();
      formData.append('name', newCatData.name.trim());
      formData.append('slug', newCatData.slug || newCatData.name.toLowerCase().replace(/\s+/g, '-'));
      formData.append('description', newCatData.description);
      formData.append('displayOrder', newCatData.displayOrder);
      formData.append('status', newCatData.status);
      formData.append('image', selectedFile);

      const response = await API.post('/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data && response.data.success) {
        setIsModalOpen(false);
        // Reset Form State
        setNewCatData({
          name: '',
          slug: '',
          description: '',
          displayOrder: 0,
          status: 'Active'
        });
        setSelectedFile(null);
        setPreviewUrl('');
        fetchCategories();
      }
    } catch (err) {
      console.error('Failed to save category:', err);
      alert(err.response?.data?.message || 'Failed to save category');
    }
  };

  // Resolves backend relative image paths to full URLs
  const resolveImgUrl = (path) => {
    if (!path) return "https://via.placeholder.com/200?text=No+Image";
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
      return path;
    }
    return `${IMG_URL || 'http://localhost:5000'}${path.startsWith('/') ? path : `/${path}`}`;
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="catagories-container">
      {/* Banner Section with Add Button Below Text */}
      <section className="catagories-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="catagories-banner__content">
          <h2>Manage Product Categories</h2>
          <p>Organize your products into meaningful categories</p>
          <button className="catagories-add-btn" onClick={() => setIsModalOpen(true)}>
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
            <h3 className="catagories-stat-value">{totalCount}</h3>
          </div>
        </div>
        <div className="catagories-stat-card">
          <div className="catagories-stat-icon green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div>
            <span className="catagories-stat-label">Active Categories</span>
            <h3 className="catagories-stat-value">{activeCount}</h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
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
        {loading ? (
          <p className="catagories-no-data">Loading categories...</p>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <div className="catagories-card-item" key={category._id || category.id}>
              <div className="catagories-card-left">
                <img src={resolveImgUrl(category.image)} alt={category.name} className="catagories-item-img" />
                <div className="catagories-item-info">
                  <h4>{category.name}</h4>
                  <p>{category.description || 'No description provided'}</p>
                  <span className="catagories-product-count">{category.productCount || 0} Products</span>
                </div>
              </div>
              <div className="catagories-card-right">
                <span className={`catagories-status-badge ${(category.status || 'Active').toLowerCase()}`}>
                  {category.status}
                </span>
                
                {/* 3-Dot Options Button with Dropdown */}
                <div className="catagories-action-wrapper" ref={openMenuId === category._id ? menuRef : null}>
                  <button 
                    className="catagories-options-btn" 
                    aria-label="More options"
                    onClick={() => setOpenMenuId(openMenuId === category._id ? null : category._id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>

                  {openMenuId === category._id && (
                    <div className="catagories-dropdown-menu">
                      <button onClick={() => handleToggleStatus(category._id, category.status)}>
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
          Showing page {currentPage} of {totalPages} ({totalCount} total categories)
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

      {/* POPUP MODAL FOR ADDING CATEGORY */}
      {isModalOpen && (
        <div className="catagories-modal-overlay">
          <div className="catagories-modal-card">
            <div className="catagories-modal-header">
              <div>
                <h3>Add New Category</h3>
                <p>Create a new category to organize your products</p>
              </div>
              <button className="catagories-modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveCategory} className="catagories-modal-form">
              <div className="catagories-form-grid">
                
                {/* Left Column Inputs */}
                <div className="catagories-form-col">
                  <label className="catagories-form-label">Category Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter category name" 
                    className="catagories-input"
                    value={newCatData.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewCatData({
                        ...newCatData,
                        name: val,
                        slug: val.toLowerCase().replace(/\s+/g, '-')
                      });
                    }}
                  />

                  <label className="catagories-form-label" style={{marginTop: '16px'}}>Category Slug *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="enter-category-slug" 
                    className="catagories-input"
                    value={newCatData.slug}
                    onChange={(e) => setNewCatData({...newCatData, slug: e.target.value})}
                  />
                  <small className="catagories-form-hint">This will be used in the URL</small>

                  <label className="catagories-form-label" style={{marginTop: '16px'}}>Description</label>
                  <textarea 
                    rows="3" 
                    placeholder="Enter category description" 
                    className="catagories-input"
                    value={newCatData.description}
                    onChange={(e) => setNewCatData({...newCatData, description: e.target.value})}
                  />
                  <small className="catagories-form-hint">Brief description about this category</small>

                  <label className="catagories-form-label" style={{marginTop: '16px'}}>Display Order ⓘ</label>
                  <input 
                    type="number" 
                    className="catagories-input"
                    value={newCatData.displayOrder}
                    onChange={(e) => setNewCatData({...newCatData, displayOrder: e.target.value})}
                  />
                  <small className="catagories-form-hint">Lower numbers appear first</small>
                </div>

                {/* Right Column Upload & Status Cards */}
                <div className="catagories-form-col">
                  <label className="catagories-form-label">Category Image *</label>
                  
                  {/* Hidden file input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageChange}
                  />

                  {/* Upload Box */}
                  <div 
                    className="catagories-upload-box"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {previewUrl ? (
                      <div className="catagories-preview-wrapper">
                        <img src={previewUrl} alt="Preview" className="catagories-preview-img" />
                        <span className="catagories-change-text">Click to change image</span>
                      </div>
                    ) : (
                      <div className="catagories-upload-content">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <strong>Upload category image</strong>
                        <small>PNG, JPG or WEBP (Max. 2MB)</small>
                        <button type="button" className="catagories-choose-file-btn">Choose File</button>
                      </div>
                    )}
                  </div>

                  <label className="catagories-form-label" style={{marginTop: '16px'}}>Status</label>
                  
                  {/* Active Status Card */}
                  <div 
                    className={`catagories-status-card ${newCatData.status === 'Active' ? 'selected' : ''}`}
                    onClick={() => setNewCatData({...newCatData, status: 'Active'})}
                  >
                    <div className="catagories-status-radio">
                      <input 
                        type="radio" 
                        name="cat-status" 
                        checked={newCatData.status === 'Active'} 
                        onChange={() => setNewCatData({...newCatData, status: 'Active'})}
                      />
                      <strong>Active</strong>
                    </div>
                    <span>Category will be visible to customers</span>
                  </div>

                  {/* Inactive Status Card */}
                  <div 
                    className={`catagories-status-card ${newCatData.status === 'Inactive' ? 'selected' : ''}`}
                    onClick={() => setNewCatData({...newCatData, status: 'Inactive'})}
                    style={{marginTop: '10px'}}
                  >
                    <div className="catagories-status-radio">
                      <input 
                        type="radio" 
                        name="cat-status" 
                        checked={newCatData.status === 'Inactive'} 
                        onChange={() => setNewCatData({...newCatData, status: 'Inactive'})}
                      />
                      <strong>Inactive</strong>
                    </div>
                    <span>Category will be hidden from customers</span>
                  </div>

                </div>

              </div>

              {/* Modal Footer Buttons */}
              <div className="catagories-modal-actions">
                <button type="button" className="catagories-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="catagories-btn-save">
                  💾 Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catagories;