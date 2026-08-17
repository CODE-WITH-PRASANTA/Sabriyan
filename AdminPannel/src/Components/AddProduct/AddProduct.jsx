import React, { useState, useRef } from 'react';
import './AddProduct.css';
import API from '../../api/axios';

const INITIAL_FORM_STATE = {
  name: '',
  slug: '',
  shortDesc: '',
  detailedDesc: '',
  productType: 'Chocolate',
  regularPrice: '',
  salePrice: '',
  costPrice: '',
  stockQuantity: '',
  sku: '',
  lowStockAlert: '10',
  category: '',
  subCategory: '',
  brand: '',
  weight: '',
  dimensions: '',
  expiryDate: '',
  barcode: '',
  isFeatured: true,
  isActive: true,
  allowReviews: true,
};

const INITIAL_TAGS = [
  { id: 1, name: 'Organic', color: 'green' },
  { id: 2, name: 'Sugar Free', color: 'teal' },
  { id: 3, name: 'Premium Quality', color: 'brown' },
];

const AVAILABLE_COLORS = ['green', 'teal', 'brown', 'blue', 'purple', 'orange'];

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [tags, setTags] = useState(INITIAL_TAGS);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('green');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'name') {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      return updated;
    });
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const trimmed = newTagName.trim();
    if (!trimmed) return;
    if (tags.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) {
      alert('Tag already exists.');
      return;
    }
    setTags((prev) => [...prev, { id: Date.now(), name: trimmed, color: newTagColor }]);
    setNewTagName('');
  };

  const handleRemoveTag = (id) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
  };

  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setTags(INITIAL_TAGS);
    setNewTagName('');
    handleRemoveImage();
  };

  const submitProduct = async (status = 'published') => {
    if (!formData.name || !formData.regularPrice || !formData.category || !formData.brand || !formData.shortDesc || !formData.detailedDesc) {
      alert('Please fill in required fields: Name, Short Description, Detailed Description, Price, Category, and Brand.');
      return;
    }

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      const val = formData[key];
      if (val !== '' && val !== null && val !== undefined) {
        payload.append(key, val);
      }
    });

    payload.append('tags', JSON.stringify(tags));
    payload.append('status', status);
    if (imageFile) payload.append('image', imageFile);

    try {
      setLoading(true);
      const res = await API.post('/store-articles', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(res.data.message || 'Product published successfully!');
      resetForm();

      // Trigger table refresh in parent
      if (onProductAdded) {
        onProductAdded();
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Failed to save product.';
      alert(`Submission Failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ap-container">
      <div className="ap-header">
        <div className="ap-header-title">
          <h2>Add New Product</h2>
          <p>Fill in the details below to list a new product</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitProduct('published');
        }}
        className="ap-grid-container"
      >
        {/* Left Column */}
        <div className="ap-column">
          <div className="ap-card">
            <h3 className="ap-card-title">Basic Information</h3>
            <div className="ap-form-row">
              <div className="ap-form-group">
                <label>Product Name <span className="ap-required">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="ap-form-group">
                <label>Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="product-slug"
                />
              </div>
            </div>

            <div className="ap-form-group">
              <label>Short Description <span className="ap-required">*</span></label>
              <textarea
                rows="2"
                name="shortDesc"
                value={formData.shortDesc}
                onChange={handleInputChange}
                maxLength={160}
                placeholder="Brief summary..."
                required
              />
            </div>

            <div className="ap-form-group">
              <label>Detailed Description <span className="ap-required">*</span></label>
              <textarea
                className="ap-editor-area"
                rows="4"
                name="detailedDesc"
                value={formData.detailedDesc}
                onChange={handleInputChange}
                placeholder="Full details..."
                required
              />
            </div>
          </div>

          <div className="ap-card">
            <h3 className="ap-card-title">Product Type <span className="ap-required">*</span></h3>
            <div className="ap-type-grid">
              <div
                className={`ap-type-card ${formData.productType === 'Chocolate' ? 'active' : ''}`}
                onClick={() => setFormData((p) => ({ ...p, productType: 'Chocolate' }))}
              >
                <div className="ap-type-icon">🍫</div>
                <div>
                  <h4>Chocolate</h4>
                  <p>Chocolate based product</p>
                </div>
              </div>
              <div
                className={`ap-type-card ${formData.productType === 'Honey' ? 'active' : ''}`}
                onClick={() => setFormData((p) => ({ ...p, productType: 'Honey' }))}
              >
                <div className="ap-type-icon">🍯</div>
                <div>
                  <h4>Honey</h4>
                  <p>Honey based product</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ap-card">
            <h3 className="ap-card-title">Images</h3>
            <div className="ap-image-section">
              <label
                className="ap-upload-box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  processImageFile(e.dataTransfer.files?.[0]);
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => processImageFile(e.target.files?.[0])}
                  style={{ display: 'none' }}
                />
                <div className="ap-upload-icon">☁️</div>
                <p><strong>Click to upload</strong></p>
                <span className="ap-upload-note">PNG, JPG, WEBP up to 5MB</span>
              </label>

              <div className="ap-image-preview">
                <h4>Image Preview</h4>
                {imagePreview ? (
                  <div className="ap-active-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button type="button" className="ap-remove-img" onClick={handleRemoveImage}>
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="ap-no-image">No image selected</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="ap-column">
          <div className="ap-card">
            <h3 className="ap-card-title">Pricing & Inventory</h3>
            <div className="ap-form-row three-cols">
              <div className="ap-form-group">
                <label>Regular Price <span className="ap-required">*</span></label>
                <div className="ap-input-prefix">
                  <span>₹</span>
                  <input
                    type="number"
                    name="regularPrice"
                    value={formData.regularPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="ap-form-group">
                <label>Sale Price</label>
                <div className="ap-input-prefix">
                  <span>₹</span>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="ap-form-group">
                <label>Cost Price</label>
                <div className="ap-input-prefix">
                  <span>₹</span>
                  <input
                    type="number"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            <div className="ap-form-row three-cols">
              <div className="ap-form-group">
                <label>Stock Quantity <span className="ap-required">*</span></label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  required
                />
              </div>
              <div className="ap-form-group">
                <label>SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="SKU Code"
                />
              </div>
              <div className="ap-form-group">
                <label>Low Stock Alert</label>
                <input
                  type="number"
                  name="lowStockAlert"
                  value={formData.lowStockAlert}
                  onChange={handleInputChange}
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          <div className="ap-card">
            <h3 className="ap-card-title">Categories & Brand</h3>
            <div className="ap-form-row three-cols">
              <div className="ap-form-group">
                <label>Category <span className="ap-required">*</span></label>
                <select name="category" value={formData.category} onChange={handleInputChange} required>
                  <option value="" disabled>Select Category</option>
                  <option value="Dark Chocolate">Dark Chocolate</option>
                  <option value="Milk Chocolate">Milk Chocolate</option>
                  <option value="Nut Chocolate">Nut Chocolate</option>
                  <option value="Raw Honey">Raw Honey</option>
                </select>
              </div>
              <div className="ap-form-group">
                <label>Sub Category</label>
                <select name="subCategory" value={formData.subCategory} onChange={handleInputChange}>
                  <option value="">Select Sub Category</option>
                  <option value="Organic Dark">Organic Dark</option>
                  <option value="Flavoured">Flavoured</option>
                </select>
              </div>
              <div className="ap-form-group">
                <label>Brand <span className="ap-required">*</span></label>
                <select name="brand" value={formData.brand} onChange={handleInputChange} required>
                  <option value="" disabled>Select Brand</option>
                  <option value="Chocolate">Chocolate</option>
                  <option value="Honey">Honey</option>
                  <option value="Combo">Combo</option>
                </select>
              </div>
            </div>
          </div>

          <div className="ap-card">
            <h3 className="ap-card-title">Product Attributes</h3>
            <div className="ap-tag-input-row">
              <input
                type="text"
                className="ap-tag-text-input"
                placeholder="Tag name"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e)}
              />
              <select className="ap-tag-color-select" value={newTagColor} onChange={(e) => setNewTagColor(e.target.value)}>
                {AVAILABLE_COLORS.map((c) => (
                  <option key={c} value={c}>{c.toUpperCase()}</option>
                ))}
              </select>
              <button type="button" className="ap-btn-add-tag" onClick={handleAddTag}>
                + Add Tag
              </button>
            </div>
            <div className="ap-tags-container">
              {tags.map((t) => (
                <span key={t.id} className={`ap-tag tag-${t.color}`}>
                  {t.name} <b onClick={() => handleRemoveTag(t.id)} className="ap-tag-close">✕</b>
                </span>
              ))}
            </div>
          </div>

          <div className="ap-actions-row">
            <button type="button" className="ap-btn-cancel" onClick={resetForm} disabled={loading}>
              Reset
            </button>
            <button type="button" className="ap-btn-draft" onClick={() => submitProduct('draft')} disabled={loading}>
              {loading ? 'Saving...' : 'Save as Draft'}
            </button>
            <button type="submit" className="ap-btn-publish" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;