import React, { useState } from 'react';
import './AddproductList.css';

const AddproductList = () => {
  // Main Form Input State
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

  // Uploaded Image State
  const [imagePreview, setImagePreview] = useState(null);

  // Recently Added Products Table State
  const [products, setProducts] = useState([
    {
      id: 1,
      image: '🍫',
      name: 'Dark Chocolate 55%',
      category: 'Chocolate',
      price: '₹240.00',
      status: 'In Stock',
      stock: 45,
    },
    {
      id: 2,
      image: '🍯',
      name: 'Organic Honey 500g',
      category: 'Honey',
      price: '₹350.00',
      status: 'In Stock',
      stock: 20,
    },
    {
      id: 3,
      image: '🍫',
      name: 'Milk Chocolate Bar',
      category: 'Chocolate',
      price: '₹180.00',
      status: 'In Stock',
      stock: 12,
    },
  ]);

  // Product Attribute Tags
  const [tags, setTags] = useState([
    { id: 1, name: 'Organic', color: 'green' },
    { id: 2, name: 'Sugar Free', color: 'teal' },
    { id: 3, name: 'Premium Quality', color: 'brown' },
    { id: 4, name: 'Best Seller', color: 'blue' },
    { id: 5, name: 'New Arrival', color: 'purple' },
  ]);

  // Input Change Handler with Auto-Slug Generation
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value };

      if (name === 'name') {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-');
      }
      return updated;
    });
  };

  // Image Upload File Handler
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

  // Tag Removal Handler
  const handleRemoveTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  // Publish Product & Push to Table List
  const handlePublish = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.regularPrice) {
      alert('Please fill in required fields: Product Name & Regular Price.');
      return;
    }

    const newProduct = {
      id: Date.now(),
      image: imagePreview
        ? imagePreview
        : formData.productType === 'Chocolate'
        ? '🍫'
        : '🍯',
      name: formData.name,
      category: formData.category || formData.productType,
      price: `₹${parseFloat(formData.regularPrice || 0).toFixed(2)}`,
      status: parseInt(formData.stockQuantity || '0', 10) > 0 ? 'In Stock' : 'Out of Stock',
      stock: parseInt(formData.stockQuantity || '0', 10),
    };

    setProducts([newProduct, ...products]);

    // Reset Form
    setFormData({
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
    setImagePreview(null);
    alert('Product successfully published and added to Recently Added Products table!');
  };

  // Table Action: Delete Item
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((item) => item.id !== id));
    }
  };

  // Table Action: Edit Item
  const handleEditProduct = (item) => {
    setFormData((prev) => ({
      ...prev,
      name: item.name,
      category: item.category,
      regularPrice: item.price.replace('₹', ''),
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="apl-container">
      {/* Header Bar */}
      <div className="apl-header">
        <div className="apl-header-title">
          <h2>Add New Product</h2>
          <p>Fill in the details below to list a new product</p>
        </div>
      </div>

      {/* Main Grid Form */}
      <form onSubmit={handlePublish} className="apl-grid-container">
        {/* Left Column */}
        <div className="apl-column">
          {/* Basic Information Section */}
          <div className="apl-card">
            <h3 className="apl-card-title">Basic Information</h3>

            <div className="apl-form-row">
              <div className="apl-form-group">
                <label>
                  Product Name <span className="apl-required">*</span>
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
              <div className="apl-form-group">
                <label>Slug (URL Friendly)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="product-url-friendly"
                />
                <span className="apl-hint">Automatically generated from product name</span>
              </div>
            </div>

            <div className="apl-form-group">
              <label>
                Short Description <span className="apl-required">*</span>
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
              <span className="apl-counter">{formData.shortDesc.length}/160</span>
            </div>

            <div className="apl-form-group">
              <label>
                Detailed Description <span className="apl-required">*</span>
              </label>
              <div className="apl-editor-toolbar">
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
                className="apl-editor-area"
                rows="4"
                name="detailedDesc"
                value={formData.detailedDesc}
                onChange={handleInputChange}
                placeholder="Write detailed description about the product..."
                required
              ></textarea>
            </div>
          </div>

          {/* Product Type Section */}
          <div className="apl-card">
            <h3 className="apl-card-title">
              Product Type <span className="apl-required">*</span>
            </h3>
            <div className="apl-type-grid">
              <div
                className={`apl-type-card ${formData.productType === 'Chocolate' ? 'active' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, productType: 'Chocolate' }))}
              >
                <div className="apl-type-icon">🍫</div>
                <div>
                  <h4>Chocolate</h4>
                  <p>Chocolate based product</p>
                </div>
              </div>
              <div
                className={`apl-type-card ${formData.productType === 'Honey' ? 'active' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, productType: 'Honey' }))}
              >
                <div className="apl-type-icon">🍯</div>
                <div>
                  <h4>Honey</h4>
                  <p>Honey based product</p>
                </div>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="apl-card">
            <h3 className="apl-card-title">Images</h3>
            <div className="apl-image-section">
              <label
                className="apl-upload-box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <div className="apl-upload-icon">☁️</div>
                <p><strong>Click to upload images</strong></p>
                <p className="apl-upload-subtext">or drag and drop</p>
                <span className="apl-upload-note">PNG, JPG, WEBP up to 5MB</span>
              </label>

              <div className="apl-image-preview">
                <h4>Image Preview</h4>
                {imagePreview ? (
                  <div className="apl-active-preview">
                    <img src={imagePreview} alt="Upload Preview" />
                    <button
                      type="button"
                      className="apl-remove-img"
                      onClick={() => setImagePreview(null)}
                    >
                      ✕ Remove
                    </button>
                  </div>
                ) : (
                  <div className="apl-no-image">No images selected</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="apl-column">
          {/* Pricing & Inventory Section */}
          <div className="apl-card">
            <h3 className="apl-card-title">Pricing & Inventory</h3>
            <div className="apl-form-row three-cols">
              <div className="apl-form-group">
                <label>
                  Regular Price <span className="apl-required">*</span>
                </label>
                <div className="apl-input-prefix">
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
              <div className="apl-form-group">
                <label>Sale Price</label>
                <div className="apl-input-prefix">
                  <span>₹</span>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
                <span className="apl-hint">Leave empty if no sale</span>
              </div>
              <div className="apl-form-group">
                <label>Cost Price</label>
                <div className="apl-input-prefix">
                  <span>₹</span>
                  <input
                    type="number"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
                <span className="apl-hint">For internal use only</span>
              </div>
            </div>

            <div className="apl-form-row three-cols">
              <div className="apl-form-group">
                <label>
                  Stock Quantity <span className="apl-required">*</span>
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  required
                />
                <span className="apl-hint">Available stock quantity</span>
              </div>
              <div className="apl-form-group">
                <label>SKU (Stock Keeping Unit)</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="Enter SKU"
                />
                <span className="apl-hint">Unique product identifier</span>
              </div>
              <div className="apl-form-group">
                <label>Low Stock Alert</label>
                <input
                  type="number"
                  name="lowStockAlert"
                  value={formData.lowStockAlert}
                  onChange={handleInputChange}
                  placeholder="10"
                />
                <span className="apl-hint">Alert when stock is below this</span>
              </div>
            </div>
          </div>

          {/* Categories & Brand */}
          <div className="apl-card">
            <h3 className="apl-card-title">Categories & Brand</h3>
            <div className="apl-form-row three-cols">
              <div className="apl-form-group">
                <label>
                  Category <span className="apl-required">*</span>
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
              <div className="apl-form-group">
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
              <div className="apl-form-group">
                <label>
                  Brand <span className="apl-required">*</span>
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

          {/* Product Attributes Tags */}
          <div className="apl-card">
            <h3 className="apl-card-title">Product Attributes</h3>
            <div className="apl-tags-container">
              {tags.map((tag) => (
                <span key={tag.id} className={`apl-tag tag-${tag.color}`}>
                  {tag.name}{' '}
                  <b onClick={() => handleRemoveTag(tag.id)} className="apl-tag-close">
                    ✕
                  </b>
                </span>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="apl-card">
            <h3 className="apl-card-title">Additional Information</h3>
            <div className="apl-form-row four-cols">
              <div className="apl-form-group">
                <label>Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter weight"
                />
                <span className="apl-hint">e.g. 250g, 500ml</span>
              </div>
              <div className="apl-form-group">
                <label>Dimensions</label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="Enter dimensions"
                />
                <span className="apl-hint">e.g. 10x10x5 cm</span>
              </div>
              <div className="apl-form-group">
                <label>Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="apl-form-group">
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
            <div className="apl-switches-row">
              <div className="apl-switch-item">
                <div>
                  <strong>Featured Product</strong>
                  <p>Show on homepage</p>
                </div>
                <label className="apl-switch">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                  />
                  <span className="apl-slider"></span>
                </label>
              </div>

              <div className="apl-switch-item">
                <div>
                  <strong>Active Product</strong>
                  <p>Product is active</p>
                </div>
                <label className="apl-switch">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  <span className="apl-slider"></span>
                </label>
              </div>

              <div className="apl-switch-item">
                <div>
                  <strong>Allow Reviews</strong>
                  <p>Allow customer reviews</p>
                </div>
                <label className="apl-switch">
                  <input
                    type="checkbox"
                    name="allowReviews"
                    checked={formData.allowReviews}
                    onChange={handleInputChange}
                  />
                  <span className="apl-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Bottom Action Buttons */}
          <div className="apl-actions-row">
            <button type="button" className="apl-btn-cancel">Cancel</button>
            <button type="button" className="apl-btn-draft">Save as Draft</button>
            <button type="submit" className="apl-btn-publish">Publish Product</button>
          </div>
        </div>
      </form>

      {/* --- BOTTOM SECTION (REFERENCE IMAGE 1) --- */}
      <div className="apl-bottom-preview-grid">
        {/* Realtime Live Product Preview Card */}
        <div className="apl-card apl-preview-card">
          <h3 className="apl-card-title">Product Preview</h3>
          <div className="apl-preview-content">
            <div className="apl-preview-img-box">
              {imagePreview ? (
                <img src={imagePreview} alt="Live Preview" />
              ) : (
                <div className="apl-no-img-text">
                  <span>☁️</span>
                  <p>No image</p>
                </div>
              )}
            </div>

            <div className="apl-preview-details">
              <h4>{formData.name || 'Product Name'}</h4>
              <p className="apl-preview-desc">
                {formData.shortDesc || 'Short description will appear here...'}
              </p>
              <div className="apl-preview-tags">
                <span>{formData.category || 'Category'}</span>
                <span>{formData.brand || 'Brand'}</span>
              </div>
            </div>

            <div className="apl-preview-price">
              <h2>
                ₹{formData.regularPrice ? parseFloat(formData.regularPrice).toFixed(2) : '0.00'}
                {formData.salePrice && (
                  <del> ₹{parseFloat(formData.salePrice).toFixed(2)}</del>
                )}
              </h2>
              <span className="apl-stock-badge">
                {parseInt(formData.stockQuantity || '0', 10) > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Recently Added Products List Table */}
        <div className="apl-card apl-table-card">
          <div className="apl-table-header">
            <h3>Recently Added Products ({products.length})</h3>
            <a href="#viewall" className="apl-view-all-link">View All</a>
          </div>

          <div className="apl-table-wrapper">
            <table className="apl-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="apl-table-thumb">
                          {typeof item.image === 'string' &&
                          item.image.startsWith('data:image') ? (
                            <img src={item.image} alt={item.name} className="apl-thumb-img" />
                          ) : (
                            <span>{item.image}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <strong className="apl-table-title">{item.name}</strong>
                      </td>
                      <td className="apl-text-muted">{item.category}</td>
                      <td className="apl-price-text">{item.price}</td>
                      <td>
                        <span
                          className={`apl-badge-stock ${
                            item.status === 'Out of Stock' ? 'out' : ''
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="apl-table-actions">
                          <button
                            type="button"
                            className="apl-btn-act edit"
                            onClick={() => handleEditProduct(item)}
                            title="Edit Item"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            type="button"
                            className="apl-btn-act delete"
                            onClick={() => handleDeleteProduct(item.id)}
                            title="Delete Item"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="apl-empty-td">
                      No products added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddproductList;