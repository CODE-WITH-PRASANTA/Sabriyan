import React, { useState, useEffect } from 'react';
import './Inventory.css';
import API, { IMG_URL } from '../../api/axios';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=60';

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

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

  // API से डेटा फेच करें
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await API.get('/inventory');
      if (res.data && res.data.success) {
        setInventoryItems(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // बैकग्राउंड स्क्रॉल लॉक
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
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
    setEditingId(null);
  };

  const handleOpenAddModal = () => {
    handleReset();
    setIsModalOpen(true);
  };

  // इमेज URL रिज़ॉल्वर
  const resolveImageUrl = (img) => {
    if (!img) return DEFAULT_IMAGE;
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `${IMG_URL || ''}${img.startsWith('/') ? '' : '/'}${img}`;
  };

  // फॉर्म सबमिशन (Create या Update)
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!formData.product || !formData.sku || !formData.category || !formData.quantity || !formData.costPrice) {
      alert('कृपया सभी आवश्यक फ़ील्ड्स भरें!');
      return;
    }

    const payload = {
      name: formData.product,
      sku: formData.sku,
      category: formData.category,
      unit: formData.unit,
      stock: Number(formData.quantity),
      lowStock: Number(formData.lowStockAlert) || 0,
      cost: formData.costPrice,
      expiry: formData.expiryDate,
      supplier: formData.supplier,
      notes: formData.notes
    };

    try {
      if (editingId !== null) {
        // Update item (PUT)
        const res = await API.put(`/inventory/${editingId}`, payload);
        if (res.data && res.data.success) {
          setInventoryItems((prev) =>
            prev.map((item) => (item._id === editingId ? res.data.data : item))
          );
        } else {
          alert(res.data?.message || 'Update failed');
          return;
        }
      } else {
        // Create item (POST)
        const res = await API.post('/inventory', payload);
        if (res.data && res.data.success) {
          setInventoryItems((prev) => [res.data.data, ...prev]);
        } else {
          alert(res.data?.message || 'Creation failed');
          return;
        }
      }

      setIsModalOpen(false);
      handleReset();
    } catch (err) {
      console.error('Error submitting form:', err);
      alert(err.response?.data?.message || 'सर्वर में कोई समस्या आई है।');
    }
  };

  // एडिट के लिए फॉर्म में डेटा लोड करें
  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      product: item.name || '',
      sku: item.sku || '',
      category: item.category || '',
      unit: item.unit || 'pcs',
      quantity: (item.stock ?? '').toString(),
      lowStockAlert: (item.lowStock ?? '').toString(),
      costPrice: item.cost || '',
      expiryDate: item.expiry || '',
      supplier: item.supplier || '',
      notes: item.notes || ''
    });
    setIsModalOpen(true);
  };

  // आइटम डिलीट करें (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm('क्या आप वाकई इस आइटम को हटाना चाहते हैं?')) {
      try {
        const res = await API.delete(`/inventory/${id}`);
        if (res.data && res.data.success) {
          setInventoryItems((prev) => prev.filter((item) => item._id !== id));
        } else {
          alert(res.data?.message || 'Delete failed');
        }
      } catch (err) {
        console.error('Error deleting item:', err);
        alert(err.response?.data?.message || 'हटाने में विफल रहा');
      }
    }
  };

  // सिमुलेटेड इम्पोर्ट
  const handleImport = async () => {
    const simulatedImport = {
      name: 'Imported Cocoa Bar',
      sku: `IMP00${Math.floor(Math.random() * 900 + 100)}`,
      category: 'Dark Chocolate',
      stock: 50,
      unit: 'pcs',
      lowStock: 10,
      cost: '40.00',
      expiry: '10 Nov 2026'
    };

    try {
      const res = await API.post('/inventory', simulatedImport);
      if (res.data && res.data.success) {
        setInventoryItems((prev) => [res.data.data, ...prev]);
        alert('1 नया इन्वेंटरी आइटम सफलतापूर्वक इम्पोर्ट किया गया!');
      }
    } catch (err) {
      console.error('Error importing:', err);
      alert('इम्पोर्ट विफल रहा');
    }
  };

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.sku || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="Inventory-dashboard">
      <div className="Inventory-header">
        <div className="Inventory-header-title-wrapper">
          <div className="Inventory-header-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
            </svg>
          </div>
          <div>
            <h1>Inventory Management</h1>
            <p>Add new stock or update existing inventory items.</p>
          </div>
        </div>
        <div className="Inventory-header-actions">
          <button className="Inventory-btn-secondary" onClick={handleImport}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by product, SKU..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="Inventory-filter-dropdowns">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
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
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '2rem' }}>
                    Loading items...
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item._id}>
                    <td className="Inventory-product-cell">
                      <div className="Inventory-thumb-container">
                        <img
                          src={resolveImageUrl(item.img)}
                          alt={item.name}
                          className="Inventory-product-thumb"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = DEFAULT_IMAGE;
                          }}
                        />
                      </div>
                      <span>{item.name}</span>
                    </td>
                    <td className="Inventory-sku-cell">{item.sku}</td>
                    <td>{item.category}</td>
                    <td>
                      {item.stock} <span className="Inventory-unit-text">{item.unit || ''}</span>
                    </td>
                    <td>{item.lowStock}</td>
                    <td>₹{item.cost}</td>
                    <td>{item.expiry || '-'}</td>
                    <td>
                      <span
                        className={`Inventory-status-badge ${
                          item.status === 'In Stock' ? 'Inventory-in-stock' : 'Inventory-low-stock'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="Inventory-action-btns">
                        <button className="Inventory-icon-btn" title="Edit" onClick={() => handleEdit(item)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          className="Inventory-icon-btn Inventory-delete"
                          title="Delete"
                          onClick={() => handleDelete(item._id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
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
          <span className="Inventory-pagination-info">
            Showing {filteredItems.length > 0 ? indexOfFirstItem + 1 : 0} to{' '}
            {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} items
          </span>
          <div className="Inventory-pagination-controls">
            <button
              className="Inventory-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              &lt;
            </button>
            <button className="Inventory-page-btn Inventory-active">{currentPage}</button>
            <button
              className="Inventory-page-btn"
              disabled={currentPage === totalPages || filteredItems.length === 0}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="Inventory-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="Inventory-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="Inventory-modal-header">
              <h2>{editingId !== null ? 'Update Inventory Item' : 'Add New Inventory Item'}</h2>
              <button className="Inventory-modal-close" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            <div className="Inventory-form-scrollable-container">
              <form onSubmit={handleSubmit} className="Inventory-form" id="inventory-modal-form">
                <div className="Inventory-form-group">
                  <label>Product Name <span>*</span></label>
                  <input
                    type="text"
                    name="product"
                    placeholder="Enter Product Name"
                    value={formData.product}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="Inventory-form-row">
                  <div className="Inventory-form-group">
                    <label>SKU <span>*</span></label>
                    <input
                      type="text"
                      name="sku"
                      placeholder="Enter SKU (e.g. CH0001)"
                      value={formData.sku}
                      onChange={handleInputChange}
                      required
                    />
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
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Enter Quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="Inventory-form-group">
                    <label>Low Stock Alert <span>*</span></label>
                    <input
                      type="number"
                      name="lowStockAlert"
                      placeholder="Enter Threshold"
                      value={formData.lowStockAlert}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="Inventory-form-group">
                  <label>Cost Price (₹) <span>*</span></label>
                  <input
                    type="number"
                    step="0.01"
                    name="costPrice"
                    placeholder="Enter Cost Price"
                    value={formData.costPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="Inventory-form-group">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                  />
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
                  <textarea
                    name="notes"
                    placeholder="Enter Notes (optional)"
                    rows="3"
                    value={formData.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="Inventory-modal-footer">
              <button type="button" className="Inventory-btn-reset" onClick={handleReset}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6M23 20v-6h-6" />
                  <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
                </svg>
                Reset
              </button>
              <button type="submit" form="inventory-modal-form" className="Inventory-btn-save">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
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