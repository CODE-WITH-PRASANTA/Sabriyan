import React, { useState } from 'react';
import './AddproductList.css';

const AddproductList = () => {
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

  // Table Action: Delete Item
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="apl-container">
      {/* Bottom Section: Product Preview & Recently Added List */}
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
                {products.length > 0 ? (
                  products.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="apl-table-thumb">
                          {typeof item.image === 'string' &&
                          item.image.startsWith('data:image') ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="apl-thumb-img"
                            />
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