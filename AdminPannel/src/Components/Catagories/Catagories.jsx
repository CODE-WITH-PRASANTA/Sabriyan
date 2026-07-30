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
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatData, setNewCatData] = useState({
    name: '',
    slug: '',
    description: '',
    displayOrder: 0,
    status: 'Active',
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

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCatData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle status handler for the 3-dot menu
  const handleToggleStatus = (id) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, status: cat.status === 'Active' ? 'Inactive' : 'Active' } : cat
      )
    );
    setOpenMenuId(null);
  };

  // Handle Save New Category Form Submission
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!newCatData.name.trim()) return;

    const newCategoryItem = {
      id: categories.length + 1,
      name: newCatData.name,
      description: newCatData.description || 'Brief description about this category',
      products: '0 Products',
      status: newCatData.status,
      image: newCatData.image || darkChocImg
    };

    setCategories([newCategoryItem, ...categories]);
    setIsModalOpen(false);
    // Reset form
    setNewCatData({
      name: '',
      slug: '',
      description: '',
      displayOrder: 0,
      status: 'Active',
      image: ''
    });
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

  // Pagination logic
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
                  <label className="catagories-form-label">Category Image</label>
                  
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
                    {newCatData.image ? (
                      <div className="catagories-preview-wrapper">
                        <img src={newCatData.image} alt="Preview" className="catagories-preview-img" />
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