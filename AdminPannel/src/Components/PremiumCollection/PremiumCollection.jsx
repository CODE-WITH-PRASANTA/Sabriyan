import React, { useState, useMemo, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
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
  RefreshCw,
  Send
} from 'lucide-react';
import './PremiumCollection.css';

// Default Fallback Sample Images
const DEFAULT_MAIN_IMG = 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&auto=format&fit=crop&q=80';
const DEFAULT_BG_IMG = 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&auto=format&fit=crop&q=80';

// Expanded Dummy Data for Premium Collection
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Dark Classic',
    shortTitle: '70% Cocoa Rich',
    slug: 'dark-classic',
    category: 'Premium Collection',
    rating: 5,
    mrp: 399,
    sellingPrice: 349,
    discount: 13,
    cocoa: '70',
    weight: '80 gm',
    sweetness: 'Medium',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&auto=format&fit=crop&q=80'
    ],
    featured: true,
    trending: true,
    status: 'Active',
    description: '<p>Premium dark chocolate crafted with <strong>70% single-origin cocoa</strong> for a rich, bold, and intense taste experience.</p>'
  },
  {
    id: 2,
    name: 'Milk Delight',
    shortTitle: 'Smooth & Creamy',
    slug: 'milk-delight',
    category: 'Premium Collection',
    rating: 4,
    mrp: 349,
    sellingPrice: 299,
    discount: 14,
    cocoa: '45',
    weight: '80 gm',
    sweetness: 'High',
    image: 'https://images.unsplash.com/photo-1582176647444-a6907ef35a82?w=400&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582176647444-a6907ef35a82?w=400&auto=format&fit=crop&q=80'
    ],
    featured: false,
    trending: true,
    status: 'Active',
    description: '<p>Silky smooth milk chocolate infused with <em>pure mountain forest honey</em> and real vanilla bean extracts.</p>'
  },
  {
    id: 3,
    name: 'Nut Fusion',
    shortTitle: 'Almond & Pistachio',
    slug: 'nut-fusion',
    category: 'Premium Collection',
    rating: 5,
    mrp: 449,
    sellingPrice: 399,
    discount: 11,
    cocoa: '60',
    weight: '90 gm',
    sweetness: 'Medium',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1582176647444-a6907ef35a82?w=400&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&auto=format&fit=crop&q=80'
    ],
    featured: true,
    trending: false,
    status: 'Active',
    description: '<p>Crunchy slow-roasted Californian almonds and roasted Iranian pistachios embedded in dark velvet cocoa cocoa.</p>'
  },
  {
    id: 4,
    name: 'Raw Forest Honey',
    shortTitle: '100% Pure Organic',
    slug: 'raw-forest-honey',
    category: 'Raw Honey',
    rating: 5,
    mrp: 599,
    sellingPrice: 499,
    discount: 17,
    cocoa: '0',
    weight: '250 gm',
    sweetness: 'High',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=400&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=400&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=400&auto=format&fit=crop&q=80'
    ],
    featured: true,
    trending: true,
    status: 'Active',
    description: '<p>Unfiltered, unpasteurized <strong>wild forest raw honey</strong> harvested directly from natural beehives.</p>'
  },
  {
    id: 5,
    name: 'Hazelnut Truffle Box',
    shortTitle: 'Artisanal Gift Pack',
    slug: 'hazelnut-truffle-box',
    category: 'Gift Boxes',
    rating: 4,
    mrp: 899,
    sellingPrice: 749,
    discount: 17,
    cocoa: '55',
    weight: '200 gm',
    sweetness: 'Medium',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&auto=format&fit=crop&q=80'
    ],
    featured: false,
    trending: true,
    status: 'Active',
    description: '<p>An exquisite luxury gift box containing 12 handcrafted praline truffles filled with creamy roasted hazelnut butter.</p>'
  },
  {
    id: 6,
    name: 'Sea Salt Dark Crunch',
    shortTitle: '85% Cocoa & Himalayan Salt',
    slug: 'sea-salt-dark-crunch',
    category: 'Craft Chocolates',
    rating: 5,
    mrp: 499,
    sellingPrice: 429,
    discount: 14,
    cocoa: '85',
    weight: '85 gm',
    sweetness: 'Low',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&auto=format&fit=crop&q=80'
    ],
    featured: true,
    trending: false,
    status: 'Inactive',
    description: '<p>Bold 85% bittersweet dark chocolate elevated with fine flakes of hand-harvested pink Himalayan sea salt.</p>'
  }
];

const INITIAL_FORM_STATE = {
  id: null,
  name: '',
  slug: '',
  category: 'Premium Collection',
  shortTitle: '',
  description: '<p>Enter product description here...</p>',
  rating: 5,
  mrp: '399',
  sellingPrice: '349',
  discount: '15',
  cocoa: '70',
  weight: '80 gm',
  sweetness: 'Medium',
  status: 'Active',
  featured: 'Yes',
  trending: 'Yes',
  metaTitle: 'Dark Classic Chocolate',
  metaKeywords: 'dark chocolate, premium, 70 cocoa',
  metaDescription: 'Premium dark chocolate crafted with 70% cocoa for a rich and intense taste.',
  displayOrder: '1',
  image: DEFAULT_MAIN_IMG,
  bgImage: DEFAULT_BG_IMG,
  galleryImages: [DEFAULT_MAIN_IMG, DEFAULT_BG_IMG]
};

const PremiumCollection = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isEditing, setIsEditing] = useState(false);

  // Hidden File Input References
  const mainImageInputRef = useRef(null);
  const bgImageInputRef = useRef(null);
  const galleryImageInputRef = useRef(null);

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [featuredFilter, setFeaturedFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');

  // Modal / Preview state
  const [viewProduct, setViewProduct] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  // --- IMAGE UPLOAD HANDLERS ---
  
  // 1. Change Main Image
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  // 2. Change Background Image
  const handleBgImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, bgImage: imageUrl }));
    }
  };

  // 3. Add Gallery Images
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newUrls = files.map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...newUrls]
      }));
    }
  };

  // 4. Remove a specific Gallery Image
  const removeGalleryImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      const mrp = parseFloat(updated.mrp) || 0;
      const selling = parseFloat(updated.sellingPrice) || 0;
      if (mrp > 0 && selling <= mrp) {
        updated.discount = Math.round(((mrp - selling) / mrp) * 100).toString();
      }
      return updated;
    });
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!formData.name) return alert('Please enter product name');

    if (isEditing) {
      setProducts((prev) =>
        prev.map((p) => (p.id === formData.id ? { ...formData } : p))
      );
      setIsEditing(false);
      alert('Product updated successfully!');
    } else {
      const newProduct = {
        ...formData,
        id: Date.now(),
        mrp: parseFloat(formData.mrp) || 0,
        sellingPrice: parseFloat(formData.sellingPrice) || 0,
        discount: parseFloat(formData.discount) || 0,
        featured: formData.featured === 'Yes'
      };
      setProducts([newProduct, ...products]);
      alert('Product published successfully!');
    }
    handleReset();
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      featured: product.featured ? 'Yes' : 'No'
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="star-rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={interactive ? 18 : 14}
            className={`star-icon ${star <= rating ? 'filled' : 'empty'}`}
            onClick={() => {
              if (interactive) {
                setFormData((prev) => ({ ...prev, rating: star }));
              }
            }}
          />
        ))}
      </div>
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === 'All Categories' || p.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'All Status' || p.status === statusFilter;

      const matchesFeatured =
        featuredFilter === 'All' ||
        (featuredFilter === 'Featured' && p.featured) ||
        (featuredFilter === 'Not Featured' && !p.featured);

      const matchesRating =
        ratingFilter === 'All Ratings' || p.rating >= parseInt(ratingFilter, 10);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesFeatured &&
        matchesRating
      );
    });
  }, [products, searchQuery, categoryFilter, statusFilter, featuredFilter, ratingFilter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="premium-container">
      <div className="premium-grid">
        {/* ================= LEFT FORM PANEL ================= */}
        <div className="card-panel form-card">
          <div className="card-header">
            <ShoppingBag className="header-icon" size={20} />
            <h2>{isEditing ? 'Edit Premium Collection' : 'Add / Edit Premium Collection'}</h2>
          </div>

          <form onSubmit={handlePublish} className="form-body">
            {/* Basic Information */}
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
                          slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
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
                    placeholder="dark-classic"
                    value={formData.slug}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row gap-12 mt-12">
                <div className="form-group flex-1">
                  <label>Category <span className="req">*</span></label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Premium Collection">Premium Collection</option>
                    <option value="Craft Chocolates">Craft Chocolates</option>
                    <option value="Raw Honey">Raw Honey</option>
                    <option value="Gift Boxes">Gift Boxes</option>
                  </select>
                </div>
                <div className="form-group flex-1">
                  <label>Short Title</label>
                  <input
                    type="text"
                    name="shortTitle"
                    placeholder="70% Cocoa Rich"
                    value={formData.shortTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* TinyMCE Text Editor */}
              <div className="form-group mt-12">
                <label>Description (Rich Text)</label>
                <div className="editor-wrapper">
                  <Editor
                    apiKey="no-api-key"
                    value={formData.description}
                    onEditorChange={handleEditorChange}
                    init={{
                      height: 180,
                      menubar: false,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'charmap',
                        'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'table', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | formatselect | bold italic backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | removeformat | help',
                      skin: 'oxide-dark',
                      content_css: 'dark'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Price Information */}
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
                    value={formData.mrp}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Selling Price (₹)</label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Chocolate Details & Rating */}
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
                    value={formData.cocoa}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Sweetness Level</label>
                  <select
                    name="sweetness"
                    value={formData.sweetness}
                    onChange={handleChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="form-group flex-1">
                  <label>Product Rating</label>
                  <div className="star-select-wrapper">
                    {renderStars(formData.rating, true)}
                  </div>
                </div>
              </div>
            </div>

            {/* ================= FULL WORKING PRODUCT IMAGE UPLOAD ================= */}
            <div className="sub-card mt-12 bigger-image-card">
              <div className="sub-card-header">
                <Upload size={18} />
                <span>Product Images (Click to Upload / Change)</span>
              </div>

              {/* Hidden Inputs */}
              <input
                type="file"
                ref={mainImageInputRef}
                onChange={handleMainImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <input
                type="file"
                ref={bgImageInputRef}
                onChange={handleBgImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <input
                type="file"
                ref={galleryImageInputRef}
                onChange={handleGalleryUpload}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
              />

              <div className="image-upload-grid-large mt-12">
                {/* 1. Main Product Image Upload */}
                <div className="upload-box-large flex-1">
                  <label className="upload-lbl-large">Main Product Image</label>
                  <div 
                    className="large-preview-container"
                    onClick={() => mainImageInputRef.current.click()}
                  >
                    <img src={formData.image} alt="Main Product" className="large-img-preview" />
                    <button type="button" className="btn-upload-overlay">
                      <Upload size={14} /> Change Image
                    </button>
                  </div>
                </div>

                {/* 2. Background Image Upload */}
                <div className="upload-box-large flex-1">
                  <label className="upload-lbl-large">Background Image (Optional)</label>
                  <div 
                    className="large-preview-container"
                    onClick={() => bgImageInputRef.current.click()}
                  >
                    <img src={formData.bgImage} alt="Background" className="large-img-preview bg-banner" />
                    <button type="button" className="btn-upload-overlay">
                      <Upload size={14} /> Change Image
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Dynamic Gallery Upload */}
              <div className="gallery-upload-large mt-12">
                <label className="upload-lbl-large">Gallery Images</label>
                <div className="gallery-thumbs-large">
                  {formData.galleryImages.map((imgUrl, idx) => (
                    <div key={idx} className="large-mini-thumb">
                      <img src={imgUrl} alt={`gallery-${idx}`} />
                      <button 
                        type="button" 
                        className="btn-remove-thumb"
                        onClick={() => removeGalleryImage(idx)}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}

                  <button 
                    type="button" 
                    className="add-large-thumb-btn"
                    onClick={() => galleryImageInputRef.current.click()}
                  >
                    <Plus size={20} />
                    <span>Add Image</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Status Toggle */}
            <div className="sub-card mt-12">
              <div className="sub-card-header">
                <Check size={16} />
                <span>Product Status</span>
              </div>
              <div className="form-row gap-12 mt-8 align-center">
                <div className="form-group flex-1">
                  <label>Status</label>
                  <div className="toggle-wrapper mt-4">
                    <label className="switch">
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
                      <span className="slider round"></span>
                    </label>
                    <span className="toggle-status-lbl">{formData.status}</span>
                  </div>
                </div>

                <div className="form-group flex-1">
                  <label>Featured</label>
                  <select
                    name="featured"
                    value={formData.featured}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group flex-1">
                  <label>Trending</label>
                  <select
                    name="trending"
                    value={formData.trending}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SEO Information */}
            <div className="sub-card mt-12">
              <div className="sub-card-header">
                <Search size={16} />
                <span>SEO Information</span>
              </div>
              <div className="form-row gap-12 mt-8">
                <div className="form-group flex-2">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group flex-2">
                  <label>Meta Keywords</label>
                  <input
                    type="text"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Display Order</label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group mt-8">
                <label>Meta Description</label>
                <textarea
                  name="metaDescription"
                  rows="2"
                  value={formData.metaDescription}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="form-actions-row mt-16">
              <button type="submit" className="btn-action btn-publish">
                <Send size={16} /> {isEditing ? 'Update Product' : 'Publish Product'}
              </button>
              <button
                type="button"
                className="btn-action btn-update"
                onClick={() => alert('Draft updated successfully!')}
              >
                <RefreshCw size={16} /> Update
              </button>
              <button
                type="button"
                className="btn-action btn-reset"
                onClick={handleReset}
              >
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                className="btn-filter-toggle"
                onClick={() => {
                  setCategoryFilter('All Categories');
                  setStatusFilter('All Status');
                  setFeaturedFilter('All');
                  setRatingFilter('All Ratings');
                  setSearchQuery('');
                }}
              >
                <Filter size={15} /> Filter
              </button>
            </div>
          </div>

          <div className="filters-dropdown-grid">
            <div className="filter-item">
              <label>Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All Categories">All Categories</option>
                <option value="Premium Collection">Premium Collection</option>
                <option value="Craft Chocolates">Craft Chocolates</option>
                <option value="Raw Honey">Raw Honey</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Featured</label>
              <select
                value={featuredFilter}
                onChange={(e) => setFeaturedFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Featured">Featured</option>
                <option value="Not Featured">Not Featured</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Rating</label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
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
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((prod, idx) => (
                    <tr key={prod.id}>
                      <td className="row-num">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td className="row-img">
                        <img src={prod.image} alt={prod.name} />
                      </td>
                      <td className="row-details">
                        <div className="p-title">{prod.name}</div>
                        <div className="p-subtitle">{prod.shortTitle}</div>
                      </td>
                      <td className="row-rating">
                        {renderStars(prod.rating)}
                      </td>
                      <td className="row-price">
                        <div className="selling-p">₹{prod.sellingPrice}</div>
                        <div className="mrp-p">₹{prod.mrp}</div>
                      </td>
                      <td className="row-category">
                        <span className="cat-pill">{prod.category}</span>
                      </td>
                      <td className="row-featured">
                        {prod.featured ? (
                          <span className="icon-circle icon-check">
                            <Check size={14} />
                          </span>
                        ) : (
                          <span className="icon-circle icon-cross">
                            <X size={14} />
                          </span>
                        )}
                      </td>
                      <td className="row-status">
                        <span
                          className={`status-pill ${
                            prod.status === 'Active' ? 'active' : 'inactive'
                          }`}
                        >
                          {prod.status}
                        </span>
                      </td>
                      <td className="row-actions">
                        <div className="action-buttons">
                          <button
                            className="btn-icon btn-view"
                            title="View Product"
                            onClick={() => setViewProduct(prod)}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            className="btn-icon btn-edit"
                            title="Edit Product"
                            onClick={() => handleEdit(prod)}
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            className="btn-icon btn-delete"
                            title="Remove Product"
                            onClick={() => handleDelete(prod.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-data">
                      No products found matching the search criteria.
                    </td>
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
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    className={`page-num ${
                      currentPage === pageNum ? 'active' : ''
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>

            <button
              className="btn-page"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
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
              <img src={viewProduct.image} alt={viewProduct.name} className="modal-img" />
              <div className="modal-info">
                <p><strong>Category:</strong> {viewProduct.category}</p>
                <p><strong>Short Title:</strong> {viewProduct.shortTitle}</p>
                <p><strong>Price:</strong> ₹{viewProduct.sellingPrice} (MRP: ₹{viewProduct.mrp})</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
                  <strong>Rating:</strong> {renderStars(viewProduct.rating)}
                </div>
                <div>
                  <strong>Description:</strong>
                  <div 
                    className="modal-description-html"
                    dangerouslySetInnerHTML={{ __html: viewProduct.description }} 
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