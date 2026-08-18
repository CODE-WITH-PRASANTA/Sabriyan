import React, { useState, useEffect } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'Dark Chocolate 70%', sku: 'CH0001', category: 'Dark Chocolate', stock: 120, unit: 'pcs', lowStock: 20, cost: '45.00', expiry: '30 Jun 2025', status: 'In Stock', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=60' },
    { id: 2, name: 'Milk Chocolate Almond', sku: 'CH0002', category: 'Milk Chocolate', stock: 85, unit: 'pcs', lowStock: 15, cost: '55.00', expiry: '25 Aug 2025', status: 'In Stock', img: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=100&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Honey Chocolate Bar', sku: 'CH0003', category: 'Honey Chocolate', stock: 60, unit: 'pcs', lowStock: 10, cost: '60.00', expiry: '15 Jul 2025', status: 'In Stock', img: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=100&auto=format&fit=crop&q=60' },
    { id: 4, name: 'Chocolate Truffle Box', sku: 'CH0004', category: 'Truffles', stock: 25, unit: 'pcs', lowStock: 5, cost: '120.00', expiry: '10 Jun 2025', status: 'Low Stock', img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=100&auto=format&fit=crop&q=60' },
    { id: 5, name: 'White Chocolate Cranberry', sku: 'CH0005', category: 'White Chocolate', stock: 40, unit: 'pcs', lowStock: 8, cost: '65.00', expiry: '20 Sep 2025', status: 'In Stock', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=100&auto=format&fit=crop&q=60' },
    { id: 6, name: 'Cocoa Powder 250g', sku: 'ING001', category: 'Ingredients', stock: 30, unit: 'pcs', lowStock: 6, cost: '35.00', expiry: '12 Dec 2025', status: 'Low Stock', img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=100&auto=format&fit=crop&q=60' },
    { id: 7, name: 'Honey Raw 500ml', sku: 'HON001', category: 'Honey Product', stock: 18, unit: 'pcs', lowStock: 4, cost: '150.00', expiry: '05 Oct 2025', status: 'Low Stock', img: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=100&auto=format&fit=crop&q=60' },
  ]);

  const [formData, setFormData] = useState({
    product: '',
    sku: '',
    category: '',
    unit: 'pcs',
    quantity: '',
    lowStockAlert: '',
    costPrice: '',
    expiryDate: '',
    supplier: '',
    notes: ''
  });

  // Handle Background Scroll Lock
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      product: '', sku: '', category: '', unit: 'pcs',
      quantity: '', lowStockAlert: '', costPrice: '',
      expiryDate: '', supplier: '', notes: ''
    });
    setEditingId(null);
  };

  const handleOpenAddModal = () => {
    handleReset();
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const qtyNum = parseInt(formData.quantity) || 0;
    const lowNum = parseInt(formData.lowStockAlert) || 0;
    const statusVal = qtyNum <= lowNum ? 'Low Stock' : 'In Stock';

    if (editingId !== null) {
      setInventoryItems(prev => prev.map(item => {
        if (item.id === editingId) {
          return {
            ...item,
            name: formData.product,
            sku: formData.sku,
            category: formData.category,
            stock: qtyNum,
            unit: formData.unit,
            lowStock: lowNum,
            cost: formData.costPrice,
            expiry: formData.expiryDate || item.expiry,
            status: statusVal
          };
        }
        return item;
      }));
    } else {
      const newItem = {
        id: Date.now(),
        name: formData.product,
        sku: formData.sku,
        category: formData.category,
        stock: qtyNum,
        unit: formData.unit,
        lowStock: lowNum,
        cost: formData.costPrice,
        expiry: formData.expiryDate || '31 Dec 2026',
        status: statusVal,
        img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=60'
      };
      setInventoryItems(prev => [newItem, ...prev]);
    }

    setIsModalOpen(false);
    handleReset();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      product: item.name,
      sku: item.sku,
      category: item.category,
      unit: item.unit || 'pcs',
      quantity: item.stock.toString(),
      lowStockAlert: item.lowStock.toString(),
      costPrice: item.cost,
      expiryDate: item.expiry,
      supplier: '',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      setInventoryItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleImport = () => {
    const simulatedImport = {
      id: Date.now(),
      name: 'Imported Cocoa Bar',
      sku: `IMP00${Math.floor(Math.random() * 90 + 10)}`,
      category: 'Dark Chocolate',
      stock: 50,
      unit: 'pcs',
      lowStock: 10,
      cost: '40.00',
      expiry: '10 Nov 2026',
      status: 'In Stock',
      img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=60'
    };
    setInventoryItems(prev => [simulatedImport, ...prev]);
    alert('Successfully imported 1 new inventory item!');
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="Inventory-dashboard">
      <div className="Inventory-header">
        <div className="Inventory-header-title-wrapper">
          <div className="Inventory-header-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/></svg>
          </div>
          <div>
            <h1>Inventory Management</h1>
            <p>Add new stock or update existing inventory items.</p>
          </div>
        </div>
        <div className="Inventory-header-actions">
          <button className="Inventory-btn-secondary" onClick={handleImport}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Import Inventory
          </button>
          <button className="Inventory-btn-primary" onClick={handleOpenAddModal}>
            + Add New Item
          </button>
        </div>
      </div>

      <div className="Inventory-card">
        <h2 className="Inventory-section-title">Current Inventory</h2>

        <div className="Inventory-filters-bar">
          <div className="Inventory-search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input 
              type="text" 
              placeholder="Search by product, SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="Inventory-filter-dropdowns">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="Inventory-category-select"
            >
              <option>All Categories</option>
              <option>Dark Chocolate</option>
              <option>Milk Chocolate</option>
              <option>Honey Chocolate</option>
              <option>Truffles</option>
              <option>White Chocolate</option>
              <option>Ingredients</option>
              <option>Honey Product</option>
            </select>
            <button className="Inventory-filter-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filter
            </button>
          </div>
        </div>

        <div className="Inventory-table-responsive">
          <table className="Inventory-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Low Stock</th>
                <th>Cost Price</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="Inventory-product-cell">
                      <div className="Inventory-thumb-container">
                        <img src={item.img} alt={item.name} className="Inventory-product-thumb" />
                      </div>
                      <span>{item.name}</span>
                    </td>
                    <td className="Inventory-sku-cell">{item.sku}</td>
                    <td>{item.category}</td>
                    <td>{item.stock} <span className="Inventory-unit-text">{item.unit || ''}</span></td>
                    <td>{item.lowStock}</td>
                    <td>₹{item.cost}</td>
                    <td>{item.expiry}</td>
                    <td>
                      <span className={`Inventory-status-badge ${item.status === 'In Stock' ? 'Inventory-in-stock' : 'Inventory-low-stock'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="Inventory-action-btns">
                        <button className="Inventory-icon-btn" title="Edit" onClick={() => handleEdit(item)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button className="Inventory-icon-btn Inventory-delete" title="Delete" onClick={() => handleDelete(item.id)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                    No inventory items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="Inventory-footer">
          <span className="Inventory-pagination-info">Showing {filteredItems.length} of {inventoryItems.length} items</span>
          <div className="Inventory-pagination-controls">
            <button className="Inventory-page-btn" disabled>&lt;</button>
            <button className="Inventory-page-btn Inventory-active">1</button>
            <button className="Inventory-page-btn" disabled>&gt;</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="Inventory-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="Inventory-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="Inventory-modal-header">
              <h2>{editingId !== null ? 'Update Inventory Item' : 'Add New Inventory Item'}</h2>
              <button className="Inventory-modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <div className="Inventory-form-scrollable-container">
              <form onSubmit={handleSubmit} className="Inventory-form" id="inventory-modal-form">
                <div className="Inventory-form-group">
                  <label>Product Name <span>*</span></label>
                  <input type="text" name="product" placeholder="Enter Product Name" value={formData.product} onChange={handleInputChange} required />
                </div>

                <div className="Inventory-form-row">
                  <div className="Inventory-form-group">
                    <label>SKU <span>*</span></label>
                    <input type="text" name="sku" placeholder="Enter SKU (e.g. CH0001)" value={formData.sku} onChange={handleInputChange} required />
                  </div>
                  <div className="Inventory-form-group">
                    <label>Category <span>*</span></label>
                    <select name="category" value={formData.category} onChange={handleInputChange} required>
                      <option value="">Select Category</option>
                      <option value="Dark Chocolate">Dark Chocolate</option>
                      <option value="Milk Chocolate">Milk Chocolate</option>
                      <option value="Honey Chocolate">Honey Chocolate</option>
                      <option value="Truffles">Truffles</option>
                      <option value="White Chocolate">White Chocolate</option>
                      <option value="Ingredients">Ingredients</option>
                      <option value="Honey Product">Honey Product</option>
                    </select>
                  </div>
                </div>

                <div className="Inventory-form-group">
                  <label>Unit <span>*</span></label>
                  <select name="unit" value={formData.unit} onChange={handleInputChange} required>
                    <option value="pcs">pcs</option>
                    <option value="kg">kg</option>
                    <option value="box">box</option>
                  </select>
                </div>

                <div className="Inventory-form-row">
                  <div className="Inventory-form-group">
                    <label>Quantity <span>*</span></label>
                    <input type="number" name="quantity" placeholder="Enter Quantity" value={formData.quantity} onChange={handleInputChange} required />
                  </div>
                  <div className="Inventory-form-group">
                    <label>Low Stock Alert <span>*</span></label>
                    <input type="number" name="lowStockAlert" placeholder="Enter Threshold" value={formData.lowStockAlert} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="Inventory-form-group">
                  <label>Cost Price (₹) <span>*</span></label>
                  <input type="text" name="costPrice" placeholder="Enter Cost Price" value={formData.costPrice} onChange={handleInputChange} required />
                </div>

                <div className="Inventory-form-group">
                  <label>Expiry Date</label>
                  <div className="Inventory-input-icon-wrapper">
                    <input type="text" name="expiryDate" placeholder="e.g. 30 Jun 2025" value={formData.expiryDate} onChange={handleInputChange} />
                    <svg className="Inventory-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </div>

                <div className="Inventory-form-group">
                  <label>Supplier</label>
                  <select name="supplier" value={formData.supplier} onChange={handleInputChange}>
                    <option value="">Select Supplier</option>
                    <option value="Supplier A">Supplier A</option>
                    <option value="Supplier B">Supplier B</option>
                  </select>
                </div>

                <div className="Inventory-form-group">
                  <label>Notes</label>
                  <textarea name="notes" placeholder="Enter Notes (optional)" rows="3" value={formData.notes} onChange={handleInputChange}></textarea>
                </div>
              </form>
            </div>

            <div className="Inventory-modal-footer">
              <button type="button" className="Inventory-btn-reset" onClick={handleReset}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
                Reset
              </button>
              <button type="button" className="Inventory-btn-save" onClick={handleSubmit}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                {editingId !== null ? 'Update Item' : 'Save Item'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;