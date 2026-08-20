import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import API, { IMG_URL } from "../../api/axios"; 
import { Flame, Star, Upload, Search, Filter, Edit, Trash2, Eye, Plus, RotateCcw, Send, X, Loader2 } from 'lucide-react';
import './HoneyProduct.css';
 
const DEFAULT_HONEY_IMG = 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=400&auto=format&fit=crop&q=80';

const INITIAL_FORM_STATE = {
  _id: null,
  name: '',
  slug: '',
  category: '',
  tag: 'Pure & Organic',
  shortDescription: '<p>Light, sweet & perfect for a healthy lifestyle.</p>',
  price: '',
  rating: 5.0,
  buttonText: 'BUY NOW',
  buttonLink: '',
  benefits: ['100% Natural', 'No Added Sugar'],
  status: 'Active',
  featured: false,
  bestSeller: false,
  showHomepage: true,
  displayOrder: 1,
  seoTitle: '',
  seoKeywords: '',
  image: '',
  galleryImages: []
};

const HoneyProduct = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isEditing, setIsEditing] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [newBenefitInput, setNewBenefitInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const mainImgRef = useRef(null);
  const galleryImgRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [featuredFilter, setFeaturedFilter] = useState('All');

  const [viewProduct, setViewProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  // FIX: Robust base URL resolution for images
  const SERVER_ORIGIN = (IMG_URL || 'http://localhost:5000').replace(/\/api\/?$/, '');

  const getImageUrl = (imgPath) => {
    if (!imgPath) return DEFAULT_HONEY_IMG;
    if (imgPath.startsWith('blob:') || imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    const cleanPath = imgPath.startsWith('/') ? imgPath : `/${imgPath}`;
    return `${SERVER_ORIGIN}${cleanPath}`;
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (categoryFilter !== 'All Categories') params.append('category', categoryFilter);
      if (statusFilter !== 'All Status') params.append('status', statusFilter);
      if (ratingFilter !== 'All Ratings') params.append('minRating', ratingFilter);
      if (featuredFilter !== 'All') params.append('featured', featuredFilter);
      params.append('page', currentPage);
      params.append('limit', itemsPerPage);

      const response = await API.get(`/honey-products?${params.toString()}`);
      if (response.data.success) {
        setProducts(response.data.data);
        setTotalPages(response.data.totalPages || 1);
        setTotalItems(response.data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching honey products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, categoryFilter, statusFilter, ratingFilter, featuredFilter, currentPage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, shortDescription: content }));
  };

  const handleMainImgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleGalleryImgUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGalleryFiles((prev) => [...prev, ...files]);
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...previewUrls]
      }));
    }
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddBenefit = () => {
    if (newBenefitInput.trim() !== '') {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefitInput.trim()]
      }));
      setNewBenefitInput('');
    }
  };

  const handleRemoveBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setIsEditing(false);
    setMainImageFile(null);
    setGalleryFiles([]);
    setNewBenefitInput('');
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Please enter product name');
    if (!isEditing && !mainImageFile) return alert('Please upload a main product image');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('slug', formData.slug);
    data.append('category', formData.category);
    data.append('tag', formData.tag);
    data.append('shortDescription', formData.shortDescription);
    data.append('price', formData.price);
    data.append('rating', formData.rating);
    data.append('buttonText', formData.buttonText);
    data.append('buttonLink', formData.buttonLink);
    data.append('status', formData.status);
    data.append('featured', formData.featured);
    data.append('bestSeller', formData.bestSeller);
    data.append('showHomepage', formData.showHomepage);
    data.append('displayOrder', formData.displayOrder);
    data.append('seoTitle', formData.seoTitle);
    data.append('seoKeywords', formData.seoKeywords);
    data.append('benefits', JSON.stringify(formData.benefits));

    if (mainImageFile) {
      data.append('image', mainImageFile);
    }
    galleryFiles.forEach((file) => {
      data.append('galleryImages', file);
    });

    try {
      setLoading(true);
      let response;
      if (isEditing && formData._id) {
        response = await API.put(`/honey-products/${formData._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Honey product updated successfully!');
      } else {
        response = await API.post('/honey-products', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Honey product published successfully!');
      }

      if (response.data.success) {
        handleReset();
        fetchProducts();
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert(error.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (prod) => {
    setFormData({
      ...prod,
      image: prod.image || '',
      galleryImages: prod.galleryImages || []
    });
    setIsEditing(true);
    setMainImageFile(null);
    setGalleryFiles([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      try {
        setLoading(true);
        const res = await API.delete(`/honey-products/${id}`);
        if (res.data.success) {
          alert('Product deleted successfully');
          fetchProducts();
        }
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete product');
      } finally {
        setLoading(false);
      }
    }
  };

  const renderInteractiveStars = () => (
    <div className="honey-product-interactive-star-rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || formData.rating);
        return (
          <Star
            key={star}
            size={22}
            className={`honey-product-glowing-star ${isFilled ? 'active-glow' : 'dim'}`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
          />
        );
      })}
      <span className="honey-product-rating-num-badge">{Number(formData.rating).toFixed(1)}</span>
    </div>
  );

  const renderTableStars = (rating) => (
    <div className="honey-product-table-star-wrap">
      <div className="honey-product-stars-row">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            className={`honey-product-table-star ${s <= Math.round(rating) ? 'gold' : 'gray'}`}
          />
        ))}
      </div>
      <span className="honey-product-table-rating-text">{Number(rating).toFixed(1)}</span>
    </div>
  );

  return (
    <div className="honey-product-container">
      <div className="honey-product-grid">
        {/* LEFT FORM PANEL */}
        <div className="honey-product-glass-panel">
          <div className="honey-product-panel-header">
            <Flame className="honey-product-header-icon" size={20} />
            <h2>{isEditing ? 'Edit Honey Product' : 'Add / Edit Honey Product'}</h2>
          </div>

          <form onSubmit={handlePublish}>
            <div className="honey-product-row">
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Product Name <span className="honey-product-req">*</span></label>
                <input
                  type="text"
                  name="name"
                  placeholder="Acacia Honey"
                  value={formData.name}
                  onChange={(e) => {
                    handleChange(e);
                    if (!isEditing) {
                      setFormData((prev) => ({
                        ...prev,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
                      }));
                    }
                  }}
                  required
                />
              </div>
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Product Slug</label>
                <input
                  type="text"
                  name="slug"
                  placeholder="acacia-honey"
                  value={formData.slug}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="honey-product-row honey-product-mt-12">
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Honey Type/Category <span className="honey-product-req">*</span></label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Acacia Honey, Raw Forest, Organic"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Tag / Badge</label>
                <input type="text" name="tag" placeholder="Pure & Organic" value={formData.tag} onChange={handleChange} />
              </div>
            </div>

            <div className="honey-product-row honey-product-mt-12 honey-product-align-start">
              <div className="honey-product-form-group honey-product-flex-2">
                <label>Short Description <span className="honey-product-req">*</span></label>
                <div className="honey-product-editor-box">
                  <Editor
                    apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu"
                    value={formData.shortDescription}
                    onEditorChange={handleEditorChange}
                    init={{
                      height: 120,
                      menubar: false,
                      plugins: ['lists', 'link'],
                      toolbar: 'bold italic | bullist numlist | removeformat',
                      skin: 'oxide-dark',
                      content_css: 'dark'
                    }}
                  />
                </div>
              </div>
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Price (₹) <span className="honey-product-req">*</span></label>
                <input type="number" name="price" placeholder="599" value={formData.price} onChange={handleChange} required />
              </div>
            </div>

            <div className="honey-product-row honey-product-mt-16">
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Product Image <span className="honey-product-req">*</span></label>
                <input type="file" ref={mainImgRef} onChange={handleMainImgUpload} accept="image/*" style={{ display: 'none' }} />
                <div className="honey-product-image-upload-wrapper">
                  <div className="honey-product-main-thumb-preview">
                    <img 
                      src={getImageUrl(formData.image)} 
                      alt="Main Honey Product" 
                      onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_HONEY_IMG; }}
                    />
                  </div>
                  <div className="honey-product-upload-click-box" onClick={() => mainImgRef.current.click()}>
                    <Upload size={18} className="honey-product-green-icon" />
                    <span>Click to upload</span>
                    <small>JPG, PNG, WebP (Max 2MB)</small>
                  </div>
                </div>
              </div>

              <div className="honey-product-form-group honey-product-flex-1">
                <label>Gallery Images (Optional)</label>
                <input type="file" ref={galleryImgRef} onChange={handleGalleryImgUpload} accept="image/*" multiple style={{ display: 'none' }} />
                <div className="honey-product-gallery-thumbs-grid">
                  {formData.galleryImages.map((img, idx) => (
                    <div key={idx} className="honey-product-gallery-thumb-item">
                      <img 
                        src={getImageUrl(img)} 
                        alt={`gallery-${idx}`}
                        onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_HONEY_IMG; }} 
                      />
                      <button type="button" className="honey-product-btn-del-thumb" onClick={() => removeGalleryImage(idx)}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <div className="honey-product-add-gallery-btn" onClick={() => galleryImgRef.current.click()}>
                    <Plus size={18} />
                  </div>
                </div>
              </div>
            </div>

            <div className="honey-product-row honey-product-mt-16 honey-product-align-center">
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Rating (Stars) <span className="honey-product-req">*</span></label>
                {renderInteractiveStars()}
              </div>
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Button Text</label>
                <input type="text" name="buttonText" placeholder="BUY NOW" value={formData.buttonText} onChange={handleChange} />
              </div>
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Button Link</label>
                <input type="text" name="buttonLink" placeholder="/products/acacia-honey" value={formData.buttonLink} onChange={handleChange} />
              </div>
            </div>

            <div className="honey-product-row honey-product-mt-16">
              <div className="honey-product-sub-glass-card honey-product-flex-1">
                <label className="honey-product-sub-title">Product Details (Benefits/Highlights)</label>
                <div className="honey-product-mt-8">
                  {formData.benefits.map((item, idx) => (
                    <div key={idx} className="honey-product-benefit-item-row">
                      <span className="honey-product-benefit-check">✓</span>
                      <span className="honey-product-benefit-text">{item}</span>
                      <button type="button" className="honey-product-btn-del-benefit" onClick={() => handleRemoveBenefit(idx)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="honey-product-add-benefit-input-row honey-product-mt-8">
                  <input type="text" placeholder="Add benefit..." value={newBenefitInput} onChange={(e) => setNewBenefitInput(e.target.value)} />
                  <button type="button" className="honey-product-btn-add-benefit" onClick={handleAddBenefit}>
                    + Add Benefit
                  </button>
                </div>
              </div>

              <div className="honey-product-sub-glass-card honey-product-flex-1">
                <label className="honey-product-sub-title">Status & Visibility</label>
                <div className="honey-product-toggle-group">
                  <div className="honey-product-toggle-item">
                    <label className="honey-product-switch">
                      <input 
                        type="checkbox" 
                        checked={formData.status === 'Active'} 
                        onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.checked ? 'Active' : 'Inactive' }))} 
                      />
                      <span className="honey-product-slider"></span>
                    </label>
                    <span className="honey-product-toggle-lbl">{formData.status}</span>
                  </div>
                  <div className="honey-product-toggle-item">
                    <label className="honey-product-switch">
                      <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                      <span className="honey-product-slider"></span>
                    </label>
                    <span className="honey-product-toggle-lbl">Featured</span>
                  </div>
                  <div className="honey-product-toggle-item">
                    <label className="honey-product-switch">
                      <input type="checkbox" name="bestSeller" checked={formData.bestSeller} onChange={handleChange} />
                      <span className="honey-product-slider"></span>
                    </label>
                    <span className="honey-product-toggle-lbl">Best Seller</span>
                  </div>
                  <div className="honey-product-toggle-item">
                    <label className="honey-product-switch">
                      <input type="checkbox" name="showHomepage" checked={formData.showHomepage} onChange={handleChange} />
                      <span className="honey-product-slider"></span>
                    </label>
                    <span className="honey-product-toggle-lbl">Show on Homepage</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="honey-product-row honey-product-mt-16">
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Display Order</label>
                <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} />
                <small className="honey-product-hint-txt">Lower number shows first</small>
              </div>
              <div className="honey-product-form-group honey-product-flex-2">
                <label>SEO Title</label>
                <input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleChange} />
              </div>
              <div className="honey-product-form-group honey-product-flex-2">
                <label>SEO Keywords</label>
                <input type="text" name="seoKeywords" value={formData.seoKeywords} onChange={handleChange} />
              </div>
            </div>

            <div className="honey-product-form-actions-row honey-product-mt-20">
              <button type="submit" disabled={loading} className="honey-product-btn-action honey-product-btn-green-publish">
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                {isEditing ? 'Update Product' : 'Publish Product'}
              </button>
              <button type="button" className="honey-product-btn-action honey-product-btn-green-reset" onClick={handleReset}>
                <RotateCcw size={15} /> Reset
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT LIST PANEL */}
        <div className="honey-product-glass-panel">
          <div className="honey-product-list-top-bar">
            <div className="honey-product-panel-header honey-product-no-border">
              <Flame className="honey-product-header-icon" size={20} />
              <h2>Honey Products List</h2>
            </div>
            <button className="honey-product-btn-add-new-green" onClick={handleReset}>
              + Add New Honey Product
            </button>
          </div>

          <div className="honey-product-filters-row honey-product-mt-12">
            <div className="honey-product-search-box-green honey-product-flex-2">
              <input type="text" placeholder="Search honey products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <Search size={15} className="honey-product-search-icon" />
            </div>
            <div className="honey-product-filter-box-wrap">
              <Filter size={14} />
              <span>Filter</span>
            </div>
          </div>

          <div className="honey-product-filter-dropdowns-grid honey-product-mt-8">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="All Categories">All Categories</option>
              <option value="Acacia Honey">Acacia Honey</option>
              <option value="Multiflora">Multiflora</option>
              <option value="Forest Honey">Forest Honey</option>
              <option value="Tulsi Honey">Tulsi Honey</option>
              <option value="Jamun Honey">Jamun Honey</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
              <option value="All Ratings">All Ratings</option>
              <option value="5.0">5.0 Star Only</option>
              <option value="4.8">4.8 & Above</option>
            </select>
            <select value={featuredFilter} onChange={(e) => setFeaturedFilter(e.target.value)}>
              <option value="All">Featured (All)</option>
              <option value="Featured">Featured Only</option>
              <option value="Non-Featured">Non-Featured</option>
            </select>
          </div>

          <div className="honey-product-table-wrapper-green honey-product-mt-16">
            <table className="honey-product-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="honey-product-no-data">
                      <Loader2 size={24} className="animate-spin inline-block" /> Loading honey products...
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((prod, idx) => (
                    <tr key={prod._id || idx}>
                      <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="honey-product-row-img">
                        <img 
                          src={getImageUrl(prod.image)} 
                          alt={prod.name}
                          onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_HONEY_IMG; }}
                        />
                      </td>
                      <td>
                        <div className="honey-product-p-name">{prod.name}</div>
                        <span className="honey-product-p-tag-pill">{prod.tag}</span>
                        <div className="honey-product-p-short-desc" dangerouslySetInnerHTML={{ __html: prod.shortDescription }} />
                      </td>
                      <td>{prod.category}</td>
                      <td className="honey-product-row-price">₹{prod.price}</td>
                      <td>{renderTableStars(prod.rating)}</td>
                      <td>
                        <span className={`honey-product-status-pill ${prod.status === 'Active' ? 'active' : 'inactive'}`}>
                          {prod.status}
                        </span>
                      </td>
                      <td>
                        <div className="honey-product-action-buttons">
                          <button className="honey-product-btn-tbl-icon honey-product-btn-tbl-edit" title="Edit Product" onClick={() => handleEdit(prod)}>
                            <Edit size={14} />
                          </button>
                          <button className="honey-product-btn-tbl-icon honey-product-btn-tbl-view" title="View Product" onClick={() => setViewProduct(prod)}>
                            <Eye size={14} />
                          </button>
                          <button className="honey-product-btn-tbl-icon honey-product-btn-tbl-delete" title="Remove Product" onClick={() => handleDelete(prod._id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="honey-product-no-data">
                      No honey products found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="honey-product-pagination-green-wrapper honey-product-mt-20">
            <span className="honey-product-showing-info">
              Showing {products.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} products
            </span>
            <div className="honey-product-pagination-controls">
              <button className="honey-product-btn-page-green" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                &lt; Prev
              </button>
              <div className="honey-product-page-numbers-green">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`honey-product-page-num-green ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              <button className="honey-product-btn-page-green" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                Next &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {viewProduct && (
        <div className="honey-product-modal-overlay" onClick={() => setViewProduct(null)}>
          <div className="honey-product-modal-card-green" onClick={(e) => e.stopPropagation()}>
            <div className="honey-product-modal-header">
              <h3>{viewProduct.name}</h3>
              <button className="honey-product-close-btn" onClick={() => setViewProduct(null)}>
                <X size={18} />
              </button>
            </div>
            <div>
              <img 
                src={getImageUrl(viewProduct.image)} 
                alt={viewProduct.name} 
                className="honey-product-modal-img" 
                onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_HONEY_IMG; }}
              />
              <p><strong>Category:</strong> {viewProduct.category}</p>
              <p><strong>Price:</strong> ₹{viewProduct.price}</p>
              <p><strong>Tag:</strong> {viewProduct.tag}</p>
              <div className="honey-product-mt-8">
                <strong>Benefits:</strong>
                <ul>
                  {viewProduct.benefits && viewProduct.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoneyProduct;