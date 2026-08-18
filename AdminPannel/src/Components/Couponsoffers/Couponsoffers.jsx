import React, { useState } from 'react';
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
import './Couponsoffers.css';

const Couponsoffers = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: 'WELCOME5',
      name: 'Welcome Offer',
      description: '5% off for new customers',
      discountType: 'Percentage (%)',
      discountValue: '5%',
      minOrder: '250',
      maxDiscount: '50',
      validFrom: '2025-03-01',
      validTo: '2025-03-31',
      applicableOn: 'All Products',
      usageLimit: '100',
      perUserLimit: '1',
      usage: '78 times',
      status: 'Expired'
    },
    {
      id: 2,
      code: 'FESTIVE25',
      name: 'Festive Bonanza 25%',
      description: 'Huge 25% off on festival sale',
      discountType: 'Percentage (%)',
      discountValue: '25%',
      minOrder: '2,000',
      maxDiscount: '500',
      validFrom: '2024-10-01',
      validTo: '2024-10-31',
      applicableOn: 'Festival Category',
      usageLimit: '200',
      perUserLimit: '1',
      usage: '134 times',
      status: 'Expired'
    },
    {
      id: 3,
      code: 'SUMMER50',
      name: 'Summer Super Sale',
      description: 'Flat 50 off on summer collection',
      discountType: 'Flat (₹)',
      discountValue: '₹50',
      minOrder: '500',
      maxDiscount: '50',
      validFrom: '2026-06-01',
      validTo: '2026-06-30',
      applicableOn: 'Summer Wear',
      usageLimit: '500',
      perUserLimit: '2',
      usage: '210 times',
      status: 'Active'
    },
    {
      id: 4,
      code: 'FLASH20',
      name: 'Flash Hour Discount',
      description: 'Instant 20% off during flash hours',
      discountType: 'Percentage (%)',
      discountValue: '20%',
      minOrder: '1,000',
      maxDiscount: '200',
      validFrom: '2026-09-01',
      validTo: '2026-09-10',
      applicableOn: 'Electronics',
      usageLimit: '150',
      perUserLimit: '1',
      usage: '0 times',
      status: 'Scheduled'
    },
    {
      id: 5,
      code: 'NEWYEAR10',
      name: 'New Year Bash',
      description: 'Special 10% off for new year',
      discountType: 'Percentage (%)',
      discountValue: '10%',
      minOrder: '1,500',
      maxDiscount: '300',
      validFrom: '2025-01-01',
      validTo: '2025-01-05',
      applicableOn: 'All Products',
      usageLimit: '300',
      perUserLimit: '1',
      usage: '300 times',
      status: 'Expired'
    },
    {
      id: 6,
      code: 'WEEKEND15',
      name: 'Weekend Special',
      description: 'Weekend shopping spree discount',
      discountType: 'Percentage (%)',
      discountValue: '15%',
      minOrder: '800',
      maxDiscount: '150',
      validFrom: '2026-08-20',
      validTo: '2026-08-25',
      applicableOn: 'Apparel',
      usageLimit: '250',
      perUserLimit: '2',
      usage: '45 times',
      status: 'Active'
    },
    {
      id: 7,
      code: 'VIPCLUB30',
      name: 'VIP Member Deal',
      description: 'Exclusive 30% off for loyal VIPs',
      discountType: 'Percentage (%)',
      discountValue: '30%',
      minOrder: '3,000',
      maxDiscount: '1000',
      validFrom: '2026-08-01',
      validTo: '2026-08-31',
      applicableOn: 'VIP Collection',
      usageLimit: '100',
      perUserLimit: '1',
      usage: '81 times',
      status: 'Active'
    }
  ]);

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

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          coupon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || coupon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCoupons.length / rowsPerPage) || 1;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCoupons.slice(indexOfFirstRow, indexOfLastRow);

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (coupon) => {
    setIsEditing(true);
    setCurrentCouponId(coupon.id);
    setFormData({
      code: coupon.code,
      name: coupon.name,
      description: coupon.description || '',
      discountType: coupon.discountType || 'Percentage (%)',
      discountValue: coupon.discountValue.replace(/[^0-9]/g, ''),
      minOrder: coupon.minOrder.replace(/[^0-9]/g, ''),
      maxDiscount: '',
      validFrom: coupon.validFrom || '',
      validTo: coupon.validTo || '',
      applicableOn: coupon.applicableOn || 'All Products',
      usageLimit: coupon.usageLimit || '',
      perUserLimit: coupon.perUserLimit || '',
      status: coupon.status
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

  const handleSaveCoupon = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCoupons(coupons.map(c => c.id === currentCouponId ? {
        ...c,
        code: formData.code.toUpperCase(),
        name: formData.name,
        description: formData.description,
        discountType: formData.discountType,
        discountValue: formData.discountType.includes('Percentage') ? `${formData.discountValue}%` : `₹${formData.discountValue}`,
        minOrder: formData.minOrder,
        validFrom: formData.validFrom,
        validTo: formData.validTo,
        applicableOn: formData.applicableOn,
        status: formData.status
      } : c));
    } else {
      const newCoupon = {
        id: Date.now(),
        code: formData.code.toUpperCase() || 'NEWCOUPON',
        name: formData.name || 'Untitled Coupon',
        description: formData.description || 'No description provided',
        discountType: formData.discountType,
        discountValue: formData.discountType.includes('Percentage') ? `${formData.discountValue || 0}%` : `₹${formData.discountValue || 0}`,
        minOrder: formData.minOrder || '0',
        validFrom: formData.validFrom || '2026-01-01',
        validTo: formData.validTo || '2026-12-31',
        applicableOn: formData.applicableOn,
        usageLimit: formData.usageLimit || '100',
        perUserLimit: formData.perUserLimit || '1',
        usage: '0 times',
        status: formData.status
      };
      setCoupons([newCoupon, ...coupons]);
    }
    setIsModalOpen(false);
  };

  const handleResetForm = () => {
    setFormData(initialFormState);
  };

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter(c => c.id !== id));
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
  const totalUsageCount = coupons.reduce((acc, curr) => acc + parseInt(curr.usage.replace(/[^0-9]/g, '') || 0), 0);

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
                  <tr key={coupon.id}>
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
                    <td><span className="couponsoffers-bold-text">{coupon.discountValue}</span></td>
                    <td>₹{coupon.minOrder}</td>
                    <td>{coupon.validFrom} to {coupon.validTo}</td>
                    <td>{coupon.usage}</td>
                    <td>
                      <span className={`couponsoffers-status-badge ${coupon.status.toLowerCase()}`}>
                        {coupon.status}
                      </span>
                    </td>
                    <td>
                      <div className="couponsoffers-action-btns">
                        <button className="couponsoffers-action-btn edit" title="Edit Coupon" onClick={() => handleOpenEditModal(coupon)}>
                          <RiEditLine />
                        </button>
                        <button className="couponsoffers-action-btn delete" title="Delete Coupon" onClick={() => handleDeleteCoupon(coupon.id)}>
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
                  <h3>Add / Edit Coupon</h3>
                  <p>Create a new coupon or offer for your customers.</p>
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
                    type="text" 
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
                    type="text" 
                    name="minOrder"
                    placeholder="Enter minimum order value" 
                    value={formData.minOrder}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="couponsoffers-form-group">
                  <label>Maximum Discount (₹)</label>
                  <input 
                    type="text" 
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
                    type="text" 
                    name="usageLimit"
                    placeholder="Enter total usage limit (optional)" 
                    value={formData.usageLimit}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="couponsoffers-form-group">
                  <label>Per User Limit</label>
                  <input 
                    type="text" 
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
                  <RiCheckLine /> Save Coupon
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