import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ManageBrands.css';
import API, { IMG_URL } from '../../api/axios';

const bannerImg = "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1200&auto=format&fit=crop";
const defaultFallbackImg = "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=200&auto=format&fit=crop";

const ManageBrands = () => {
  // Data States
  const [brands, setBrands] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]); // ✅ Active Categories for Dropdown
  const [stats, setStats] = useState({ totalBrands: 0, activeBrands: 0 });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter, Sort, & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('A to Z');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 6,
  });

  // UI States
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Upload States
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  // Form State
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
  });

  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Resolves image URLs accurately without duplicating /api or /uploads
  const getBrandImageUrl = (imagePath) => {
    if (!imagePath) return defaultFallbackImg;

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
      return imagePath;
    }

    const normalizedPath = imagePath.replace(/\\/g, '/');

    const rootDomain = (IMG_URL || 'http://localhost:5000')
      .replace(/\/api\/?$/, '')
      .replace(/\/uploads\/?$/, '')
      .replace(/\/$/, '');

    const cleanPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
    return `${rootDomain}${cleanPath}`;
  };

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

  // 1. FETCH BRANDS FROM API
  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get('/brands', {
        params: {
          search: searchTerm,
          status: statusFilter,
          sort: sortOrder,
          page: currentPage,
          limit: 6,
        },
      });

      if (response.data?.success) {
        setBrands(response.data.data || []);
        setStats(response.data.stats || { totalBrands: 0, activeBrands: 0 });
        setPagination(
          response.data.pagination || {
            totalItems: response.data.count || 0,
            totalPages: 1,
            currentPage: 1,
            limit: 6,
          }
        );
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, sortOrder, currentPage]);

  // 2. FETCH CATEGORIES FOR DROPDOWN
  const fetchCategoriesList = useCallback(async () => {
    try {
      const response = await API.get('/categories', {
        params: {
          status: 'Active',
          limit: 100, // Fetch up to 100 active categories for selection
        },
      });

      if (response.data?.success) {
        setCategoriesList(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories for dropdown:', error);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    fetchCategoriesList();
  }, [fetchCategoriesList]);

  // Handle File Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
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
    });
    setSelectedFile(null);
    setPreviewImage('');
  };

  // 3. CREATE BRAND
  const handleSaveBrand = async (e) => {
    e.preventDefault();
    if (!newBrandData.name.trim()) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', newBrandData.name.trim());

      if (newBrandData.slug.trim()) formData.append('slug', newBrandData.slug.trim());
      if (newBrandData.category) formData.append('category', newBrandData.category);
      if (newBrandData.description) formData.append('description', newBrandData.description);
      if (newBrandData.website) formData.append('website', newBrandData.website);

      formData.append('status', newBrandData.status);
      formData.append('featured', newBrandData.featured);
      if (newBrandData.seoTitle) formData.append('seoTitle', newBrandData.seoTitle);
      if (newBrandData.metaDesc) formData.append('metaDesc', newBrandData.metaDesc);
      formData.append('displayOrder', newBrandData.displayOrder || 1);

      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const response = await API.post('/brands', formData);

      if (response.data?.success) {
        setIsModalOpen(false);
        resetForm();
        fetchBrands();
      }
    } catch (error) {
      console.error('Error saving brand:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to save brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. TOGGLE STATUS
  const handleToggleStatus = async (id) => {
    try {
      const response = await API.patch(`/brands/${id}/status`);
      if (response.data?.success) {
        fetchBrands();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    } finally {
      setOpenMenuId(null);
    }
  };

  // 5. DELETE BRAND
  const handleDeleteBrand = async (id) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) return;
    try {
      const response = await API.delete(`/brands/${id}`);
      if (response.data?.success) {
        fetchBrands();
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
    } finally {
      setOpenMenuId(null);
    }
  };

  // Page Handler
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const firstItemIndex = (pagination.currentPage - 1) * pagination.limit + 1;
  const lastItemIndex = Math.min(pagination.currentPage * pagination.limit, pagination.totalItems);

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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <div>
            <span className="manage-brands-stat-label">Total Brands</span>
            <h3 className="manage-brands-stat-value">{stats.totalBrands}</h3>
          </div>
        </div>
        <div className="manage-brands-stat-card">
          <div className="manage-brands-stat-icon green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <span className="manage-brands-stat-label">Active Brands</span>
            <h3 className="manage-brands-stat-value">{stats.activeBrands}</h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="manage-brands-controls">
        <div className="manage-brands-table-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="manage-brands-filters">
          <div className="manage-brands-dropdown">
            <span>Status: </span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
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
        {loading ? (
          <p className="manage-brands-no-data">Loading brands...</p>
        ) : brands.length > 0 ? (
          brands.map((brand) => {
            const brandId = brand._id || brand.id;
            return (
              <div className="manage-brands-card-item" key={brandId}>
                <div className="manage-brands-card-left">
                  <img
                    src={getBrandImageUrl(brand.image)}
                    alt={brand.name}
                    className="manage-brands-item-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultFallbackImg;
                    }}
                  />
                  <div className="manage-brands-item-info">
                    <h4>{brand.name}</h4>
                    <p>{brand.description}</p>
                  </div>
                </div>
                <div className="manage-brands-card-right">
                  <span className="manage-brands-product-count">
                    {brand.productsCount ?? 0} Products
                  </span>
                  <span className={`manage-brands-status-badge ${(brand.status || 'Active').toLowerCase()}`}>
                    {brand.status}
                  </span>

                  {/* Options Menu */}
                  <div
                    className="manage-brands-action-wrapper"
                    ref={openMenuId === brandId ? menuRef : null}
                  >
                    <button
                      className="manage-brands-options-btn"
                      aria-label="More options"
                      onClick={() => setOpenMenuId(openMenuId === brandId ? null : brandId)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>

                    {openMenuId === brandId && (
                      <div className="manage-brands-dropdown-menu">
                        <button onClick={() => handleToggleStatus(brandId)}>
                          Mark as {brand.status === 'Active' ? 'Inactive' : 'Active'}
                        </button>
                        <button
                          onClick={() => handleDeleteBrand(brandId)}
                          style={{ color: '#e53e3e' }}
                        >
                          Delete Brand
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="manage-brands-no-data">No brands found.</p>
        )}
      </div>

      {/* Pagination Footer */}
      <footer className="manage-brands-footer">
        <span className="manage-brands-pagination-info">
          Showing {pagination.totalItems > 0 ? firstItemIndex : 0} to{' '}
          {lastItemIndex} of {pagination.totalItems} brands
        </span>
        <div className="manage-brands-pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="manage-brands-page-arrow"
          >
            &lt;
          </button>
          {[...Array(pagination.totalPages)].map((_, index) => (
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
            disabled={currentPage === pagination.totalPages || pagination.totalPages === 0}
            className="manage-brands-page-arrow"
          >
            &gt;
          </button>
        </div>
      </footer>

      {/* ADD BRAND MODAL */}
      {isModalOpen && (
        <div className="manage-brands-modal-overlay">
          <div className="manage-brands-modal-card">
            <div className="manage-brands-modal-header">
              <div>
                <h3>Add New Brand</h3>
                <p>Create a new product brand</p>
              </div>
              <button className="manage-brands-modal-close" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBrand} className="manage-brands-modal-form">
              <div className="manage-brands-form-grid">
                {/* Left Column: Image Upload & General Fields */}
                <div className="manage-brands-form-col">
                  <label className="manage-brands-form-label">Brand Logo</label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageChange}
                  />

                  <div
                    className="manage-brands-upload-box"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {previewImage ? (
                      <div className="manage-brands-preview-container">
                        <img src={previewImage} alt="Logo Preview" className="manage-brands-preview-img" />
                        <button
                          type="button"
                          className="manage-brands-remove-img"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            setPreviewImage('');
                          }}
                        >
                          Change Image
                        </button>
                      </div>
                    ) : (
                      <div className="manage-brands-upload-content">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <strong>Upload Image</strong>
                        <span>Drag & drop or click to browse</span>
                        <small>JPG, PNG, WEBP (Converted to WebP)</small>
                      </div>
                    )}
                  </div>

                  <label className="manage-brands-form-label" style={{ marginTop: '20px' }}>
                    Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Enter brand description..."
                    className="manage-brands-input"
                    value={newBrandData.description}
                    onChange={(e) => setNewBrandData({ ...newBrandData, description: e.target.value })}
                  />

                  <label className="manage-brands-form-label" style={{ marginTop: '20px' }}>
                    Brand Status
                  </label>
                  <div className="manage-brands-radio-group">
                    <label className="manage-brands-radio-label">
                      <input
                        type="radio"
                        name="status"
                        checked={newBrandData.status === 'Active'}
                        onChange={() => setNewBrandData({ ...newBrandData, status: 'Active' })}
                      />{' '}
                      Active
                    </label>
                    <label className="manage-brands-radio-label">
                      <input
                        type="radio"
                        name="status"
                        checked={newBrandData.status === 'Inactive'}
                        onChange={() => setNewBrandData({ ...newBrandData, status: 'Inactive' })}
                      />{' '}
                      Inactive
                    </label>
                  </div>

                  <label className="manage-brands-form-label" style={{ marginTop: '20px' }}>
                    SEO Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter SEO title"
                    className="manage-brands-input"
                    value={newBrandData.seoTitle}
                    onChange={(e) => setNewBrandData({ ...newBrandData, seoTitle: e.target.value })}
                  />

                  <label className="manage-brands-form-label" style={{ marginTop: '20px' }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    className="manage-brands-input"
                    value={newBrandData.displayOrder}
                    onChange={(e) => setNewBrandData({ ...newBrandData, displayOrder: e.target.value })}
                  />
                </div>

                {/* Right Column: Text Metadata */}
                <div className="manage-brands-form-col">
                  <label className="manage-brands-form-label">Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter brand name"
                    className="manage-brands-input"
                    value={newBrandData.name}
                    onChange={(e) => setNewBrandData({ ...newBrandData, name: e.target.value })}
                  />

                  <label className="manage-brands-form-label" style={{ marginTop: '20px' }}>
                    Brand Slug
                  </label>
                  <input
                    type="text"
                    placeholder="auto-generated or custom"
                    className="manage-brands-input"
                    value={newBrandData.slug}
                    onChange={(e) => setNewBrandData({ ...newBrandData, slug: e.target.value })}
                  />

                  {/* ✅ DYNAMICALLY FETCHED CATEGORIES DROPDOWN */}
                  <label className="manage-brands-form-label" style={{ marginTop: '20px' }}>
                    Brand Category
                  </label>
                  <select
                    className="manage-brands-input manage-brands-select"
                    value={newBrandData.category}
                    onChange={(e) => setNewBrandData({ ...newBrandData, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categoriesList.length > 0 ? (
                      categoriesList.map((cat) => (
                        <option key={cat._id || cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No active categories available
                      </option>
                    )}
                  </select>

                  <label className="manage-brands-form-label" style={{ marginTop: '20px' }}>
                    Website
                  </label>
                  <input
                    type="text"
                    placeholder="https://"
                    className="manage-brands-input"
                    value={newBrandData.website}
                    onChange={(e) => setNewBrandData({ ...newBrandData, website: e.target.value })}
                  />

                  <label className="manage-brands-form-label" style={{ marginTop: '20px' }}>
                    Featured Brand
                  </label>
                  <div className="manage-brands-checkbox-wrapper">
                    <label className="manage-brands-checkbox-label">
                      <input
                        type="checkbox"
                        checked={newBrandData.featured}
                        onChange={(e) => setNewBrandData({ ...newBrandData, featured: e.target.checked })}
                      />{' '}
                      Show on Homepage
                    </label>
                  </div>

                  <label className="manage-brands-form-label" style={{ marginTop: '20px' }}>
                    Meta Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Enter meta description..."
                    className="manage-brands-input"
                    value={newBrandData.metaDesc}
                    onChange={(e) => setNewBrandData({ ...newBrandData, metaDesc: e.target.value })}
                  />
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="manage-brands-modal-actions">
                <button
                  type="button"
                  className="manage-brands-btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="manage-brands-btn-save" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBrands;