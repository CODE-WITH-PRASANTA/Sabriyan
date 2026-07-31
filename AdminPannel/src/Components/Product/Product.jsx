import React, { useState, useMemo } from 'react';
import './Product.css';

const Product = () => {
  const initialProducts = [
    { id: 1, image: '🍫', name: 'Dark Classic 55% Cocoa', desc: 'Rich & Intense Chocolate', sku: 'CHO-001', brand: 'Chocolate', category: 'Dark Chocolate', price: 899, stock: 45, status: 'Active' },
    { id: 2, image: '🍫', name: 'Milk Delight', desc: 'Smooth & Creamy Chocolate', sku: 'CHO-002', brand: 'Chocolate', category: 'Milk Chocolate', price: 650, stock: 32, status: 'Active' },
    { id: 3, image: '🍫', name: 'Nut Fusion', desc: 'Almond & Pistachio', sku: 'CHO-003', brand: 'Chocolate', category: 'Nut Chocolate', price: 749, stock: 18, status: 'Active' },
    { id: 4, image: '🎁', name: 'Gift Box Collection', desc: 'Premium Chocolate Box', sku: 'CHO-004', brand: 'Chocolate', category: 'Gift Packs', price: 1299, stock: 20, status: 'Active' },
    { id: 5, image: '🍯', name: 'Wild Forest Honey', desc: '100% Pure & Natural', sku: 'HON-001', brand: 'Honey', category: 'Raw Honey', price: 499, stock: 50, status: 'Active' },
    { id: 6, image: '🍯', name: 'Tulsi Honey', desc: 'Immunity Booster', sku: 'HON-002', brand: 'Honey', category: 'Flavoured Honey', price: 549, stock: 15, status: 'Active' },
    { id: 7, image: '🍯', name: 'Acacia Honey', desc: 'Light & Mild Honey', sku: 'HON-003', brand: 'Honey', category: 'Raw Honey', price: 599, stock: 28, status: 'Active' },
    { id: 8, image: '🍯', name: 'Honey & Chocolate Combo', desc: 'Perfect Gift Combo', sku: 'COM-001', brand: 'Combo', category: 'Combo Packs', price: 1199, stock: 10, status: 'Active' },
    { id: 9, image: '🍫', name: 'Belgian Dark 70%', desc: 'Bittersweet Premium', sku: 'CHO-005', brand: 'Chocolate', category: 'Dark Chocolate', price: 999, stock: 12, status: 'Active' },
    { id: 10, image: '🍯', name: 'Eucalyptus Honey', desc: 'Herbal & Aromatic', sku: 'HON-004', brand: 'Honey', category: 'Raw Honey', price: 620, stock: 22, status: 'Active' }
  ];

  const [products, setProducts] = useState(initialProducts);
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
  const [formData, setFormData] = useState({ name: '', sku: '', desc: '', brand: 'Chocolate', category: 'Dark Chocolate', price: '', stock: '' });

  // Real-time Filtering Engine
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (activeTab === 'Chocolate' && p.brand !== 'Chocolate') return false;
      if (activeTab === 'Honey' && p.brand !== 'Honey') return false;

      const q = search.toLowerCase();
      if (q && !p.name.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) return false;

      if (category !== 'All' && p.category !== category) return false;
      if (brand !== 'All' && p.brand !== brand) return false;
      if (!brandsFilter[p.brand]) return false;
      if (p.price > priceRange) return false;

      const isLow = p.stock <= 20;
      if (!stockFilter.inStock && !isLow) return false;
      if (!stockFilter.lowStock && isLow) return false;

      return true;
    }).sort((a, b) => sortBy === 'Price Low-High' ? a.price - b.price : sortBy === 'Price High-Low' ? b.price - a.price : 0);
  }, [products, activeTab, search, category, brand, brandsFilter, priceRange, stockFilter, sortBy]);

  // Dynamic Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset Filters Handler
  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setBrand('All');
    setPriceRange(5000);
    setBrandsFilter({ Chocolate: true, Honey: true, Combo: true });
    setStockFilter({ inStock: true, lowStock: true });
    setActiveTab('All Products');
    setCurrentPage(1);
  };

  // Add / Edit Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newItem = {
        id: Date.now(),
        image: formData.brand === 'Honey' ? '🍯' : formData.brand === 'Combo' ? '🎁' : '🍫',
        name: formData.name,
        desc: formData.desc || 'Fresh product listing',
        sku: formData.sku,
        brand: formData.brand,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock || 0),
        status: 'Active'
      };
      setProducts([newItem, ...products]);
    } else if (modalType === 'edit') {
      setProducts(products.map((p) => p.id === selectedItem.id ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) } : p));
    }
    setModalType(null);
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
                <button key={tab} className={`prd-tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => { setActiveTab(tab); setCurrentPage(1); }}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="prd-top-actions">
              <button className="prd-btn-export" onClick={() => alert('Exporting dataset...')}>📥 Export</button>
              <button className="prd-btn-add" onClick={() => { setFormData({ name: '', sku: '', desc: '', brand: 'Chocolate', category: 'Dark Chocolate', price: '', stock: '' }); setModalType('add'); }}>
                + Add New Product
              </button>
            </div>
          </div>

          {/* Quick Filter Bar */}
          <div className="prd-filter-bar">
            <div className="prd-search-input-box">
              <span className="prd-search-icon">🔍</span>
              <input type="text" placeholder="Search by name, SKU..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="prd-dropdown-group">
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="All">All Categories</option>
                <option value="Dark Chocolate">Dark Chocolate</option>
                <option value="Milk Chocolate">Milk Chocolate</option>
                <option value="Nut Chocolate">Nut Chocolate</option>
                <option value="Raw Honey">Raw Honey</option>
              </select>
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="All">All Brands</option>
                <option value="Chocolate">Chocolate</option>
                <option value="Honey">Honey</option>
                <option value="Combo">Combo</option>
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="Newest First">Sort: Newest First</option>
                <option value="Price Low-High">Price: Low to High</option>
                <option value="Price High-Low">Price: High to Low</option>
              </select>
              <button className="prd-btn-filter-icon" onClick={resetFilters}>⚙️ Reset</button>
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
                  {paginatedItems.length > 0 ? paginatedItems.map((item) => {
                    const isLow = item.stock <= 20;
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="prd-product-cell">
                            <div className="prd-thumb">{item.image}</div>
                            <div className="prd-product-info">
                              <strong>{item.name}</strong>
                              <span className="prd-product-desc">{item.desc}</span>
                            </div>
                          </div>
                        </td>
                        <td><span className="prd-sku-tag">{item.sku}</span></td>
                        <td><span className={`prd-brand-badge brand-${item.brand.toLowerCase()}`}>{item.brand}</span></td>
                        <td className="prd-text-muted">{item.category}</td>
                        <td className="prd-price-bold">₹{item.price}</td>
                        <td>
                          <div className="prd-stock-cell">
                            <span className={`prd-stock-num ${isLow ? 'low' : 'good'}`}>{item.stock}</span>
                            <span className={`prd-stock-label ${isLow ? 'low' : 'good'}`}>{isLow ? 'Low Stock' : 'In Stock'}</span>
                          </div>
                        </td>
                        <td><span className="prd-status-badge active">{item.status}</span></td>
                        <td>
                          <div className="prd-action-btns">
                            <button className="prd-act-btn view" title="View" onClick={() => { setSelectedItem(item); setModalType('view'); }}>👁️</button>
                            <button className="prd-act-btn edit" title="Edit" onClick={() => { setSelectedItem(item); setFormData(item); setModalType('edit'); }}>✏️</button>
                            <button className="prd-act-btn delete" title="Delete" onClick={() => setProducts(products.filter(p => p.id !== item.id))}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan="8" className="prd-empty-row">No products match your selected filters.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="prd-pagination">
              <span className="prd-pagination-info">
                Showing {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
              </span>
              <div className="prd-page-btns">
                <button className="prd-page-nav" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button key={pg} className={`prd-page-num ${currentPage === pg ? 'active' : ''}`} onClick={() => setCurrentPage(pg)}>
                    {pg}
                  </button>
                ))}
                <button className="prd-page-nav" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>›</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Filter Panel */}
        <div className="prd-sidebar-filter">
          <div className="prd-sidebar-header">
            <h3>Filter Products</h3>
            <button className="prd-clear-link" onClick={resetFilters}>Clear All</button>
          </div>

          <div className="prd-filter-section">
            <label className="prd-filter-label">Search</label>
            <input type="text" className="prd-sidebar-input" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="prd-filter-section">
            <label className="prd-filter-label">Brand</label>
            <div className="prd-checkbox-group">
              {['Chocolate', 'Honey', 'Combo'].map((b) => (
                <label key={b} className="prd-checkbox-item">
                  <input type="checkbox" checked={brandsFilter[b]} onChange={(e) => setBrandsFilter({ ...brandsFilter, [b]: e.target.checked })} />
                  <span>{b} ({products.filter(p => p.brand === b).length})</span>
                </label>
              ))}
            </div>
          </div>

          <div className="prd-filter-section">
            <label className="prd-filter-label">Category</label>
            <select className="prd-sidebar-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">Select Category</option>
              <option value="Dark Chocolate">Dark Chocolate</option>
              <option value="Milk Chocolate">Milk Chocolate</option>
              <option value="Nut Chocolate">Nut Chocolate</option>
              <option value="Raw Honey">Raw Honey</option>
            </select>
          </div>

          <div className="prd-filter-section">
            <label className="prd-filter-label">Price Range (Up to ₹{priceRange})</label>
            <input type="range" min="0" max="5000" step="100" value={priceRange} className="prd-range-slider" onChange={(e) => setPriceRange(Number(e.target.value))} />
            <div className="prd-range-values"><span>₹0</span><span>₹5000+</span></div>
          </div>

          <div className="prd-filter-section">
            <label className="prd-filter-label">Stock Status</label>
            <div className="prd-checkbox-group">
              <label className="prd-checkbox-item">
                <input type="checkbox" checked={stockFilter.inStock} onChange={(e) => setStockFilter({ ...stockFilter, inStock: e.target.checked })} />
                <span>In Stock</span>
              </label>
              <label className="prd-checkbox-item">
                <input type="checkbox" checked={stockFilter.lowStock} onChange={(e) => setStockFilter({ ...stockFilter, lowStock: e.target.checked })} />
                <span>Low Stock</span>
              </label>
            </div>
          </div>

          <div className="prd-sidebar-buttons">
            <button className="prd-btn-reset" onClick={resetFilters}>Reset</button>
            <button className="prd-btn-apply" onClick={() => alert('Filter applied!')}>Apply Filters</button>
          </div>
        </div>
      </div>

      {/* --- ADD / EDIT / VIEW MODAL POP-UPS --- */}
      {modalType && (
        <div className="prd-modal-overlay">
          <div className="prd-modal-content">
            <div className="prd-modal-header">
              <h3>{modalType === 'add' ? '✨ Add New Product' : modalType === 'edit' ? `✏️ Edit Product (${selectedItem?.sku})` : '👁️ Product Overview'}</h3>
              <button className="prd-modal-close" onClick={() => setModalType(null)}>✕</button>
            </div>

            {modalType === 'view' ? (
              <div className="prd-view-body">
                <div className="prd-view-icon">{selectedItem?.image}</div>
                <h4>{selectedItem?.name}</h4>
                <p className="prd-view-desc">{selectedItem?.desc}</p>
                <div className="prd-view-grid">
                  <div><span className="prd-view-label">SKU</span><strong>{selectedItem?.sku}</strong></div>
                  <div><span className="prd-view-label">Brand</span><strong>{selectedItem?.brand}</strong></div>
                  <div><span className="prd-view-label">Category</span><strong>{selectedItem?.category}</strong></div>
                  <div><span className="prd-view-label">Price</span><strong className="text-green">₹{selectedItem?.price}</strong></div>
                  <div><span className="prd-view-label">Stock</span><strong>{selectedItem?.stock} units</strong></div>
                  <div><span className="prd-view-label">Status</span><strong>{selectedItem?.status}</strong></div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="prd-modal-form">
                <div className="prd-form-row">
                  <div className="prd-form-group"><label>Product Name *</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
                  <div className="prd-form-group"><label>SKU *</label><input type="text" required value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} /></div>
                </div>
                <div className="prd-form-group"><label>Description</label><input type="text" value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} /></div>
                <div className="prd-form-row">
                  <div className="prd-form-group">
                    <label>Brand</label>
                    <select value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })}>
                      <option value="Chocolate">Chocolate</option><option value="Honey">Honey</option><option value="Combo">Combo</option>
                    </select>
                  </div>
                  <div className="prd-form-group">
                    <label>Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                      <option value="Dark Chocolate">Dark Chocolate</option><option value="Milk Chocolate">Milk Chocolate</option><option value="Nut Chocolate">Nut Chocolate</option><option value="Raw Honey">Raw Honey</option>
                    </select>
                  </div>
                </div>
                <div className="prd-form-row">
                  <div className="prd-form-group"><label>Price (₹) *</label><input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} /></div>
                  <div className="prd-form-group"><label>Stock Quantity</label><input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} /></div>
                </div>
                <div className="prd-modal-actions">
                  <button type="button" className="prd-btn-reset" onClick={() => setModalType(null)}>Cancel</button>
                  <button type="submit" className="prd-btn-apply">{modalType === 'add' ? 'Add Product' : 'Save Changes'}</button>
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