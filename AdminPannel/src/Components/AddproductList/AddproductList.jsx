import React, { useState, useEffect } from 'react';
import './AddproductList.css';
import API from '../../api/axios';

const AddproductList = ({ refreshTrigger }) => {
  // Preview & Form State
  const [formData] = useState({
    name: 'Dark Chocolate 55%',
    shortDesc: 'Rich and smooth dark chocolate with natural cocoa butter.',
    category: 'Dark Chocolate',
    brand: 'Chocolate',
    regularPrice: '240.00',
    salePrice: '210.00',
    stockQuantity: '45',
  });

  const [imagePreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get('/store-articles');
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  // Delete product handler
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await API.delete(`/store-articles/${id}`);
      setProducts((prev) => prev.filter((item) => (item._id || item.id) !== id));
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete product.');
    }
  };

  // Resolve correct image URL handling relative/absolute/backend paths
  const getImageSrc = (item) => {
    const rawImage = item.imageUrl || item.image || item.productImage;
    if (!rawImage) return null;

    if (typeof rawImage === 'string') {
      // 1. Direct full HTTP/HTTPS URL or Data URI
      if (
        rawImage.startsWith('http://') ||
        rawImage.startsWith('https://') ||
        rawImage.startsWith('data:image/')
      ) {
        return rawImage;
      }

      // 2. Relative backend path
      const backendBase = (API.defaults.baseURL || 'http://localhost:5000').replace(/\/api\/?$/, '');
      const cleanPath = rawImage.startsWith('/') ? rawImage : `/${rawImage}`;
      return `${backendBase}${cleanPath}`;
    }

    // 3. Object-based structure (e.g., Cloudinary/Multer)
    if (typeof rawImage === 'object' && rawImage.url) {
      return rawImage.url;
    }

    return null;
  };

  return (
    <div className="apl-container">
      {/* Top/Bottom Preview Section */}
      <div className="apl-bottom-preview-grid">
        {/* Live Product Preview Card */}
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
                ₹{formData.salePrice || formData.regularPrice || '0.00'}
                {formData.salePrice && formData.regularPrice && (
                  <del> ₹{parseFloat(formData.regularPrice).toFixed(2)}</del>
                )}
              </h2>
              <span
                className={`apl-stock-badge ${
                  parseInt(formData.stockQuantity || '0', 10) > 0 ? '' : 'out'
                }`}
              >
                {parseInt(formData.stockQuantity || '0', 10) > 0
                  ? 'In Stock'
                  : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Recently Added Products List Table */}
        <div className="apl-card apl-table-card">
          <div className="apl-table-header">
            <h3>Recently Added Products ({products.length})</h3>
            <a href="#viewall" className="apl-view-all-link">
              View All
            </a>
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
                {loading ? (
                  <tr>
                    <td colSpan="6" className="apl-empty-td">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((item) => {
                    const itemId = item._id || item.id;
                    const imgSrc = getImageSrc(item);
                    const isOutOfStock = parseInt(item.stockQuantity || '0', 10) <= 0;

                    return (
                      <tr key={itemId}>
                        <td>
                          <div className="apl-table-thumb">
                            {imgSrc ? (
                              <img
                                src={imgSrc}
                                alt={item.name}
                                className="apl-thumb-img"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  if (e.target.nextSibling) {
                                    e.target.nextSibling.style.display = 'inline';
                                  }
                                }}
                              />
                            ) : null}
                            <span style={{ display: imgSrc ? 'none' : 'inline' }}>
                              {item.productType === 'Honey' ? '🍯' : '🍫'}
                            </span>
                          </div>
                        </td>
                        <td>
                          <strong className="apl-table-title">{item.name}</strong>
                        </td>
                        <td className="apl-text-muted">{item.category}</td>
                        <td className="apl-price-text">
                          ₹{item.salePrice || item.regularPrice}
                        </td>
                        <td>
                          <span className={`apl-badge-stock ${isOutOfStock ? 'out' : ''}`}>
                            {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                          </span>
                        </td>
                        <td>
                          <div className="apl-table-actions">
                            <button
                              type="button"
                              className="apl-btn-act edit"
                              title="Edit Item"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              type="button"
                              className="apl-btn-act delete"
                              onClick={() => handleDeleteProduct(itemId)}
                              title="Delete Item"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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