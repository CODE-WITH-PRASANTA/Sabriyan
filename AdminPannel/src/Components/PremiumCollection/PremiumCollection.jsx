import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import API, { IMG_URL } from '../../api/axios';
   
import {
  ShoppingBag,
  Package,
  Star,
  Upload,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Send
} from 'lucide-react';
import './PremiumCollection.css';

const INITIAL_FORM_STATE = {
  _id: null,
  name: '',
  slug: '',
  category: '',
  shortTitle: '',
  description: '',
  rating: 5,
  mrp: '',
  sellingPrice: '',
  discount: '',
  cocoa: '',
  weight: '',
  sweetness: 'Medium',
  status: 'Active',
  featured: 'Yes',
  trending: 'Yes',
  metaTitle: '',
  metaKeywords: '',
  metaDescription: '',
  displayOrder: '1',
  image: '',
  bgImage: '',
  galleryImages: []
};

export const resolveImgUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=800';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
    return path;
  }
  const cleanPath = path.replace(/\\/g, '/').replace(/^\/?public\/?/, '');
  const base = IMG_URL || 'http://localhost:5000';
  return `${base.replace(/\/$/, '')}/${cleanPath.replace(/^\//, '')}`;
};

const PremiumCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isEditing, setIsEditing] = useState(false);

  // Binary Files State
  const [mainImageFile, setMainImageFile] = useState(null);
  const [bgImageFile, setBgImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  // File Input References
  const mainImageInputRef = useRef(null);
  const bgImageInputRef = useRef(null);
  const galleryImageInputRef = useRef(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [featuredFilter, setFeaturedFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');

  // Modal & Pagination
  const [viewProduct, setViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  // 1. Fetch Products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage
      };

      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (categoryFilter.trim()) params.category = categoryFilter.trim();
      if (statusFilter !== 'All Status') params.status = statusFilter;
      if (featuredFilter !== 'All') params.featured = featuredFilter === 'Featured' ? 'Yes' : 'No';
      if (ratingFilter !== 'All Ratings') params.rating = ratingFilter;

      const response = await API.get('/premium-collection', { params });

      if (response.data && response.data.success) {
        setProducts(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, categoryFilter, statusFilter, featuredFilter, ratingFilter, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Form Field Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      const mrpVal = parseFloat(name === 'mrp' ? value : prev.mrp) || 0;
      const sellingVal = parseFloat(name === 'sellingPrice' ? value : prev.sellingPrice) || 0;
      
      if (mrpVal > 0 && sellingVal > 0 && sellingVal <= mrpVal) {
        updated.discount = Math.round(((mrpVal - sellingVal) / mrpVal) * 100).toString();
      } else {
        updated.discount = '';
      }
      return updated;
    });
  };

  // Image Upload Handlers
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleBgImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBgImageFile(file);
      setFormData((prev) => ({ ...prev, bgImage: URL.createObjectURL(file) }));
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGalleryFiles((prev) => [...prev, ...files]);
      const newUrls = files.map((f) => URL.createObjectURL(f));
      setFormData((prev) => ({
        ...prev,
        galleryImages: [...(prev.galleryImages || []), ...newUrls]
      }));
    }
  };

  const removeGalleryImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, idx) => idx !== indexToRemove)
    }));
    setGalleryFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Submit Handler
  const handlePublish = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Please enter product name');
    if (!formData.category.trim()) return alert('Please enter product category');
    if (!formData.sellingPrice) return alert('Please enter selling price');

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (!['image', 'bgImage', 'galleryImages', '_id'].includes(key)) {
          data.append(key, formData[key] ?? '');
        }
      });

      if (mainImageFile) data.append('image', mainImageFile);
      if (bgImageFile) data.append('bgImage', bgImageFile);
      galleryFiles.forEach((file) => data.append('galleryImages', file));

      // Append existing gallery image URLs when editing
      if (isEditing) {
        const existingGallery = (formData.galleryImages || []).filter((img) => !img.startsWith('blob:'));
        data.append('existingGalleryImages', JSON.stringify(existingGallery));
      }

      if (isEditing && formData._id) {
        await API.put(`/premium-collection/${formData._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Product updated successfully!');
      } else {
        await API.post('/premium-collection', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Product published successfully!');
      }

      handleReset();
      fetchProducts();
    } catch (err) {
      console.error('Save error:', err);
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setMainImageFile(null);
    setBgImageFile(null);
    setGalleryFiles([]);
    setIsEditing(false);
    if (mainImageInputRef.current) mainImageInputRef.current.value = '';
    if (bgImageInputRef.current) bgImageInputRef.current.value = '';
    if (galleryImageInputRef.current) galleryImageInputRef.current.value = '';
  };

  const handleEdit = (product) => {
    setFormData({
      ...INITIAL_FORM_STATE,
      ...product,
      featured: product.featured === true || product.featured === 'Yes' ? 'Yes' : 'No',
      trending: product.trending === true || product.trending === 'Yes' ? 'Yes' : 'No',
      galleryImages: product.galleryImages || product.images || []
    });
    setMainImageFile(null);
    setBgImageFile(null);
    setGalleryFiles([]);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/premium-collection/${id}`);
        fetchProducts();
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete product');
      }
    }
  };

  const renderStars = (rating, interactive = false) => (
    <div className="star-rating-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={interactive ? 18 : 14}
          className={`star-icon ${star <= rating ? 'filled' : 'empty'}`}
          onClick={() => interactive && setFormData((prev) => ({ ...prev, rating: star }))}
        />
      ))}
    </div>
  );

  return (
    <div className="premium-container">
      <div className="premium-grid">
        {/* ================= LEFT FORM PANEL ================= */}
        <div className="card-panel form-card">
          <div className="card-header">
            <ShoppingBag className="header-icon" size={20} />
            <h2>{isEditing ? 'Edit Premium Collection' : 'Add Premium Collection'}</h2>
          </div>

          <form onSubmit={handlePublish} className="form-body">
            {/* Basic Info */}
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-row gap-12">
                <div className="form-group flex-1">
                  <label>Product Name <span className="req">*</span></label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => {
                      handleChange(e);
                      if (!isEditing) {
                        setFormData((prev) => ({
                          ...prev,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                        }));
                      }
                    }}
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Product Slug</label>
                  <input
                    type="text"
                    name="slug"
                    placeholder="e.g. dark-classic"
                    value={formData.slug}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row gap-12 mt-12">
                <div className="form-group flex-1">
                  <label>Category <span className="req">*</span></label>
                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. Premium Collection"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Short Title</label>
                  <input
                    type="text"
                    name="shortTitle"
                    placeholder="e.g. 70% Cocoa Rich"
                    value={formData.shortTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Rich Text */}
              <div className="form-group mt-12">
                <label>Description</label>
                <div className="editor-wrapper">
                  <Editor
                    apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu"
                    value={formData.description}
                    onEditorChange={handleEditorChange}
                    init={{
                      height: 180,
                      menubar: false,
                      plugins: ['advlist', 'autolink', 'lists', 'link', 'code'],
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | removeformat',
                      skin: 'oxide-dark',
                      content_css: 'dark'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="sub-card mt-16">
              <div className="sub-card-header">
                <ShoppingBag size={16} />
                <span>Price Information</span>
              </div>
              <div className="form-row gap-12 mt-8">
                <div className="form-group flex-1">
                  <label>MRP (₹)</label>
                  <input
                    type="number"
                    name="mrp"
                    placeholder="0.00"
                    value={formData.mrp}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Selling Price (₹) <span className="req">*</span></label>
                  <input
                    type="number"
                    name="sellingPrice"
                    placeholder="0.00"
                    value={formData.sellingPrice}
                    onChange={handlePriceChange}
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Discount (%)</label>
                  <input
                    type="text"
                    name="discount"
                    placeholder="Auto-calculated"
                    value={formData.discount ? `${formData.discount}%` : ''}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Specs & Attributes */}
            <div className="sub-card mt-12">
              <div className="sub-card-header">
                <Package size={16} />
                <span>Chocolate & Quality Details</span>
              </div>
              <div className="form-row gap-12 mt-8">
                <div className="form-group flex-1">
                  <label>Cocoa (%)</label>
                  <input
                    type="text"
                    name="cocoa"
                    placeholder="e.g. 70%"
                    value={formData.cocoa}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Weight</label>
                  <input
                    type="text"
                    name="weight"
                    placeholder="e.g. 80g"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Sweetness</label>
                  <select name="sweetness" value={formData.sweetness} onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="form-group flex-1">
                  <label>Rating</label>
                  <div className="star-select-wrapper mt-2">
                    {renderStars(formData.rating, true)}
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="sub-card mt-12">
              <div className="sub-card-header">
                <Upload size={16} />
                <span>Product Images</span>
              </div>

              <input type="file" ref={mainImageInputRef} onChange={handleMainImageUpload} accept="image/*" style={{ display: 'none' }} />
              <input type="file" ref={bgImageInputRef} onChange={handleBgImageUpload} accept="image/*" style={{ display: 'none' }} />
              <input type="file" ref={galleryImageInputRef} onChange={handleGalleryUpload} accept="image/*" multiple style={{ display: 'none' }} />

              <div className="image-upload-grid-large mt-12">
                <div className="upload-box-large flex-1">
                  <label className="upload-lbl-large">Main Product Image</label>
                  <div className="large-preview-container" onClick={() => mainImageInputRef.current.click()}>
                    {formData.image ? (
                      <img src={resolveImgUrl(formData.image)} alt="Main Product" className="large-img-preview" />
                    ) : (
                      <div className="upload-placeholder-box">
                        <Upload size={24} />
                        <span>Upload Main Image</span>
                      </div>
                    )}
                    <button type="button" className="btn-upload-overlay">Change Image</button>
                  </div>
                </div>

                <div className="upload-box-large flex-1">
                  <label className="upload-lbl-large">Background Banner (Optional)</label>
                  <div className="large-preview-container" onClick={() => bgImageInputRef.current.click()}>
                    {formData.bgImage ? (
                      <img src={resolveImgUrl(formData.bgImage)} alt="Background" className="large-img-preview bg-banner" />
                    ) : (
                      <div className="upload-placeholder-box">
                        <Upload size={24} />
                        <span>Upload Banner</span>
                      </div>
                    )}
                    <button type="button" className="btn-upload-overlay">Change Banner</button>
                  </div>
                </div>
              </div>

              {/* Gallery Preview */}
              <div className="gallery-upload-large mt-12">
                <label className="upload-lbl-large">Gallery Images</label>
                <div className="gallery-thumbs-large">
                  {formData.galleryImages?.map((imgUrl, idx) => (
                    <div key={idx} className="large-mini-thumb">
                      <img src={resolveImgUrl(imgUrl)} alt={`gallery-${idx}`} />
                      <button type="button" className="btn-remove-thumb" onClick={() => removeGalleryImage(idx)}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <button type="button" className="add-large-thumb-btn" onClick={() => galleryImageInputRef.current.click()}>
                    <Plus size={20} />
                    <span>Add Image</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Status & Visibility */}
            <div className="sub-card mt-12">
              <div className="sub-card-header">
                <Check size={16} />
                <span>Product Status & Visibility</span>
              </div>
              <div className="form-row gap-12 mt-8 align-center">
                <div className="form-group flex-1">
                  <label>Status</label>
                  <div className="toggle-wrapper mt-4">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={formData.status === 'Active'}
                        onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.checked ? 'Active' : 'Inactive' }))}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className="toggle-status-lbl">{formData.status}</span>
                  </div>
                </div>

                <div className="form-group flex-1">
                  <label>Featured</label>
                  <select name="featured" value={formData.featured} onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group flex-1">
                  <label>Trending</label>
                  <select name="trending" value={formData.trending} onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="sub-card mt-12">
              <div className="sub-card-header">
                <Search size={16} />
                <span>SEO Information</span>
              </div>
              <div className="form-row gap-12 mt-8">
                <div className="form-group flex-2">
                  <label>Meta Title</label>
                  <input type="text" name="metaTitle" placeholder="SEO Title" value={formData.metaTitle} onChange={handleChange} />
                </div>
                <div className="form-group flex-2">
                  <label>Meta Keywords</label>
                  <input type="text" name="metaKeywords" placeholder="Keywords" value={formData.metaKeywords} onChange={handleChange} />
                </div>
                <div className="form-group flex-1">
                  <label>Order</label>
                  <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group mt-8">
                <label>Meta Description</label>
                <textarea name="metaDescription" rows="2" placeholder="SEO Description..." value={formData.metaDescription} onChange={handleChange}></textarea>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions-row mt-16">
              <button type="submit" className="btn-action btn-publish">
                <Send size={16} /> {isEditing ? 'Update Product' : 'Publish Product'}
              </button>
              <button type="button" className="btn-action btn-reset" onClick={handleReset}>
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </form>
        </div>

        {/* ================= RIGHT LIST PANEL ================= */}
        <div className="card-panel list-card">
          <div className="list-top-bar">
            <div className="card-header border-0 p-0">
              <Package className="header-icon" size={20} />
              <h2>Premium Collection List</h2>
            </div>

            <div className="search-filter-controls">
              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search product..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                />
              </div>

              <button
                className="btn-filter-toggle"
                onClick={() => {
                  setCategoryFilter('');
                  setStatusFilter('All Status');
                  setFeaturedFilter('All');
                  setRatingFilter('All Ratings');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
              >
                <Filter size={15} /> Reset Filter
              </button>
            </div>
          </div>

          <div className="filters-dropdown-grid">
            <div className="filter-item">
              <label>Category</label>
              <input
                type="text"
                placeholder="Filter category..."
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div className="filter-item">
              <label>Status</label>
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Featured</label>
              <select value={featuredFilter} onChange={(e) => { setFeaturedFilter(e.target.value); setCurrentPage(1); }}>
                <option value="All">All</option>
                <option value="Featured">Featured</option>
                <option value="Not Featured">Not Featured</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Rating</label>
              <select value={ratingFilter} onChange={(e) => { setRatingFilter(e.target.value); setCurrentPage(1); }}>
                <option value="All Ratings">All Ratings</option>
                <option value="5">5 Star Only</option>
                <option value="4">4 Star & Above</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrapper">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Rating</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Featured</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="no-data">Loading product list...</td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((prod, idx) => (
                    <tr key={prod._id || prod.id}>
                      <td className="row-num">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="row-img">
                        <img src={resolveImgUrl(prod.image)} alt={prod.name} />
                      </td>
                      <td className="row-details">
                        <div className="p-title">{prod.name}</div>
                        <div className="p-subtitle">{prod.shortTitle}</div>
                      </td>
                      <td className="row-rating">{renderStars(prod.rating || 5)}</td>
                      <td className="row-price">
                        <div className="selling-p">₹{prod.sellingPrice}</div>
                        {prod.mrp && <div className="mrp-p">₹{prod.mrp}</div>}
                      </td>
                      <td className="row-category">
                        <span className="cat-pill">{prod.category}</span>
                      </td>
                      <td className="row-featured">
                        {prod.featured === true || prod.featured === 'Yes' ? (
                          <span className="icon-circle icon-check"><Check size={14} /></span>
                        ) : (
                          <span className="icon-circle icon-cross"><X size={14} /></span>
                        )}
                      </td>
                      <td className="row-status">
                        <span className={`status-pill ${prod.status === 'Active' ? 'active' : 'inactive'}`}>
                          {prod.status}
                        </span>
                      </td>
                      <td className="row-actions">
                        <div className="action-buttons">
                          <button className="btn-icon btn-view" title="View Product" onClick={() => setViewProduct(prod)}>
                            <Eye size={15} />
                          </button>
                          <button className="btn-icon btn-edit" title="Edit Product" onClick={() => handleEdit(prod)}>
                            <Edit size={15} />
                          </button>
                          <button className="btn-icon btn-delete" title="Remove Product" onClick={() => handleDelete(prod._id || prod.id)}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-data">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-wrapper">
            <button
              className="btn-page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  className={`page-num ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              className="btn-page"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {viewProduct && (
        <div className="modal-overlay" onClick={() => setViewProduct(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{viewProduct.name}</h3>
              <button className="close-btn" onClick={() => setViewProduct(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <img src={resolveImgUrl(viewProduct.image)} alt={viewProduct.name} className="modal-img" />
              <div className="modal-info">
                <p><strong>Category:</strong> {viewProduct.category}</p>
                <p><strong>Short Title:</strong> {viewProduct.shortTitle || '—'}</p>
                <p><strong>Price:</strong> ₹{viewProduct.sellingPrice} {viewProduct.mrp && `(MRP: ₹${viewProduct.mrp})`}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
                  <strong>Rating:</strong> {renderStars(viewProduct.rating || 5)}
                </div>
                <div>
                  <strong>Description:</strong>
                  <div
                    className="modal-description-html"
                    dangerouslySetInnerHTML={{ __html: viewProduct.description || 'No description provided.' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumCollection;