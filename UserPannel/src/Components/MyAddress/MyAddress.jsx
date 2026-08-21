import React, { useState, useEffect, useRef } from 'react';
import './MyAddress.css';
import { 
  FiPlus, 
  FiEdit3, 
  FiTrash2, 
  FiMoreHorizontal, 
  FiX, 
  FiMapPin, 
  FiHome, 
  FiBriefcase, 
  FiUser, 
  FiPhone, 
  FiCheck 
} from 'react-icons/fi';

const INITIAL_ADDRESSES = [
  {
    id: 1,
    type: 'Home',
    isDefault: true,
    name: 'John Doe',
    phone: '+91 98765 43210',
    street: '123, Sweet Street, Chocolate City,',
    cityStateZip: 'Bangalore - 560001, Karnataka'
  },
  {
    id: 2,
    type: 'Office',
    isDefault: false,
    name: 'John Doe',
    phone: '+91 98765 43210',
    street: '454, Honey Road, MG Road,',
    cityStateZip: 'Bangalore - 560001, Karnataka'
  }
];

const MyAddress = () => {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingOrder] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState({
    type: 'Home',
    name: '',
    phone: '',
    street: '',
    cityStateZip: '',
    isDefault: false
  });

  const menuRef = useRef(null);

  // Close 3-dots dropdown menu when clicked outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const openModal = (address = null) => {
    setActiveMenuId(null);
    if (address) {
      setEditingOrder(address);
      setFormData(address);
    } else {
      setEditingOrder(null);
      setFormData({
        type: 'Home',
        name: '',
        phone: '',
        street: '',
        cityStateZip: '',
        isDefault: addresses.length === 0
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAddresses((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      // If deleted was default, make the first one default
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
    setActiveMenuId(null);
    showToast('Address deleted successfully');
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
    setActiveMenuId(null);
    showToast('Default address updated');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.street || !formData.cityStateZip) return;

    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((item) => {
          if (item.id === editingAddress.id) {
            return { ...formData, id: editingAddress.id };
          }
          return formData.isDefault ? { ...item, isDefault: false } : item;
        })
      );
      showToast('Address updated successfully');
    } else {
      const newAddress = {
        ...formData,
        id: Date.now()
      };
      setAddresses((prev) => {
        if (newAddress.isDefault) {
          return [newAddress, ...prev.map((a) => ({ ...a, isDefault: false }))];
        }
        return [...prev, newAddress];
      });
      showToast('New address added');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="addr-wrapper">
      {/* Toast Alert */}
      {toastMsg && <div className="addr-toast">{toastMsg}</div>}

      {/* Top Header */}
      <div className="addr-header-row">
        <div className="addr-title-group">
          <div className="addr-main-icon-box">
            <FiMapPin className="addr-pin-icon" />
          </div>
          <div>
            <h1 className="addr-main-heading">My Addresses</h1>
            <p className="addr-sub-heading">
              Manage your delivery addresses for a smoother and faster checkout. <span className="heart-icon">❤️</span>
            </p>
          </div>
        </div>

        <button className="addr-add-btn" onClick={() => openModal()}>
          <FiPlus /> Add New Address
        </button>
      </div>

      {/* Address Cards List */}
      <div className="addr-list">
        {addresses.map((addr) => (
          <div key={addr.id} className="addr-card">
            {/* Card Top Section */}
            <div className="addr-card-top">
              <div className="addr-type-group">
                <div className={`addr-type-icon-box ${addr.type.toLowerCase()}`}>
                  {addr.type === 'Office' ? <FiBriefcase /> : <FiHome />}
                </div>
                <h3 className="addr-type-title">{addr.type}</h3>
                {addr.isDefault && <span className="addr-default-badge">Default</span>}
              </div>

              {/* 3-dots Context Menu */}
              <div className="addr-more-menu-wrapper">
                <button
                  type="button"
                  className="addr-more-btn"
                  onClick={() => setActiveMenuId(activeMenuId === addr.id ? null : addr.id)}
                >
                  <FiMoreHorizontal />
                </button>

                {activeMenuId === addr.id && (
                  <div className="addr-context-dropdown" ref={menuRef}>
                    {!addr.isDefault && (
                      <button
                        type="button"
                        className="addr-dropdown-item"
                        onClick={() => handleSetDefault(addr.id)}
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      type="button"
                      className="addr-dropdown-item"
                      onClick={() => openModal(addr)}
                    >
                      Edit Address
                    </button>
                    <button
                      type="button"
                      className="addr-dropdown-item text-danger"
                      onClick={() => handleDelete(addr.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Address Body Details */}
            <div className="addr-details-box">
              <h4 className="addr-person-name">{addr.name}</h4>
              <p className="addr-phone-text">{addr.phone}</p>
              <p className="addr-street-text">{addr.street}</p>
              <p className="addr-city-text">{addr.cityStateZip}</p>
            </div>

            {/* Card Bottom Actions */}
            <div className="addr-actions-row">
              <button
                type="button"
                className="addr-btn-outline edit"
                onClick={() => openModal(addr)}
              >
                <FiEdit3 className="btn-icon" /> Edit
              </button>
              <button
                type="button"
                className="addr-btn-outline delete"
                onClick={() => handleDelete(addr.id)}
              >
                <FiTrash2 className="btn-icon" /> Delete
              </button>
            </div>
          </div>
        ))}

        {addresses.length === 0 && (
          <div className="addr-empty-box">
            <FiMapPin className="empty-icon" />
            <p className="empty-title">No addresses saved yet</p>
            <p className="empty-sub">Click &quot;Add New Address&quot; to add your delivery location.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Address Popup Modal */}
      {isModalOpen && (
        <div className="addr-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="addr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="addr-modal-header">
              <div className="addr-modal-header-titles">
                <span className="addr-modal-badge">{editingAddress ? 'Modify' : 'New Location'}</span>
                <h3>{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
              </div>
              <button className="addr-modal-close" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="addr-modal-form">
              {/* Type selector pills */}
              <div className="addr-form-group">
                <label className="addr-form-label">Address Tag</label>
                <div className="addr-type-pills">
                  {['Home', 'Office', 'Other'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`addr-pill-btn ${formData.type === t ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, type: t })}
                    >
                      {formData.type === t && <FiCheck className="pill-check-icon" />}
                      {t === 'Home' && <FiHome />}
                      {t === 'Office' && <FiBriefcase />}
                      {t === 'Other' && <FiMapPin />}
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name & Phone Number */}
              <div className="addr-form-row">
                <div className="addr-form-group">
                  <label className="addr-form-label">
                    <FiUser className="field-icon" /> Contact Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="addr-form-group">
                  <label className="addr-form-label">
                    <FiPhone className="field-icon" /> Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Street Address */}
              <div className="addr-form-group">
                <label className="addr-form-label">Flat / House No. / Street</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 123, Sweet Street, Chocolate City"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                />
              </div>

              {/* City, State & Zip */}
              <div className="addr-form-group">
                <label className="addr-form-label">City, Pincode & State</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bangalore - 560001, Karnataka"
                  value={formData.cityStateZip}
                  onChange={(e) => setFormData({ ...formData, cityStateZip: e.target.value })}
                />
              </div>

              {/* Set as Default Checkbox */}
              <label className="addr-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                />
                <span>Set as default delivery address</span>
              </label>

              {/* Action Buttons */}
              <div className="addr-modal-actions">
                <button
                  type="button"
                  className="addr-modal-btn cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="addr-modal-btn submit">
                  {editingAddress ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddress;