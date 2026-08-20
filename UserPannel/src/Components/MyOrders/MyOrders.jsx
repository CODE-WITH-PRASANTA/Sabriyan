import React, { useState, useEffect, useRef } from 'react';
import './MyOrders.css';
import { 
  FiEdit2, 
  FiTrash2, 
  FiMoreVertical, 
  FiPlus, 
  FiX, 
  FiPackage, 
  FiDollarSign, 
  FiTag, 
  FiCalendar,
  FiUploadCloud,
  FiCheck
} from 'react-icons/fi';

const INITIAL_ORDERS = [
  { id: 'ORD-2561', date: '2025-05-28', product: 'Dark Chocolate 55%', amount: 1250, status: 'Delivered', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=100&auto=format&fit=crop&q=60' },
  { id: 'ORD-2560', date: '2025-05-26', product: 'Honey Gift Pack', amount: 980, status: 'Processing', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&auto=format&fit=crop&q=60' },
  { id: 'ORD-2559', date: '2025-05-23', product: 'Nut Fusion Box', amount: 1450, status: 'Shipped', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=100&auto=format&fit=crop&q=60' },
  { id: 'ORD-2558', date: '2025-05-21', product: 'Combo Pack', amount: 1050, status: 'Delivered', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=100&auto=format&fit=crop&q=60' },
  { id: 'ORD-2557', date: '2025-05-19', product: 'Milk Chocolate Box', amount: 890, status: 'Cancelled', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=60' },
  { id: 'ORD-2556', date: '2025-05-15', product: 'Organic Almond Jar', amount: 1650, status: 'Pending', image: 'https://images.unsplash.com/photo-1508061252224-203a2884742a?w=100&auto=format&fit=crop&q=60' },
  { id: 'ORD-2555', date: '2025-05-12', product: 'Hazelnut Spread', amount: 620, status: 'Delivered', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=100&auto=format&fit=crop&q=60' },
  { id: 'ORD-2554', date: '2025-05-10', product: 'Berry Mix Pouch', amount: 450, status: 'Shipped', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=100&auto=format&fit=crop&q=60' }
];

const TABS = ['All Orders', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const formatDateDisplay = (dateStr) => {
  if (!dateStr) return '';
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return dateStr;
  return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getTodayDateString = () => {
  return new Date().toISOString().split('T')[0];
};

const MyOrders = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState('All Orders');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    date: getTodayDateString(),
    product: '',
    amount: '',
    status: 'Pending',
    image: ''
  });

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'All Orders') return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((item) => item.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    setActiveDropdown(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (order = null) => {
    if (order) {
      setEditingOrder(order);
      setFormData({
        ...order,
        date: order.date.includes('-') ? order.date : getTodayDateString()
      });
    } else {
      setEditingOrder(null);
      setFormData({
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: getTodayDateString(),
        product: '',
        amount: '',
        status: 'Pending',
        image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=100&auto=format&fit=crop&q=60'
      });
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.product || !formData.amount) return;

    if (editingOrder) {
      setOrders(orders.map((o) => (o.id === editingOrder.id ? { ...formData, amount: Number(formData.amount) } : o)));
    } else {
      setOrders([{ ...formData, amount: Number(formData.amount) }, ...orders]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="orders-wrapper">
      <div className="orders-header-row">
        <div className="orders-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`orders-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="orders-add-btn" onClick={() => openModal()}>
          <FiPlus /> Add Order
        </button>
      </div>

      <div className="orders-card">
        <div className="orders-card-title-box">
          <h2 className="orders-card-heading">Orders</h2>
          <p className="orders-card-subheading">Manage and track all customer orders</p>
        </div>

        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="orders-id-cell">
                      <img src={order.image} alt={order.product} className="orders-thumb" />
                      <div className="orders-id-group">
                        <span className="orders-id-text">{order.id}</span>
                        <span className="orders-mobile-date">{formatDateDisplay(order.date)}</span>
                      </div>
                    </td>
                    <td className="orders-date-cell">{formatDateDisplay(order.date)}</td>
                    <td className="orders-product-cell">{order.product}</td>
                    <td className="orders-amount-cell">₹ {Number(order.amount).toLocaleString()}</td>
                    <td className="orders-status-cell">
                      <span className={`orders-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                      <button className="orders-view-details">View Details</button>
                    </td>
                    <td className="orders-actions-cell">
                      <div className="orders-action-group">
                        <button className="orders-icon-btn edit-btn" onClick={() => openModal(order)}>
                          <FiEdit2 />
                        </button>
                        <button className="orders-icon-btn delete-btn" onClick={() => handleDelete(order.id)}>
                          <FiTrash2 />
                        </button>
                        <div className="orders-dropdown-container">
                          <button
                            className="orders-icon-btn more-btn"
                            onClick={() => setActiveDropdown(activeDropdown === order.id ? null : order.id)}
                          >
                            <FiMoreVertical />
                          </button>
                          {activeDropdown === order.id && (
                            <div className="orders-dropdown-menu" ref={dropdownRef}>
                              <p className="orders-dropdown-title">Update Status</p>
                              {STATUS_OPTIONS.map((st) => (
                                <button
                                  key={st}
                                  className={`orders-dropdown-item ${order.status === st ? 'selected' : ''}`}
                                  onClick={() => handleStatusChange(order.id, st)}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="orders-no-data">
                    No orders found for this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="orders-pagination">
            <button
              className="orders-page-nav"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`orders-page-num ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="orders-page-nav"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Styled Popup Modal */}
      {isModalOpen && (
        <div className="orders-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="orders-modal" onClick={(e) => e.stopPropagation()}>
            <div className="orders-modal-header">
              <div className="orders-modal-title-group">
                <span className="orders-modal-badge">{editingOrder ? 'Edit' : 'Create'}</span>
                <h3>{editingOrder ? 'Update Order' : 'Create New Order'}</h3>
              </div>
              <button className="orders-modal-close" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="orders-modal-form">
              {/* Image Upload Area */}
              <div className="orders-form-group">
                <label>Product Image</label>
                <div 
                  className="orders-upload-box" 
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  {formData.image ? (
                    <div className="orders-upload-preview-wrapper">
                      <img src={formData.image} alt="Preview" className="orders-upload-preview" />
                      <div className="orders-upload-overlay-text">Click to change picture</div>
                    </div>
                  ) : (
                    <div className="orders-upload-placeholder">
                      <div className="upload-icon-circle">
                        <FiUploadCloud />
                      </div>
                      <span className="upload-main-text">Click to upload photo</span>
                      <span className="upload-sub-text">PNG, JPG or WEBP up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Title */}
              <div className="orders-form-group">
                <label><FiPackage className="field-icon" /> Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dark Chocolate 55%"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                />
              </div>

              {/* Amount & Date */}
              <div className="orders-form-row">
                <div className="orders-form-group">
                  <label><FiDollarSign className="field-icon" /> Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1250"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>

                <div className="orders-form-group">
                  <label><FiCalendar className="field-icon" /> Order Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              {/* Status Selector Pills */}
              <div className="orders-form-group">
                <label><FiTag className="field-icon" /> Order Status</label>
                <div className="orders-status-pills">
                  {STATUS_OPTIONS.map((st) => {
                    const isSelected = formData.status === st;
                    return (
                      <button
                        type="button"
                        key={st}
                        className={`status-choice-btn status-btn-${st.toLowerCase()} ${isSelected ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, status: st })}
                      >
                        {isSelected && <FiCheck className="status-check-icon" />}
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="orders-modal-actions">
                <button type="button" className="orders-modal-btn cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="orders-modal-btn submit">
                  {editingOrder ? 'Update Order' : 'Save Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;