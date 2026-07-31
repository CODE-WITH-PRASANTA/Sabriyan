import React, { useState, useMemo, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
  Flame,
  Star,
  Upload,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Plus,
  RotateCcw,
  RefreshCw,
  Send,
  X
} from 'lucide-react';
import './HoneyProduct.css';

// Default Fallback Sample Images
const DEFAULT_HONEY_IMG = 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=400&auto=format&fit=crop&q=80';
const DEFAULT_GALLERY_1 = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80';
const DEFAULT_GALLERY_2 = 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&auto=format&fit=crop&q=80';

// Dummy Data matching reference UI
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Acacia Honey',
    slug: 'acacia-honey',
    category: 'Acacia Honey',
    tag: 'Pure & Organic',
    shortDescription: '<p>Light, sweet & perfect for a healthy lifestyle.</p>',
    price: 599,
    rating: 5.0,
    buttonText: 'BUY NOW',
    buttonLink: '/products/acacia-honey',
    benefits: ['100% Natural', 'No Added Sugar', 'Carefully Harvested', 'Rich in Nutrients'],
    status: 'Active',
    featured: true,
    bestSeller: false,
    showHomepage: true,
    displayOrder: 1,
    seoTitle: 'Acacia Honey – Pure & Organic',
    seoKeywords: 'honey, acacia, organic honey',
    image: DEFAULT_HONEY_IMG,
    galleryImages: [DEFAULT_GALLERY_1, DEFAULT_GALLERY_2]
  },
  {
    id: 2,
    name: 'Multiflora Honey',
    slug: 'multiflora-honey',
    category: 'Multiflora',
    tag: 'Raw Harvest',
    shortDescription: '<p>A blend of natural floral goodness.</p>',
    price: 549,
    rating: 4.8,
    buttonText: 'BUY NOW',
    buttonLink: '/products/multiflora-honey',
    benefits: ['Raw & Wild', 'Boosts Energy', 'Antioxidant Rich'],
    status: 'Active',
    featured: true,
    bestSeller: true,
    showHomepage: true,
    displayOrder: 2,
    seoTitle: 'Multiflora Honey – Raw Harvest',
    seoKeywords: 'multiflora, raw honey',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80',
    galleryImages: [DEFAULT_GALLERY_1]
  },
  {
    id: 3,
    name: 'Wild Forest Honey',
    slug: 'wild-forest-honey',
    category: 'Forest Honey',
    tag: 'Pure & Raw',
    shortDescription: '<p>Naturally sourced from wild forest.</p>',
    price: 649,
    rating: 4.9,
    buttonText: 'BUY NOW',
    buttonLink: '/products/wild-forest-honey',
    benefits: ['Sourced from Forests', 'Immunity Booster', 'Unfiltered'],
    status: 'Active',
    featured: false,
    bestSeller: true,
    showHomepage: true,
    displayOrder: 3,
    seoTitle: 'Wild Forest Honey – Pure & Raw',
    seoKeywords: 'forest honey, wild honey',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&auto=format&fit=crop&q=80',
    galleryImages: [DEFAULT_GALLERY_2]
  },
  {
    id: 4,
    name: 'Tulsi Honey',
    slug: 'tulsi-honey',
    category: 'Tulsi Honey',
    tag: 'Immunity Booster',
    shortDescription: '<p>Goodness of Tulsi with pure honey.</p>',
    price: 499,
    rating: 4.7,
    buttonText: 'BUY NOW',
    buttonLink: '/products/tulsi-honey',
    benefits: ['Tulsi Infused', 'Cold & Cough Relief', '100% Herbal'],
    status: 'Inactive',
    featured: false,
    bestSeller: false,
    showHomepage: false,
    displayOrder: 4,
    seoTitle: 'Tulsi Honey – Herbal Goodness',
    seoKeywords: 'tulsi honey, herbal honey',
    image: DEFAULT_HONEY_IMG,
    galleryImages: []
  },
  {
    id: 5,
    name: 'Jamun Honey',
    slug: 'jamun-honey',
    category: 'Jamun Honey',
    tag: 'Premium',
    shortDescription: '<p>Rich in antioxidants & minerals.</p>',
    price: 699,
    rating: 5.0,
    buttonText: 'BUY NOW',
    buttonLink: '/products/jamun-honey',
    benefits: ['Good for Diabetes', 'Rich in Minerals', 'Natural Taste'],
    status: 'Active',
    featured: true,
    bestSeller: true,
    showHomepage: true,
    displayOrder: 5,
    seoTitle: 'Jamun Honey – Premium Quality',
    seoKeywords: 'jamun honey, organic',
    image: DEFAULT_HONEY_IMG,
    galleryImages: [DEFAULT_GALLERY_1]
  }
];

const INITIAL_FORM_STATE = {
  id: null,
  name: 'Acacia Honey',
  slug: 'acacia-honey',
  category: 'Acacia Honey',
  tag: 'Pure & Organic',
  shortDescription: '<p>Light, sweet & perfect for a healthy lifestyle.</p>',
  price: '599',
  rating: 5.0,
  buttonText: 'BUY NOW',
  buttonLink: '/products/acacia-honey',
  benefits: ['100% Natural', 'No Added Sugar', 'Carefully Harvested', 'Rich in Nutrients'],
  status: 'Active',
  featured: true,
  bestSeller: false,
  showHomepage: true,
  displayOrder: 1,
  seoTitle: 'Acacia Honey – Pure & Organic',
  seoKeywords: 'honey, acacia, organic honey',
  image: DEFAULT_HONEY_IMG,
  galleryImages: [DEFAULT_GALLERY_1, DEFAULT_GALLERY_2]
};

const HoneyProduct = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isEditing, setIsEditing] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [newBenefitInput, setNewBenefitInput] = useState('');

  // Refs for Image Uploads
  const mainImgRef = useRef(null);
  const galleryImgRef = useRef(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [featuredFilter, setFeaturedFilter] = useState('All');

  // Preview Modal
  const [viewProduct, setViewProduct] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle Basic Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // TinyMCE Editor Change
  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, shortDescription: content }));
  };

  // Upload Main Image
  const handleMainImgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: url }));
    }
  };

  // Upload Gallery Images
  const handleGalleryImgUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const urls = files.map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...urls]
      }));
    }
  };

  // Remove Gallery Image
  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  // Add Benefit
  const handleAddBenefit = () => {
    if (newBenefitInput.trim() !== '') {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefitInput.trim()]
      }));
      setNewBenefitInput('');
    }
  };

  // Remove Benefit
  const handleRemoveBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  // Form Submit / Publish
  const handlePublish = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Please enter product name');

    if (isEditing) {
      setProducts((prev) =>
        prev.map((p) => (p.id === formData.id ? { ...formData } : p))
      );
      setIsEditing(false);
      alert('Honey product updated successfully!');
    } else {
      const newProd = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price) || 0,
        displayOrder: parseInt(formData.displayOrder, 10) || products.length + 1
      };
      setProducts([newProd, ...products]);
      alert('Honey product published successfully!');
    }
    handleReset();
  };

  // Reset Form
  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setIsEditing(false);
    setNewBenefitInput('');
  };

  // Edit Action
  const handleEdit = (prod) => {
    setFormData({ ...prod });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Golden Glowing Star Rating System
  const renderInteractiveStars = () => {
    return (
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
        <span className="honey-product-rating-num-badge">{formData.rating.toFixed(1)}</span>
      </div>
    );
  };

  // Table Star Renderer
  const renderTableStars = (rating) => {
    return (
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
        <span className="honey-product-table-rating-text">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tag.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        categoryFilter === 'All Categories' || p.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'All Status' || p.status === statusFilter;

      const matchesRating =
        ratingFilter === 'All Ratings' || p.rating >= parseFloat(ratingFilter);

      const matchesFeatured =
        featuredFilter === 'All' ||
        (featuredFilter === 'Featured' && p.featured) ||
        (featuredFilter === 'Non-Featured' && !p.featured);

      return matchesSearch && matchesCat && matchesStatus && matchesRating && matchesFeatured;
    });
  }, [products, searchQuery, categoryFilter, statusFilter, ratingFilter, featuredFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="honey-product-container">
      <div className="honey-product-grid">
        {/* ================= LEFT FORM PANEL ================= */}
        <div className="honey-product-glass-panel">
          <div className="honey-product-panel-header">
            <Flame className="honey-product-header-icon" size={20} />
            <h2>{isEditing ? 'Edit Honey Product' : 'Add / Edit Honey Product'}</h2>
          </div>

          <form onSubmit={handlePublish}>
            {/* Product Name & Slug */}
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
                        slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
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

            {/* Category & Tag */}
            <div className="honey-product-row honey-product-mt-12">
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Honey Type/Category <span className="honey-product-req">*</span></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Acacia Honey">Acacia Honey</option>
                  <option value="Multiflora">Multiflora</option>
                  <option value="Forest Honey">Forest Honey</option>
                  <option value="Tulsi Honey">Tulsi Honey</option>
                  <option value="Jamun Honey">Jamun Honey</option>
                </select>
              </div>
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Tag / Badge</label>
                <input
                  type="text"
                  name="tag"
                  placeholder="Pure & Organic"
                  value={formData.tag}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Short Description (TinyMCE) & Price */}
            <div className="honey-product-row honey-product-mt-12 honey-product-align-start">
              <div className="honey-product-form-group honey-product-flex-2">
                <label>Short Description <span className="honey-product-req">*</span></label>
                <div className="honey-product-editor-box">
                  <Editor
                    apiKey="no-api-key"
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
                <input
                  type="number"
                  name="price"
                  placeholder="599"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Product Image & Gallery Images */}
            <div className="honey-product-row honey-product-mt-16">
              {/* Main Image Upload */}
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Product Image <span className="honey-product-req">*</span></label>
                <input
                  type="file"
                  ref={mainImgRef}
                  onChange={handleMainImgUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <div className="honey-product-image-upload-wrapper">
                  <div className="honey-product-main-thumb-preview">
                    <img src={formData.image} alt="Main Honey Product" />
                  </div>
                  <div
                    className="honey-product-upload-click-box"
                    onClick={() => mainImgRef.current.click()}
                  >
                    <Upload size={18} className="honey-product-green-icon" />
                    <span>Click to upload</span>
                    <small>JPG, PNG, WebP (Max 2MB)</small>
                  </div>
                </div>
              </div>

              {/* Gallery Images Upload */}
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Gallery Images (Optional)</label>
                <input
                  type="file"
                  ref={galleryImgRef}
                  onChange={handleGalleryImgUpload}
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                />
                <div className="honey-product-gallery-thumbs-grid">
                  {formData.galleryImages.map((img, idx) => (
                    <div key={idx} className="honey-product-gallery-thumb-item">
                      <img src={img} alt={`gallery-${idx}`} />
                      <button
                        type="button"
                        className="honey-product-btn-del-thumb"
                        onClick={() => removeGalleryImage(idx)}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <div
                    className="honey-product-add-gallery-btn"
                    onClick={() => galleryImgRef.current.click()}
                  >
                    <Plus size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Stars & Button Information */}
            <div className="honey-product-row honey-product-mt-16 honey-product-align-center">
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Rating (Stars) <span className="honey-product-req">*</span></label>
                {renderInteractiveStars()}
              </div>

              <div className="honey-product-form-group honey-product-flex-1">
                <label>Button Text</label>
                <input
                  type="text"
                  name="buttonText"
                  placeholder="BUY NOW"
                  value={formData.buttonText}
                  onChange={handleChange}
                />
              </div>

              <div className="honey-product-form-group honey-product-flex-1">
                <label>Button Link</label>
                <input
                  type="text"
                  name="buttonLink"
                  placeholder="/products/acacia-honey"
                  value={formData.buttonLink}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Dynamic Product Details (Benefits) AND Status & Visibility */}
            <div className="honey-product-row honey-product-mt-16">
              {/* Dynamic Benefits List */}
              <div className="honey-product-sub-glass-card honey-product-flex-1">
                <label className="honey-product-sub-title">Product Details (Benefits/Highlights)</label>
                <div className="honey-product-mt-8">
                  {formData.benefits.map((item, idx) => (
                    <div key={idx} className="honey-product-benefit-item-row">
                      <span className="honey-product-benefit-check">✓</span>
                      <span className="honey-product-benefit-text">{item}</span>
                      <button
                        type="button"
                        className="honey-product-btn-del-benefit"
                        onClick={() => handleRemoveBenefit(idx)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="honey-product-add-benefit-input-row honey-product-mt-8">
                  <input
                    type="text"
                    placeholder="Add benefit..."
                    value={newBenefitInput}
                    onChange={(e) => setNewBenefitInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="honey-product-btn-add-benefit"
                    onClick={handleAddBenefit}
                  >
                    + Add Benefit
                  </button>
                </div>
              </div>

              {/* Status & Visibility */}
              <div className="honey-product-sub-glass-card honey-product-flex-1">
                <label className="honey-product-sub-title">Status & Visibility</label>

                <div className="honey-product-toggle-group">
                  <div className="honey-product-toggle-item">
                    <label className="honey-product-switch">
                      <input
                        type="checkbox"
                        checked={formData.status === 'Active'}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            status: e.target.checked ? 'Active' : 'Inactive'
                          }))
                        }
                      />
                      <span className="honey-product-slider"></span>
                    </label>
                    <span className="honey-product-toggle-lbl">{formData.status}</span>
                  </div>

                  <div className="honey-product-toggle-item">
                    <label className="honey-product-switch">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                      />
                      <span className="honey-product-slider"></span>
                    </label>
                    <span className="honey-product-toggle-lbl">Featured</span>
                  </div>

                  <div className="honey-product-toggle-item">
                    <label className="honey-product-switch">
                      <input
                        type="checkbox"
                        name="bestSeller"
                        checked={formData.bestSeller}
                        onChange={handleChange}
                      />
                      <span className="honey-product-slider"></span>
                    </label>
                    <span className="honey-product-toggle-lbl">Best Seller</span>
                  </div>

                  <div className="honey-product-toggle-item">
                    <label className="honey-product-switch">
                      <input
                        type="checkbox"
                        name="showHomepage"
                        checked={formData.showHomepage}
                        onChange={handleChange}
                      />
                      <span className="honey-product-slider"></span>
                    </label>
                    <span className="honey-product-toggle-lbl">Show on Homepage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Information & Display Order */}
            <div className="honey-product-row honey-product-mt-16">
              <div className="honey-product-form-group honey-product-flex-1">
                <label>Display Order</label>
                <input
                  type="number"
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleChange}
                />
                <small className="honey-product-hint-txt">Lower number shows first</small>
              </div>

              <div className="honey-product-form-group honey-product-flex-2">
                <label>SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="honey-product-form-group honey-product-flex-2">
                <label>SEO Keywords</label>
                <input
                  type="text"
                  name="seoKeywords"
                  value={formData.seoKeywords}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="honey-product-form-actions-row honey-product-mt-20">
              <button type="submit" className="honey-product-btn-action honey-product-btn-green-publish">
                <Send size={15} /> {isEditing ? 'Update Product' : 'Publish Product'}
              </button>
              <button
                type="button"
                className="honey-product-btn-action honey-product-btn-green-update"
                onClick={() => alert('Draft saved successfully!')}
              >
                <RefreshCw size={15} /> Update
              </button>
              <button
                type="button"
                className="honey-product-btn-action honey-product-btn-green-reset"
                onClick={handleReset}
              >
                <RotateCcw size={15} /> Reset
              </button>
            </div>
          </form>
        </div>

        {/* ================= RIGHT LIST PANEL ================= */}
        <div className="honey-product-glass-panel">
          <div className="honey-product-list-top-bar">
            <div className="honey-product-panel-header honey-product-no-border">
              <Flame className="honey-product-header-icon" size={20} />
              <h2>Honey Products List</h2>
            </div>

            <button
              className="honey-product-btn-add-new-green"
              onClick={handleReset}
            >
              + Add New Honey Product
            </button>
          </div>

          {/* Search and Filters */}
          <div className="honey-product-filters-row honey-product-mt-12">
            <div className="honey-product-search-box-green honey-product-flex-2">
              <input
                type="text"
                placeholder="Search honey products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={15} className="honey-product-search-icon" />
            </div>

            <div className="honey-product-filter-box-wrap">
              <Filter size={14} />
              <span>Filter</span>
            </div>
          </div>

          <div className="honey-product-filter-dropdowns-grid honey-product-mt-8">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All Categories">All Categories</option>
              <option value="Acacia Honey">Acacia Honey</option>
              <option value="Multiflora">Multiflora</option>
              <option value="Forest Honey">Forest Honey</option>
              <option value="Tulsi Honey">Tulsi Honey</option>
              <option value="Jamun Honey">Jamun Honey</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="All Ratings">All Ratings</option>
              <option value="5.0">5.0 Star Only</option>
              <option value="4.8">4.8 & Above</option>
            </select>

            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
            >
              <option value="All">Featured (All)</option>
              <option value="Featured">Featured Only</option>
              <option value="Non-Featured">Non-Featured</option>
            </select>
          </div>

          {/* Data Table */}
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
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((prod, idx) => (
                    <tr key={prod.id}>
                      <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="honey-product-row-img">
                        <img src={prod.image} alt={prod.name} />
                      </td>
                      <td>
                        <div className="honey-product-p-name">{prod.name}</div>
                        <span className="honey-product-p-tag-pill">{prod.tag}</span>
                        <div 
                          className="honey-product-p-short-desc"
                          dangerouslySetInnerHTML={{ __html: prod.shortDescription }}
                        />
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
                          <button
                            className="honey-product-btn-tbl-icon honey-product-btn-tbl-edit"
                            title="Edit Product"
                            onClick={() => handleEdit(prod)}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            className="honey-product-btn-tbl-icon honey-product-btn-tbl-view"
                            title="View Product"
                            onClick={() => setViewProduct(prod)}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="honey-product-btn-tbl-icon honey-product-btn-tbl-delete"
                            title="Remove Product"
                            onClick={() => handleDelete(prod.id)}
                          >
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

          {/* Pagination */}
          <div className="honey-product-pagination-green-wrapper honey-product-mt-20">
            <span className="honey-product-showing-info">
              Showing {paginatedProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </span>

            <div className="honey-product-pagination-controls">
              <button
                className="honey-product-btn-page-green"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
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

              <button
                className="honey-product-btn-page-green"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
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
              <img src={viewProduct.image} alt={viewProduct.name} className="honey-product-modal-img" />
              <p><strong>Category:</strong> {viewProduct.category}</p>
              <p><strong>Price:</strong> ₹{viewProduct.price}</p>
              <p><strong>Tag:</strong> {viewProduct.tag}</p>
              <div className="honey-product-mt-8">
                <strong>Benefits:</strong>
                <ul>
                  {viewProduct.benefits.map((b, i) => (
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