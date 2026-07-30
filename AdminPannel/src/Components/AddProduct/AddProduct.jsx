import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  // Main Form State
  const [formData, setFormData] = useState({
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
  });

  // Product Attribute Tags State
  const [tags, setTags] = useState([
    { id: 1, name: 'Organic', color: 'green' },
    { id: 2, name: 'Sugar Free', color: 'teal' },
    { id: 3, name: 'Premium Quality', color: 'brown' },
    { id: 4, name: 'Best Seller', color: 'blue' },
    { id: 5, name: 'New Arrival', color: 'purple' },
  ]);

  // Image Upload State
  const [imagePreview, setImagePreview] = useState(null);

  // Form Field Input Handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value };

      // Auto-generate URL slug from Product Name
      if (name === 'name') {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-');
      }
      return updated;
    });
  };

  // Remove Tag Handler
  const handleRemoveTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  // Image File Select Handler
  const handleImageUpload = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Drag & Drop Image Handler
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Submit Handler
  const handlePublish = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.regularPrice) {
      alert('Please fill in required fields: Product Name & Regular Price.');
      return;
    }
    alert(`Product "${formData.name}" published successfully!`);
  };

  return (
    <div className="ap-container">
      {/* Header Title Bar without AI Button */}
      <div className="ap-header">
        <div className="ap-header-title">
          <h2>Add New Product</h2>
          <p>Fill in the details below to list a new product</p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <form onSubmit={handlePublish} className="ap-grid-container">
        {/* Left Column */}
        <div className="ap-column">
          {/* Basic Information */}
          <div className="ap-card">
            <h3 className="ap-card-title">Basic Information</h3>

            <div className="ap-form-row">
              <div className="ap-form-group">
                <label>
                  Product Name <span className="ap-required">*</span>
                </label>
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
                <label>Slug (URL Friendly)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="product-url-friendly"
                />
                <span className="ap-hint">Automatically generated from product name</span>
              </div>
            </div>

            <div className="ap-form-group">
              <label>
                Short Description <span className="ap-required">*</span>
              </label>
              <textarea
                rows="2"
                name="shortDesc"
                value={formData.shortDesc}
                onChange={handleInputChange}
                maxLength={160}
                placeholder="Brief description about the product..."
                required
              ></textarea>
              <span className="ap-counter">{formData.shortDesc.length}/160</span>
            </div>

            <div className="ap-form-group">
              <label>
                Detailed Description <span className="ap-required">*</span>
              </label>
              <div className="ap-editor-toolbar">
                <button type="button"><b>B</b></button>
                <button type="button"><i>I</i></button>
                <button type="button"><u>U</u></button>
                <button type="button">≡</button>
                <button type="button">≣</button>
                <button type="button">⋮≡</button>
                <select defaultValue="Poppins">
                  <option value="Poppins">Poppins</option>
                  <option value="Arial">Arial</option>
                </select>
                <select defaultValue="14">
                  <option value="12">12</option>
                  <option value="14">14</option>
                  <option value="16">16</option>
                </select>
              </div>
              <textarea
                className="ap-editor-area"
                rows="4"
                name="detailedDesc"
                value={formData.detailedDesc}
                onChange={handleInputChange}
                placeholder="Write detailed description about the product..."
                required
              ></textarea>
            </div>
          </div>

          {/* Product Type Selection */}
          <div className="ap-card">
            <h3 className="ap-card-title">
              Product Type <span className="ap-required">*</span>
            </h3>
            <div className="ap-type-grid">
              <div
                className={`ap-type-card ${formData.productType === 'Chocolate' ? 'active' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, productType: 'Chocolate' }))}
              >
                <div className="ap-type-icon">🍫</div>
                <div>
                  <h4>Chocolate</h4>
                  <p>Chocolate based product</p>
                </div>
              </div>
              <div
                className={`ap-type-card ${formData.productType === 'Honey' ? 'active' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, productType: 'Honey' }))}
              >
                <div className="ap-type-icon">🍯</div>
                <div>
                  <h4>Honey</h4>
                  <p>Honey based product</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="ap-card">
            <h3 className="ap-card-title">Images</h3>
            <div className="ap-image-section">
              <label
                className="ap-upload-box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <div className="ap-upload-icon">☁️</div>
                <p><strong>Click to upload images</strong></p>
                <p className="ap-upload-subtext">or drag and drop</p>
                <span className="ap-upload-note">PNG, JPG, WEBP up to 5MB</span>
              </label>

              <div className="ap-image-preview">
                <h4>Image Preview</h4>
                {imagePreview ? (
                  <div className="ap-active-preview">
                    <img src={imagePreview} alt="Upload Preview" />
                    <button
                      type="button"
                      className="ap-remove-img"
                      onClick={() => setImagePreview(null)}
                    >
                      ✕ Remove
                    </button>
                  </div>
                ) : (
                  <div className="ap-no-image">No images selected</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="ap-column">
          {/* Pricing & Inventory */}
          <div className="ap-card">
            <h3 className="ap-card-title">Pricing & Inventory</h3>
            <div className="ap-form-row three-cols">
              <div className="ap-form-group">
                <label>
                  Regular Price <span className="ap-required">*</span>
                </label>
                <div className="ap-input-prefix">
                  <span>₹</span>
                  <input
                    type="number"
                    name="regularPrice"
                    value={formData.regularPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
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
                  />
                </div>
                <span className="ap-hint">Leave empty if no sale</span>
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
                  />
                </div>
                <span className="ap-hint">For internal use only</span>
              </div>
            </div>

            <div className="ap-form-row three-cols">
              <div className="ap-form-group">
                <label>
                  Stock Quantity <span className="ap-required">*</span>
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  required
                />
                <span className="ap-hint">Available stock quantity</span>
              </div>
              <div className="ap-form-group">
                <label>SKU (Stock Keeping Unit)</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="Enter SKU"
                />
                <span className="ap-hint">Unique product identifier</span>
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
                <span className="ap-hint">Alert when stock is below this</span>
              </div>
            </div>
          </div>

          {/* Categories & Brand */}
          <div className="ap-card">
            <h3 className="ap-card-title">Categories & Brand</h3>
            <div className="ap-form-row three-cols">
              <div className="ap-form-group">
                <label>
                  Category <span className="ap-required">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Dark Chocolate">Dark Chocolate</option>
                  <option value="Milk Chocolate">Milk Chocolate</option>
                  <option value="Nut Chocolate">Nut Chocolate</option>
                  <option value="Raw Honey">Raw Honey</option>
                </select>
              </div>
              <div className="ap-form-group">
                <label>Sub Category</label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select Sub Category</option>
                  <option value="Organic Dark">Organic Dark</option>
                  <option value="Flavoured">Flavoured</option>
                </select>
              </div>
              <div className="ap-form-group">
                <label>
                  Brand <span className="ap-required">*</span>
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Brand</option>
                  <option value="Chocolate">Chocolate</option>
                  <option value="Honey">Honey</option>
                  <option value="Combo">Combo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Attribute Tags */}
          <div className="ap-card">
            <h3 className="ap-card-title">Product Attributes</h3>
            <div className="ap-tags-container">
              {tags.map((tag) => (
                <span key={tag.id} className={`ap-tag tag-${tag.color}`}>
                  {tag.name}{' '}
                  <b onClick={() => handleRemoveTag(tag.id)} className="ap-tag-close">
                    ✕
                  </b>
                </span>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="ap-card">
            <h3 className="ap-card-title">Additional Information</h3>
            <div className="ap-form-row four-cols">
              <div className="ap-form-group">
                <label>Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter weight"
                />
                <span className="ap-hint">e.g. 250g, 500ml</span>
              </div>
              <div className="ap-form-group">
                <label>Dimensions</label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="Enter dimensions"
                />
                <span className="ap-hint">e.g. 10x10x5 cm</span>
              </div>
              <div className="ap-form-group">
                <label>Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ap-form-group">
                <label>Barcode</label>
                <input
                  type="text"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  placeholder="Enter barcode"
                />
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="ap-switches-row">
              <div className="ap-switch-item">
                <div>
                  <strong>Featured Product</strong>
                  <p>Show on homepage</p>
                </div>
                <label className="ap-switch">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                  />
                  <span className="ap-slider"></span>
                </label>
              </div>

              <div className="ap-switch-item">
                <div>
                  <strong>Active Product</strong>
                  <p>Product is active</p>
                </div>
                <label className="ap-switch">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  <span className="ap-slider"></span>
                </label>
              </div>

              <div className="ap-switch-item">
                <div>
                  <strong>Allow Reviews</strong>
                  <p>Allow customer reviews</p>
                </div>
                <label className="ap-switch">
                  <input
                    type="checkbox"
                    name="allowReviews"
                    checked={formData.allowReviews}
                    onChange={handleInputChange}
                  />
                  <span className="ap-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="ap-actions-row">
            <button type="button" className="ap-btn-cancel">Cancel</button>
            <button type="button" className="ap-btn-draft">Save as Draft</button>
            <button type="submit" className="ap-btn-publish">Publish Product</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;