import React, { useState, useEffect, useRef } from 'react';
import './Attributes.css';

// Banner and attribute item images
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

  // Attribute Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAttr, setNewAttr] = useState({
    name: '',
    slug: '',
    type: '',
    inputType: '',
    description: '',
    displayOrder: 1,
    status: 'Active',
    addValuesManually: true
  });
  const [valueInput, setValueInput] = useState('');
  const [valueTags, setValueTags] = useState(['Raw Honey', 'Organic Honey', 'Floral Honey', 'Wild Honey', 'Manuka Honey']);

  // Add Customer Modal State
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    customerGroup: 'VIP Customers',
  });

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

  // Toggle attribute status handler
  const handleToggleStatus = (id) => {
    setAttributes(prev =>
      prev.map(attr =>
        attr.id === id ? { ...attr, status: attr.status === 'Active' ? 'Inactive' : 'Active' } : attr
      )
    );
    setOpenMenuId(null);
  };

  // Add attribute value tag handlers
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && valueInput.trim()) {
      e.preventDefault();
      if (!valueTags.includes(valueInput.trim())) {
        setValueTags([...valueTags, valueInput.trim()]);
      }
      setValueInput('');
    }
  };

  const handleAddTagButton = () => {
    if (valueInput.trim() && !valueTags.includes(valueInput.trim())) {
      setValueTags([...valueTags, valueInput.trim()]);
      setValueInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setValueTags(valueTags.filter(tag => tag !== tagToRemove));
  };

  // Save attribute handler
  const handleSaveAttribute = (e) => {
    e.preventDefault();
    if (!newAttr.name.trim()) return;

    const createdAttribute = {
      id: attributes.length + 1,
      name: newAttr.name,
      description: newAttr.description || 'Product attribute description',
      values: `Values: ${valueTags.length}`,
      status: newAttr.status,
      image: attr1Img
    };

    setAttributes([createdAttribute, ...attributes]);
    setIsModalOpen(false);
    setNewAttr({
      name: '',
      slug: '',
      type: '',
      inputType: '',
      description: '',
      displayOrder: 1,
      status: 'Active',
      addValuesManually: true
    });
    setValueTags(['Raw Honey', 'Organic Honey']);
  };

  // Customer form handlers
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    console.log('Customer saved:', customerData);
    setCustomerData({
      fullName: '',
      email: '',
      phone: '',
      customerGroup: 'VIP Customers',
    });
    setIsCustomerModalOpen(false);
  };

  // Filter & Sort Logic
  const filteredAttributes = attributes.filter((attr) => {
    const matchesSearch = attr.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || attr.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedAttributes = [...filteredAttributes].sort((a, b) => {
    if (sortOrder === 'Newest') return b.id - a.id;
    if (sortOrder === 'Oldest') return a.id - b.id;
    if (sortOrder === 'A to Z') return a.name.localeCompare(b.name);
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedAttributes.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAttributes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="attributes-container">
      {/* Banner Section */}
      <section className="attributes-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="attributes-banner__content">
          <h2>Manage Attributes</h2>
          <p>Create and manage product attributes</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="attributes-add-btn" onClick={() => setIsModalOpen(true)}>
              <span>+</span> Add New Attribute
            </button>
            <button className="attributes-add-btn" onClick={() => setIsCustomerModalOpen(true)}>
              <span>+</span> Add New Customer
            </button>
          </div>
        </div>
      </section>

      {/* Analytics Cards */}
      <div className="attributes-stats-grid">
        <div className="attributes-stat-card">
          <div className="attributes-stat-icon yellow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <div>
            <span className="attributes-stat-label">Total Attributes</span>
            <h3 className="attributes-stat-value">{attributes.length}</h3>
          </div>
        </div>
        <div className="attributes-stat-card">
          <div className="attributes-stat-icon green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <span className="attributes-stat-label">Active Attributes</span>
            <h3 className="attributes-stat-value">
              {attributes.filter(a => a.status === 'Active').length}
            </h3>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="attributes-controls">
        <div className="attributes-table-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
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

      {/* Attributes List */}
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
                <div className="attributes-action-wrapper" ref={openMenuId === attr.id ? menuRef : null}>
                  <button 
                    className="attributes-options-btn" 
                    aria-label="More options"
                    onClick={() => setOpenMenuId(openMenuId === attr.id ? null : attr.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
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
          Showing {filteredAttributes.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredAttributes.length)} of {filteredAttributes.length} attributes
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

      {/* POPUP MODAL FOR ADDING ATTRIBUTE */}
      {isModalOpen && (
        <div className="attributes-modal-overlay">
          <div className="attributes-modal-card">
            <div className="attributes-modal-header">
              <div>
                <h3>Add New Attribute</h3>
                <p>Create a new product attribute to organize your products better.</p>
              </div>
              <button className="attributes-modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveAttribute} className="attributes-modal-form">
              <div className="attributes-form-grid">
                <div className="attributes-form-col">
                  <label className="attributes-form-label">Attribute Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="attributes-input"
                    value={newAttr.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewAttr({
                        ...newAttr, 
                        name: val,
                        slug: val.toLowerCase().replace(/\s+/g, '-')
                      });
                    }}
                  />
                </div>

                <div className="attributes-form-col">
                  <label className="attributes-form-label">Attribute Slug *</label>
                  <input 
                    type="text" 
                    required 
                    className="attributes-input"
                    value={newAttr.slug}
                    onChange={(e) => setNewAttr({...newAttr, slug: e.target.value})}
                  />
                  <small className="attributes-form-hint">Unique slug for internal use (e.g. honey-type)</small>
                </div>

                <div className="attributes-form-col">
                  <label className="attributes-form-label">Attribute Type *</label>
                  <select 
                    className="attributes-input attributes-select"
                    value={newAttr.type}
                    onChange={(e) => setNewAttr({...newAttr, type: e.target.value})}
                  >
                    <option value="">Select attribute type</option>
                    <option value="Select">Select</option>
                    <option value="Text">Text</option>
                    <option value="Color">Color</option>
                  </select>
                </div>

                <div className="attributes-form-col">
                  <label className="attributes-form-label">Input Type *</label>
                  <select 
                    className="attributes-input attributes-select"
                    value={newAttr.inputType}
                    onChange={(e) => setNewAttr({...newAttr, inputType: e.target.value})}
                  >
                    <option value="">Select input type</option>
                    <option value="Dropdown">Dropdown</option>
                    <option value="Radio">Radio Buttons</option>
                    <option value="Checkbox">Checkbox List</option>
                  </select>
                  <small className="attributes-form-hint">How the attribute values will be entered</small>
                </div>
              </div>

              <div className="attributes-form-full" style={{ marginTop: '16px' }}>
                <label className="attributes-form-label">Description</label>
                <textarea 
                  rows="3" 
                  maxLength="200"
                  className="attributes-input"
                  value={newAttr.description}
                  onChange={(e) => setNewAttr({...newAttr, description: e.target.value})}
                />
                <div className="attributes-char-counter">
                  <span>Optional description for this attribute</span>
                  <span>{newAttr.description.length} / 200</span>
                </div>
              </div>

              <div className="attributes-form-grid" style={{ marginTop: '16px' }}>
                <div className="attributes-form-col">
                  <label className="attributes-form-label">Display Order</label>
                  <input 
                    type="number" 
                    className="attributes-input"
                    value={newAttr.displayOrder}
                    onChange={(e) => setNewAttr({...newAttr, displayOrder: e.target.value})}
                  />
                  <small className="attributes-form-hint">Lower numbers show first</small>
                </div>

                <div className="attributes-form-col">
                  <label className="attributes-form-label">Status</label>
                  <div className="attributes-radio-group">
                    <label className="attributes-radio-label">
                      <input 
                        type="radio" 
                        name="status" 
                        checked={newAttr.status === 'Active'} 
                        onChange={() => setNewAttr({...newAttr, status: 'Active'})}
                      /> Active
                    </label>
                    <label className="attributes-radio-label">
                      <input 
                        type="radio" 
                        name="status" 
                        checked={newAttr.status === 'Inactive'} 
                        onChange={() => setNewAttr({...newAttr, status: 'Inactive'})}
                      /> Inactive
                    </label>
                  </div>
                  <small className="attributes-form-hint">Active attributes will be visible in the store</small>
                </div>
              </div>

              <div className="attributes-values-section" style={{ marginTop: '20px' }}>
                <div className="attributes-values-header">
                  <label className="attributes-form-label">Attribute Values ▾</label>
                  <div className="attributes-toggle-wrapper">
                    <span>Add Values Manually</span>
                    <label className="attributes-switch">
                      <input 
                        type="checkbox" 
                        checked={newAttr.addValuesManually}
                        onChange={(e) => setNewAttr({...newAttr, addValuesManually: e.target.checked})}
                      />
                      <span className="attributes-slider round"></span>
                    </label>
                  </div>
                </div>

                <div className="attributes-values-box">
                  <label className="attributes-form-label">Add Values</label>
                  <div className="attributes-tag-input-row">
                    <input 
                      type="text" 
                      className="attributes-input"
                      value={valueInput}
                      onChange={(e) => setValueInput(e.target.value)}
                      onKeyDown={handleAddTag}
                    />
                    <button type="button" className="attributes-btn-add-tag" onClick={handleAddTagButton}>
                      Add
                    </button>
                  </div>

                  <div className="attributes-tags-container">
                    {valueTags.map((tag, idx) => (
                      <div className="attributes-tag" key={idx}>
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="attributes-modal-actions">
                <button type="button" className="attributes-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="attributes-btn-save">Save Attribute</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP MODAL FOR ADDING NEW CUSTOMER (NO PLACEHOLDERS & TOP-RIGHT CLOSE CROSS) */}
      {isCustomerModalOpen && (
        <div className="customer-modal-overlay">
          <div className="customer-modal-card">
            <div className="customer-modal-header">
              <h3>Add New Customer</h3>
              <button 
                type="button" 
                className="customer-modal-close" 
                onClick={() => setIsCustomerModalOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="customer-modal-form">
              <div className="customer-form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName"
                  name="fullName"
                  required
                  className="customer-input"
                  value={customerData.fullName}
                  onChange={handleCustomerChange}
                />
              </div>

              <div className="customer-form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  className="customer-input"
                  value={customerData.email}
                  onChange={handleCustomerChange}
                />
              </div>

              <div className="customer-form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  className="customer-input"
                  value={customerData.phone}
                  onChange={handleCustomerChange}
                />
              </div>

              <div className="customer-form-group">
                <label htmlFor="customerGroup">Customer Group</label>
                <select 
                  id="customerGroup"
                  name="customerGroup"
                  className="customer-input customer-select"
                  value={customerData.customerGroup}
                  onChange={handleCustomerChange}
                >
                  <option value="VIP Customers">VIP Customers</option>
                  <option value="Regular Customers">Regular Customers</option>
                  <option value="Wholesale">Wholesale</option>
                </select>
              </div>

              <div className="customer-modal-actions">
                <button 
                  type="button" 
                  className="customer-btn-cancel" 
                  onClick={() => setIsCustomerModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="customer-btn-save">
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attributes;