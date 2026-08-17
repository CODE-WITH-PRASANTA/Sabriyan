import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Attributes.css';
import API from '../../api/axios';

const bannerImg = "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1200&auto=format&fit=crop";
const defaultFallbackImg = "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=200&auto=format&fit=crop";

const Attributes = () => {
  // Data States
  const [attributes, setAttributes] = useState([]);
  const [stats, setStats] = useState({ totalAttributes: 0, activeAttributes: 0 });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter, Sort, & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
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

  // Attribute Form State
  const [newAttr, setNewAttr] = useState({
    name: '',
    slug: '',
    type: '',
    inputType: '',
    description: '',
    displayOrder: 1,
    status: 'Active',
    addValuesManually: true,
  });
  const [valueInput, setValueInput] = useState('');
  const [valueTags, setValueTags] = useState(['Raw Honey', 'Organic Honey', 'Floral Honey']);

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

  // 1. FETCH ATTRIBUTES FROM BACKEND API
  const fetchAttributes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get('/attributes', {
        params: {
          search: searchTerm,
          status: statusFilter,
          sort: sortOrder,
          page: currentPage,
          limit: 6,
        },
      });

      if (response.data?.success) {
        setAttributes(response.data.data || []);
        setStats(response.data.stats || { totalAttributes: 0, activeAttributes: 0 });
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
      console.error('Error fetching attributes:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, sortOrder, currentPage]);

  useEffect(() => {
    fetchAttributes();
  }, [fetchAttributes]);

  // Tag Handlers
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
    setValueTags(valueTags.filter((tag) => tag !== tagToRemove));
  };

  // 2. CREATE ATTRIBUTE
  const handleSaveAttribute = async (e) => {
    e.preventDefault();
    if (!newAttr.name.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: newAttr.name.trim(),
        slug: newAttr.slug.trim(),
        type: newAttr.type || 'Select',
        inputType: newAttr.inputType || 'Dropdown',
        description: newAttr.description,
        displayOrder: newAttr.displayOrder,
        status: newAttr.status,
        addValuesManually: newAttr.addValuesManually,
        values: valueTags,
      };

      const response = await API.post('/attributes', payload);

      if (response.data?.success) {
        setIsModalOpen(false);
        setNewAttr({
          name: '',
          slug: '',
          type: '',
          inputType: '',
          description: '',
          displayOrder: 1,
          status: 'Active',
          addValuesManually: true,
        });
        setValueTags(['Raw Honey', 'Organic Honey']);
        fetchAttributes();
      }
    } catch (error) {
      console.error('Error saving attribute:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to save attribute');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. TOGGLE ATTRIBUTE STATUS
  const handleToggleStatus = async (id) => {
    try {
      const response = await API.patch(`/attributes/${id}/status`);
      if (response.data?.success) {
        fetchAttributes();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    } finally {
      setOpenMenuId(null);
    }
  };

  // 4. DELETE ATTRIBUTE
  const handleDeleteAttribute = async (id) => {
    if (!window.confirm('Are you sure you want to delete this attribute?')) return;
    try {
      const response = await API.delete(`/attributes/${id}`);
      if (response.data?.success) {
        fetchAttributes();
      }
    } catch (error) {
      console.error('Error deleting attribute:', error);
    } finally {
      setOpenMenuId(null);
    }
  };

  // Pagination Handler
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const firstItemIndex = (pagination.currentPage - 1) * pagination.limit + 1;
  const lastItemIndex = Math.min(
    pagination.currentPage * pagination.limit,
    pagination.totalItems
  );

  return (
    <div className="attributes-container">
      {/* Banner Section */}
      <section className="attributes-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="attributes-banner__content">
          <h2>Manage Attributes</h2>
          <p>Create and manage product attributes</p>
          <button className="attributes-add-btn" onClick={() => setIsModalOpen(true)}>
            <span>+</span> Add New Attribute
          </button>
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
            <h3 className="attributes-stat-value">{stats.totalAttributes}</h3>
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
            <h3 className="attributes-stat-value">{stats.activeAttributes}</h3>
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="attributes-filters">
          <div className="attributes-dropdown">
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
        {loading ? (
          <p className="attributes-no-data">Loading attributes...</p>
        ) : attributes.length > 0 ? (
          attributes.map((attr) => {
            const attrId = attr._id || attr.id;
            const valuesCount = attr.values ? attr.values.length : 0;
            return (
              <div className="attributes-card-item" key={attrId}>
                <div className="attributes-card-left">
                  <img
                    src={attr.image || defaultFallbackImg}
                    alt={attr.name}
                    className="attributes-item-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultFallbackImg;
                    }}
                  />
                  <div className="attributes-item-info">
                    <h4>{attr.name}</h4>
                    <p>{attr.description}</p>
                  </div>
                </div>
                <div className="attributes-card-right">
                  <span className="attributes-value-badge">Values: {valuesCount}</span>
                  <span className={`attributes-status-badge ${(attr.status || 'Active').toLowerCase()}`}>
                    {attr.status}
                  </span>
                  <div
                    className="attributes-action-wrapper"
                    ref={openMenuId === attrId ? menuRef : null}
                  >
                    <button
                      className="attributes-options-btn"
                      aria-label="More options"
                      onClick={() => setOpenMenuId(openMenuId === attrId ? null : attrId)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>

                    {openMenuId === attrId && (
                      <div className="attributes-dropdown-menu">
                        <button onClick={() => handleToggleStatus(attrId)}>
                          Mark as {attr.status === 'Active' ? 'Inactive' : 'Active'}
                        </button>
                        <button
                          onClick={() => handleDeleteAttribute(attrId)}
                          style={{ color: '#e53e3e' }}
                        >
                          Delete Attribute
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="attributes-no-data">No attributes found.</p>
        )}
      </div>

      {/* Pagination Footer */}
      <footer className="attributes-footer">
        <span className="attributes-pagination-info">
          Showing {pagination.totalItems > 0 ? firstItemIndex : 0} to {lastItemIndex} of{' '}
          {pagination.totalItems} attributes
        </span>
        <div className="attributes-pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="attributes-page-arrow"
          >
            &lt;
          </button>
          {[...Array(pagination.totalPages)].map((_, index) => (
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
            disabled={currentPage === pagination.totalPages || pagination.totalPages === 0}
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
              <button className="attributes-modal-close" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
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
                        slug: val.toLowerCase().replace(/\s+/g, '-'),
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
                    onChange={(e) => setNewAttr({ ...newAttr, slug: e.target.value })}
                  />
                  <small className="attributes-form-hint">
                    Unique slug for internal use (e.g. honey-type)
                  </small>
                </div>

                <div className="attributes-form-col">
                  <label className="attributes-form-label">Attribute Type *</label>
                  <select
                    className="attributes-input attributes-select"
                    value={newAttr.type}
                    onChange={(e) => setNewAttr({ ...newAttr, type: e.target.value })}
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
                    onChange={(e) => setNewAttr({ ...newAttr, inputType: e.target.value })}
                  >
                    <option value="">Select input type</option>
                    <option value="Dropdown">Dropdown</option>
                    <option value="Radio">Radio Buttons</option>
                    <option value="Checkbox">Checkbox List</option>
                  </select>
                  <small className="attributes-form-hint">
                    How the attribute values will be entered
                  </small>
                </div>
              </div>

              <div className="attributes-form-full" style={{ marginTop: '16px' }}>
                <label className="attributes-form-label">Description</label>
                <textarea
                  rows="3"
                  maxLength="200"
                  className="attributes-input"
                  value={newAttr.description}
                  onChange={(e) => setNewAttr({ ...newAttr, description: e.target.value })}
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
                    onChange={(e) => setNewAttr({ ...newAttr, displayOrder: e.target.value })}
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
                        onChange={() => setNewAttr({ ...newAttr, status: 'Active' })}
                      />{' '}
                      Active
                    </label>
                    <label className="attributes-radio-label">
                      <input
                        type="radio"
                        name="status"
                        checked={newAttr.status === 'Inactive'}
                        onChange={() => setNewAttr({ ...newAttr, status: 'Inactive' })}
                      />{' '}
                      Inactive
                    </label>
                  </div>
                  <small className="attributes-form-hint">
                    Active attributes will be visible in the store
                  </small>
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
                        onChange={(e) =>
                          setNewAttr({ ...newAttr, addValuesManually: e.target.checked })
                        }
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
                    <button
                      type="button"
                      className="attributes-btn-add-tag"
                      onClick={handleAddTagButton}
                    >
                      Add
                    </button>
                  </div>

                  <div className="attributes-tags-container">
                    {valueTags.map((tag, idx) => (
                      <div className="attributes-tag" key={idx}>
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="attributes-modal-actions">
                <button
                  type="button"
                  className="attributes-btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="attributes-btn-save" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Attribute'}
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