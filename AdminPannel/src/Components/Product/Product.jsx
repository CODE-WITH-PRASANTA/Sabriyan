import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './Product.css';
import API from '../../api/axios';

const Product = () => {
  // Products & Meta Data States
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter & Search States
  const [activeTab, setActiveTab] = useState('All Products');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');
  const [priceRange, setPriceRange] = useState(5000);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sidebar Filter Checkboxes State
  const [brandsFilter, setBrandsFilter] = useState({ Chocolate: true, Honey: true, Combo: true });
  const [stockFilter, setStockFilter] = useState({ inStock: true, lowStock: true });

  // Modals State
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'view'
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    desc: '',
    brand: 'Chocolate',
    category: 'Dark Chocolate',
    price: '',
    stock: '',
  });

  // 1. FETCH PRODUCTS FROM BACKEND API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get('/products');
      if (response.data && response.data.success) {
        setProducts(response.data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. FETCH DYNAMIC CATEGORIES FOR FILTER DROPDOWNS
  const fetchCategories = useCallback(async () => {
    try {
      const response = await API.get('/categories', { params: { status: 'Active', limit: 100 } });
      if (response.data && response.data.success) {
        setCategoriesList(response.data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

  // 3. FETCH DYNAMIC BRANDS FOR FILTER CHECKBOXES & DROPDOWNS
  const fetchBrands = useCallback(async () => {
    try {
      const response = await API.get('/brands', { params: { status: 'Active', limit: 100 } });
      if (response.data && response.data.success) {
        const fetchedBrands = response.data.data || [];
        setBrandsList(fetchedBrands);

        // Dynamically initialize brand checkbox filters
        const initialBrandState = {};
        fetchedBrands.forEach((b) => {
          initialBrandState[b.name] = true;
        });
        if (fetchedBrands.length > 0) {
          setBrandsFilter((prev) => ({ ...initialBrandState, ...prev }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, [fetchProducts, fetchCategories, fetchBrands]);

  // Real-time Filtering Engine
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Tab Navigation Filter
        if (activeTab === 'Chocolate' && p.brand !== 'Chocolate') return false;
        if (activeTab === 'Honey' && p.brand !== 'Honey') return false;

        // Search Filter (Name or SKU)
        const q = search.toLowerCase();
        if (q && !p.name.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) return false;

        // Category Filter
        if (category !== 'All' && p.category !== category) return false;

        // Brand Dropdown Filter
        if (brand !== 'All' && p.brand !== brand) return false;

        // Sidebar Brand Checkbox Filter
        if (brandsFilter[p.brand] === false) return false;

        // Price Range Slider Filter
        if (p.price > priceRange) return false;

        // Stock Status Checkboxes
        const isLow = p.stock <= 20;
        if (!stockFilter.inStock && !isLow) return false;
        if (!stockFilter.lowStock && isLow) return false;

        return true;
      })
      .sort((a, b) =>
        sortBy === 'Price Low-High'
          ? a.price - b.price
          : sortBy === 'Price High-Low'
          ? b.price - a.price
          : new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
  }, [products, activeTab, search, category, brand, brandsFilter, priceRange, stockFilter, sortBy]);

  // Dynamic Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset All Filters Handler
  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setBrand('All');
    setPriceRange(5000);

    const resetBrands = {};
    brandsList.forEach((b) => { resetBrands[b.name] = true; });
    setBrandsFilter({ Chocolate: true, Honey: true, Combo: true, ...resetBrands });

    setStockFilter({ inStock: true, lowStock: true });
    setActiveTab('All Products');
    setCurrentPage(1);
  };

  // 4. ADD & EDIT FORM SUBMIT HANDLER
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.sku.trim() || !formData.price) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock || 0),
      };

      if (modalType === 'add') {
        const response = await API.post('/products', payload);
        if (response.data && response.data.success) {
          fetchProducts();
          setModalType(null);
        }
      } else if (modalType === 'edit') {
        const productId = selectedItem._id || selectedItem.id;
        const response = await API.put(`/products/${productId}`, payload);
        if (response.data && response.data.success) {
          fetchProducts();
          setModalType(null);
        }
      }
    } catch (error) {
      console.error('Error saving product:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. DELETE PRODUCT HANDLER
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const response = await API.delete(`/products/${id}`);
      if (response.data && response.data.success) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="prd-container">
      <div className="prd-main-layout">
        {/* Left Side: Controls & Data Table */}
        <div className="prd-content-area">
          {/* Header Action Nav */}
          <div className="prd-tab-bar">
            <div className="prd-tabs">
              {['All Products', 'Chocolate', 'Honey'].map((tab) => (
                <button
                  key={tab}
                  className={`prd-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="prd-top-actions">
              <button className="prd-btn-export" onClick={() => alert('Exporting dataset...')}>
                📥 Export
              </button>
              <button
                className="prd-btn-add"
                onClick={() => {
                  setFormData({
                    name: '',
                    sku: '',
                    desc: '',
                    brand: brandsList[0]?.name || 'Chocolate',
                    category: categoriesList[0]?.name || 'Dark Chocolate',
                    price: '',
                    stock: '',
                  });
                  setModalType('add');
                }}
              >
                + Add New Product
              </button>
            </div>
          </div>

          {/* Quick Filter Bar */}
          <div className="prd-filter-bar">
            <div className="prd-search-input-box">
              <span className="prd-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, SKU..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="prd-dropdown-group">
              {/* Dynamic Categories Dropdown */}
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Categories</option>
                {categoriesList.map((cat) => (
                  <option key={cat._id || cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Dynamic Brands Dropdown */}
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Brands</option>
                {brandsList.map((b) => (
                  <option key={b._id || b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>

              {/* Sort Order Dropdown */}
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="Newest First">Sort: Newest First</option>
                <option value="Price Low-High">Price: Low to High</option>
                <option value="Price High-Low">Price: High to Low</option>
              </select>

              <button className="prd-btn-filter-icon" onClick={resetFilters}>
                ⚙️ Reset
              </button>
            </div>
          </div>

          {/* Table Area */}
          <div className="prd-table-card">
            <div className="prd-table-wrapper">
              <table className="prd-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="prd-empty-row">
                        Loading products...
                      </td>
                    </tr>
                  ) : paginatedItems.length > 0 ? (
                    paginatedItems.map((item) => {
                      const productId = item._id || item.id;
                      const isLow = item.stock <= 20;
                      return (
                        <tr key={productId}>
                          <td>
                            <div className="prd-product-cell">
                              <div className="prd-thumb">{item.image}</div>
                              <div className="prd-product-info">
                                <strong>{item.name}</strong>
                                <span className="prd-product-desc">{item.desc}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="prd-sku-tag">{item.sku}</span>
                          </td>
                          <td>
                            <span
                              className={`prd-brand-badge brand-${(
                                item.brand || 'chocolate'
                              ).toLowerCase()}`}
                            >
                              {item.brand}
                            </span>
                          </td>
                          <td className="prd-text-muted">{item.category}</td>
                          <td className="prd-price-bold">₹{item.price}</td>
                          <td>
                            <div className="prd-stock-cell">
                              <span className={`prd-stock-num ${isLow ? 'low' : 'good'}`}>
                                {item.stock}
                              </span>
                              <span className={`prd-stock-label ${isLow ? 'low' : 'good'}`}>
                                {isLow ? 'Low Stock' : 'In Stock'}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="prd-status-badge active">
                              {item.status || 'Active'}
                            </span>
                          </td>
                          <td>
                            <div className="prd-action-btns">
                              <button
                                className="prd-act-btn view"
                                title="View"
                                onClick={() => {
                                  setSelectedItem(item);
                                  setModalType('view');
                                }}
                              >
                                👁️
                              </button>
                              <button
                                className="prd-act-btn edit"
                                title="Edit"
                                onClick={() => {
                                  setSelectedItem(item);
                                  setFormData({
                                    name: item.name || '',
                                    sku: item.sku || '',
                                    desc: item.desc || '',
                                    brand: item.brand || 'Chocolate',
                                    category: item.category || 'Dark Chocolate',
                                    price: item.price || '',
                                    stock: item.stock || '',
                                  });
                                  setModalType('edit');
                                }}
                              >
                                ✏️
                              </button>
                              <button
                                className="prd-act-btn delete"
                                title="Delete"
                                onClick={() => handleDeleteProduct(productId)}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="prd-empty-row">
                        No products match your selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="prd-pagination">
              <span className="prd-pagination-info">
                Showing{' '}
                {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{' '}
                {filteredProducts.length} entries
              </span>
              <div className="prd-page-btns">
                <button
                  className="prd-page-nav"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    className={`prd-page-num ${currentPage === pg ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pg)}
                  >
                    {pg}
                  </button>
                ))}
                <button
                  className="prd-page-nav"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Filter Panel */}
        <div className="prd-sidebar-filter">
          <div className="prd-sidebar-header">
            <h3>Filter Products</h3>
            <button className="prd-clear-link" onClick={resetFilters}>
              Clear All
            </button>
          </div>

          <div className="prd-filter-section">
            <label className="prd-filter-label">Search</label>
            <input
              type="text"
              className="prd-sidebar-input"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Dynamic Brands Checkbox Section */}
          <div className="prd-filter-section">
            <label className="prd-filter-label">Brand</label>
            <div className="prd-checkbox-group">
              {(brandsList.length > 0 ? brandsList.map((b) => b.name) : ['Chocolate', 'Honey', 'Combo']).map(
                (b) => (
                  <label key={b} className="prd-checkbox-item">
                    <input
                      type="checkbox"
                      checked={brandsFilter[b] ?? true}
                      onChange={(e) =>
                        setBrandsFilter({ ...brandsFilter, [b]: e.target.checked })
                      }
                    />
                    <span>
                      {b} ({products.filter((p) => p.brand === b).length})
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Dynamic Categories Sidebar Selection */}
          <div className="prd-filter-section">
            <label className="prd-filter-label">Category</label>
            <select
              className="prd-sidebar-select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">Select Category</option>
              {categoriesList.map((cat) => (
                <option key={cat._id || cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="prd-filter-section">
            <label className="prd-filter-label">
              Price Range (Up to ₹{priceRange})
            </label>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange}
              className="prd-range-slider"
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
            <div className="prd-range-values">
              <span>₹0</span>
              <span>₹5000+</span>
            </div>
          </div>

          <div className="prd-filter-section">
            <label className="prd-filter-label">Stock Status</label>
            <div className="prd-checkbox-group">
              <label className="prd-checkbox-item">
                <input
                  type="checkbox"
                  checked={stockFilter.inStock}
                  onChange={(e) =>
                    setStockFilter({ ...stockFilter, inStock: e.target.checked })
                  }
                />
                <span>In Stock</span>
              </label>
              <label className="prd-checkbox-item">
                <input
                  type="checkbox"
                  checked={stockFilter.lowStock}
                  onChange={(e) =>
                    setStockFilter({ ...stockFilter, lowStock: e.target.checked })
                  }
                />
                <span>Low Stock</span>
              </label>
            </div>
          </div>

          <div className="prd-sidebar-buttons">
            <button className="prd-btn-reset" onClick={resetFilters}>
              Reset
            </button>
            <button className="prd-btn-apply" onClick={() => setCurrentPage(1)}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* --- ADD / EDIT / VIEW MODAL POP-UPS --- */}
      {modalType && (
        <div className="prd-modal-overlay">
          <div className="prd-modal-content">
            <div className="prd-modal-header">
              <h3>
                {modalType === 'add'
                  ? '✨ Add New Product'
                  : modalType === 'edit'
                  ? `✏️ Edit Product (${selectedItem?.sku})`
                  : '👁️ Product Overview'}
              </h3>
              <button className="prd-modal-close" onClick={() => setModalType(null)}>
                ✕
              </button>
            </div>

            {modalType === 'view' ? (
              <div className="prd-view-body">
                <div className="prd-view-icon">{selectedItem?.image}</div>
                <h4>{selectedItem?.name}</h4>
                <p className="prd-view-desc">{selectedItem?.desc}</p>
                <div className="prd-view-grid">
                  <div>
                    <span className="prd-view-label">SKU</span>
                    <strong>{selectedItem?.sku}</strong>
                  </div>
                  <div>
                    <span className="prd-view-label">Brand</span>
                    <strong>{selectedItem?.brand}</strong>
                  </div>
                  <div>
                    <span className="prd-view-label">Category</span>
                    <strong>{selectedItem?.category}</strong>
                  </div>
                  <div>
                    <span className="prd-view-label">Price</span>
                    <strong className="text-green">₹{selectedItem?.price}</strong>
                  </div>
                  <div>
                    <span className="prd-view-label">Stock</span>
                    <strong>{selectedItem?.stock} units</strong>
                  </div>
                  <div>
                    <span className="prd-view-label">Status</span>
                    <strong>{selectedItem?.status || 'Active'}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="prd-modal-form">
                <div className="prd-form-row">
                  <div className="prd-form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="prd-form-group">
                    <label>SKU *</label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) =>
                        setFormData({ ...formData, sku: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="prd-form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={formData.desc}
                    onChange={(e) =>
                      setFormData({ ...formData, desc: e.target.value })
                    }
                  />
                </div>
                <div className="prd-form-row">
                  <div className="prd-form-group">
                    <label>Brand</label>
                    <select
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData({ ...formData, brand: e.target.value })
                      }
                    >
                      {brandsList.length > 0 ? (
                        brandsList.map((b) => (
                          <option key={b._id || b.id} value={b.name}>
                            {b.name}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="Chocolate">Chocolate</option>
                          <option value="Honey">Honey</option>
                          <option value="Combo">Combo</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="prd-form-group">
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      {categoriesList.length > 0 ? (
                        categoriesList.map((cat) => (
                          <option key={cat._id || cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="Dark Chocolate">Dark Chocolate</option>
                          <option value="Milk Chocolate">Milk Chocolate</option>
                          <option value="Nut Chocolate">Nut Chocolate</option>
                          <option value="Raw Honey">Raw Honey</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
                <div className="prd-form-row">
                  <div className="prd-form-group">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="prd-form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="prd-modal-actions">
                  <button
                    type="button"
                    className="prd-btn-reset"
                    onClick={() => setModalType(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="prd-btn-apply"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? 'Saving...'
                      : modalType === 'add'
                      ? 'Add Product'
                      : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;