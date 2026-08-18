import React, { useState, useEffect } from 'react';
import { 
  RiTicketLine, 
  RiCheckboxCircleLine, 
  RiTimeLine, 
  RiCloseCircleLine, 
  RiWallet3Line, 
  RiDownloadLine, 
  RiAddLine, 
  RiSearchLine, 
  RiFilter3Line, 
  RiEditLine, 
  RiDeleteBinLine, 
  RiCloseLine, 
  RiCalendarLine, 
  RiRefreshLine,
  RiCheckLine
} from 'react-icons/ri';
import API, { IMG_URL } from '../../api/axios';
import './Couponsoffers.css';

const Couponsoffers = () => {
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCouponId, setCurrentCouponId] = useState(null);

  const initialFormState = {
    code: '',
    name: '',
    description: '',
    discountType: 'Percentage (%)',
    discountValue: '',
    minOrder: '',
    maxDiscount: '',
    validFrom: '',
    validTo: '',
    applicableOn: 'All Products',
    usageLimit: '',
    perUserLimit: '',
    status: 'Active'
  };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch Coupons using Axios API instance
  const fetchCoupons = async () => {
    try {
      const response = await API.get('/coupons');
      if (response.data.success) {
        setCoupons(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch coupons:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = 
      (coupon.code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (coupon.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || coupon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCoupons.length / rowsPerPage) || 1;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCoupons.slice(indexOfFirstRow, indexOfLastRow);

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setCurrentCouponId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (coupon) => {
    setIsEditing(true);
    setCurrentCouponId(coupon._id);
    setFormData({
      code: coupon.code,
      name: coupon.name,
      description: coupon.description || '',
      discountType: coupon.discountType || 'Percentage (%)',
      discountValue: coupon.discountValue || '',
      minOrder: coupon.minOrder || '',
      maxDiscount: coupon.maxDiscount || '',
      validFrom: coupon.validFrom || '',
      validTo: coupon.validTo || '',
      applicableOn: coupon.applicableOn || 'All Products',
      usageLimit: coupon.usageLimit || '',
      perUserLimit: coupon.perUserLimit || '',
      status: coupon.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveCoupon = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      code: formData.code.toUpperCase(),
      discountValue: Number(formData.discountValue) || 0,
      minOrder: Number(formData.minOrder) || 0,
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
      usageLimit: Number(formData.usageLimit) || 100,
      perUserLimit: Number(formData.perUserLimit) || 1
    };

    try {
      if (isEditing) {
        const response = await API.put(`/coupons/${currentCouponId}`, payload);
        if (response.data.success) {
          setCoupons(coupons.map(c => (c._id === currentCouponId ? response.data.data : c)));
        }
      } else {
        const response = await API.post('/coupons', payload);
        if (response.data.success) {
          setCoupons([response.data.data, ...coupons]);
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving coupon');
      console.error('Error saving coupon:', err);
    }
  };

  const handleResetForm = () => {
    setFormData(initialFormState);
  };

  const handleDeleteCoupon = async (id) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    try {
      const response = await API.delete(`/coupons/${id}`);
      if (response.data.success) {
        setCoupons(coupons.filter(c => c._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting coupon');
      console.error('Error deleting coupon:', err);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(coupons, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "coupons_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const totalCouponsCount = coupons.length;
  const activeCouponsCount = coupons.filter(c => c.status === 'Active').length;
  const scheduledCouponsCount = coupons.filter(c => c.status === 'Scheduled').length;
  const expiredCouponsCount = coupons.filter(c => c.status === 'Expired').length;
  const totalUsageCount = coupons.reduce((acc, curr) => acc + (curr.usageCount || 0), 0);

  return (
    <div className="couponsoffers-container">
      <div className="couponsoffers-metrics-grid">
        <div className="couponsoffers-metric-card">
          <div className="couponsoffers-metric-header">
            <span className="couponsoffers-metric-title">Total Coupons</span>
            <div className="couponsoffers-metric-icon green-bg">
              <RiTicketLine />
            </div>
          </div>
          <div className="couponsoffers-metric-value">{totalCouponsCount}</div>
          <div className="couponsoffers-metric-desc">All Coupons</div>
        </div>

        <div className="couponsoffers-metric-card">
          <div className="couponsoffers-metric-header">
            <span className="couponsoffers-metric-title">Active Coupons</span>
            <div className="couponsoffers-metric-icon purple-bg">
              <RiCheckboxCircleLine />
            </div>
          </div>
          <div className="couponsoffers-metric-value">{activeCouponsCount}</div>
          <div className="couponsoffers-metric-desc">Currently Running</div>
        </div>

        <div className="couponsoffers-metric-card">
          <div className="couponsoffers-metric-header">
            <span className="couponsoffers-metric-title">Scheduled</span>
            <div className="couponsoffers-metric-icon yellow-bg">
              <RiTimeLine />
            </div>
          </div>
          <div className="couponsoffers-metric-value">{scheduledCouponsCount}</div>
          <div className="couponsoffers-metric-desc">Upcoming</div>
        </div>

        <div className="couponsoffers-metric-card">
          <div className="couponsoffers-metric-header">
            <span className="couponsoffers-metric-title">Expired</span>
            <div className="couponsoffers-metric-icon red-bg">
              <RiCloseCircleLine />
            </div>
          </div>
          <div className="couponsoffers-metric-value">{expiredCouponsCount}</div>
          <div className="couponsoffers-metric-desc">Not Active</div>
        </div>

        <div className="couponsoffers-metric-card">
          <div className="couponsoffers-metric-header">
            <span className="couponsoffers-metric-title">Total Usage</span>
            <div className="couponsoffers-metric-icon blue-bg">
              <RiWallet3Line />
            </div>
          </div>
          <div className="couponsoffers-metric-value">{totalUsageCount.toLocaleString()}</div>
          <div className="couponsoffers-metric-desc">Times Used</div>
        </div>
      </div>

      <div className="couponsoffers-main-card">
        <div className="couponsoffers-table-header-section">
          <div className="couponsoffers-title-group">
            <div className="couponsoffers-main-icon">
              <RiTicketLine />
            </div>
            <div>
              <h2>All Coupons & Offers</h2>
              <p>Manage all your coupons and offers here.</p>
            </div>
          </div>
          <div className="couponsoffers-header-actions">
            <button className="couponsoffers-btn-export" onClick={handleExport}>
              <RiDownloadLine /> Export
            </button>
            <button className="couponsoffers-btn-add" onClick={handleOpenAddModal}>
              <RiAddLine /> Add New Coupon
            </button>
          </div>
        </div>

        <div className="couponsoffers-filter-bar">
          <div className="couponsoffers-search-box">
            <RiSearchLine className="couponsoffers-search-icon" />
            <input 
              type="text" 
              placeholder="Search by coupon code or name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="couponsoffers-filter-controls">
            <select 
              className="couponsoffers-select-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Expired">Expired</option>
            </select>
            <button className="couponsoffers-filter-btn" onClick={() => { setSearchTerm(''); setStatusFilter('All Status'); }}>
              <RiFilter3Line /> Filter
            </button>
          </div>
        </div>

        <div className="couponsoffers-table-container">
          <table className="couponsoffers-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Coupon Name</th>
                <th>Discount</th>
                <th>Min. Order</th>
                <th>Validity</th>
                <th>Usage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((coupon) => (
                  <tr key={coupon._id}>
                    <td>
                      <span className="couponsoffers-code-badge">
                        <RiTicketLine /> {coupon.code}
                      </span>
                    </td>
                    <td>
                      <div className="couponsoffers-name-cell">
                        <span className="couponsoffers-cname">{coupon.name}</span>
                        <span className="couponsoffers-cdesc">{coupon.description}</span>
                      </div>
                    </td>
                    <td>
                      <span className="couponsoffers-bold-text">
                        {coupon.discountType?.includes('Percentage') ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                      </span>
                    </td>
                    <td>₹{coupon.minOrder}</td>
                    <td>{coupon.validFrom} to {coupon.validTo}</td>
                    <td>{coupon.usageCount || 0} times</td>
                    <td>
                      <span className={`couponsoffers-status-badge ${coupon.status?.toLowerCase()}`}>
                        {coupon.status}
                      </span>
                    </td>
                    <td>
                      <div className="couponsoffers-action-btns">
                        <button className="couponsoffers-action-btn edit" title="Edit Coupon" onClick={() => handleOpenEditModal(coupon)}>
                          <RiEditLine />
                        </button>
                        <button className="couponsoffers-action-btn delete" title="Delete Coupon" onClick={() => handleDeleteCoupon(coupon._id)}>
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="couponsoffers-no-data">No coupons found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="couponsoffers-pagination-section">
          <div className="couponsoffers-pagination-info">
            Showing {filteredCoupons.length > 0 ? indexOfFirstRow + 1 : 0} to {Math.min(indexOfLastRow, filteredCoupons.length)} of {filteredCoupons.length} coupons
          </div>
          <div className="couponsoffers-pagination-controls">
            <button 
              className="couponsoffers-page-btn" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt; Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button 
                key={num}
                className={`couponsoffers-page-num ${currentPage === num ? 'active' : ''}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
            <button 
              className="couponsoffers-page-btn" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next &gt;
            </button>
            <select 
              className="couponsoffers-rows-select" 
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
            </select>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="couponsoffers-modal-backdrop" onClick={handleCloseModal}>
          <div className="couponsoffers-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="couponsoffers-modal-header">
              <div className="couponsoffers-modal-title-wrap">
                <div className="couponsoffers-modal-icon">
                  <RiTicketLine />
                </div>
                <div>
                  <h3>{isEditing ? 'Edit Coupon' : 'Add New Coupon'}</h3>
                  <p>{isEditing ? 'Update the details of your coupon.' : 'Create a new coupon or offer for your customers.'}</p>
                </div>
              </div>
              <button className="couponsoffers-modal-close" onClick={handleCloseModal}>
                <RiCloseLine />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="couponsoffers-form">
              <div className="couponsoffers-form-grid">
                <div className="couponsoffers-form-group">
                  <label>Coupon Code <span>*</span></label>
                  <input 
                    type="text" 
                    name="code"
                    placeholder="Enter coupon code (e.g. CHOCO10)" 
                    value={formData.code}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="couponsoffers-form-group">
                  <label>Coupon Name <span>*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Enter coupon name" 
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="couponsoffers-form-group">
                  <label>Discount Type <span>*</span></label>
                  <select 
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleFormChange}
                  >
                    <option value="Percentage (%)">Percentage (%)</option>
                    <option value="Flat (₹)">Flat (₹)</option>
                  </select>
                </div>
                <div className="couponsoffers-form-group">
                  <label>Discount Value <span>*</span></label>
                  <input 
                    type="number" 
                    name="discountValue"
                    placeholder="Enter discount value" 
                    value={formData.discountValue}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="couponsoffers-form-group">
                  <label>Minimum Order Value (₹) <span>*</span></label>
                  <input 
                    type="number" 
                    name="minOrder"
                    placeholder="Enter minimum order value" 
                    value={formData.minOrder}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="couponsoffers-form-group">
                  <label>Maximum Discount (₹)</label>
                  <input 
                    type="number" 
                    name="maxDiscount"
                    placeholder="Enter max discount (optional)" 
                    value={formData.maxDiscount}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="couponsoffers-form-group">
                  <label>Valid From <span>*</span></label>
                  <div className="couponsoffers-input-icon-wrap">
                    <input 
                      type="date" 
                      name="validFrom"
                      value={formData.validFrom}
                      onChange={handleFormChange}
                      required
                    />
                    <RiCalendarLine className="right-input-icon" />
                  </div>
                </div>
                <div className="couponsoffers-form-group">
                  <label>Valid To <span>*</span></label>
                  <div className="couponsoffers-input-icon-wrap">
                    <input 
                      type="date" 
                      name="validTo"
                      value={formData.validTo}
                      onChange={handleFormChange}
                      required
                    />
                    <RiCalendarLine className="right-input-icon" />
                  </div>
                </div>

                <div className="couponsoffers-form-group">
                  <label>Applicable On <span>*</span></label>
                  <select 
                    name="applicableOn"
                    value={formData.applicableOn}
                    onChange={handleFormChange}
                  >
                    <option value="All Products">All Products</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Festival Category">Festival Category</option>
                    <option value="Summer Wear">Summer Wear</option>
                    <option value="Apparel">Apparel</option>
                    <option value="VIP Collection">VIP Collection</option>
                  </select>
                </div>
                <div className="couponsoffers-form-group">
                  <label>Usage Limit</label>
                  <input 
                    type="number" 
                    name="usageLimit"
                    placeholder="Enter total usage limit (optional)" 
                    value={formData.usageLimit}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="couponsoffers-form-group">
                  <label>Per User Limit</label>
                  <input 
                    type="number" 
                    name="perUserLimit"
                    placeholder="Enter per user limit (optional)" 
                    value={formData.perUserLimit}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="couponsoffers-form-group">
                  <label>Description</label>
                  <input 
                    type="text" 
                    name="description"
                    placeholder="Enter coupon description (optional)" 
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="couponsoffers-form-status-row">
                <span className="status-label">Status</span>
                <div className="couponsoffers-toggle-wrapper">
                  <label className="couponsoffers-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.status === 'Active'}
                      onChange={(e) => setFormData({...formData, status: e.target.checked ? 'Active' : 'Expired'})}
                    />
                    <span className="couponsoffers-slider round"></span>
                  </label>
                  <span className="couponsoffers-toggle-text">{formData.status}</span>
                </div>
              </div>

              <div className="couponsoffers-modal-footer">
                <button type="button" className="couponsoffers-btn-reset" onClick={handleResetForm}>
                  <RiRefreshLine /> Reset
                </button>
                <button type="submit" className="couponsoffers-btn-save">
                  <RiCheckLine /> {isEditing ? 'Update Coupon' : 'Save Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Couponsoffers;