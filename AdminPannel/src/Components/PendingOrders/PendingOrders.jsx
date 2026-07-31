import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  MagnifyingGlass,
  CalendarBlank,
  Bag,
  Truck,
  Flag,
  DeviceMobile,
  CreditCard,
  Funnel,
  DownloadSimple,
  Eye,
  PencilSimple,
  DotsThreeVertical,
  CaretLeft,
  CaretRight,
  CaretDown,
  Rocket,
  X
} from '@phosphor-icons/react';
import './PendingOrders.css';

const kpis = [
  { icon: Bag, label: 'New Orders', value: '42', change: '+12.5%', type: 'new' },
  { icon: Truck, label: 'Ready to Ship', value: '13', change: '+8.3%', type: 'ready' },
  { icon: Flag, label: 'High Priority', value: '7', change: '+5.2%', type: 'priority' },
  { icon: DeviceMobile, label: 'On Delivery', value: '26', change: '+11.1%', type: 'delivery' },
  { icon: CreditCard, label: 'Average Order Value', value: '$278.37', change: '+9.4%', type: 'value' },
];

const mockOrders = [
  {
    id: '#ORD-2025-1042',
    isNew: true,
    customer: { name: 'John Doe', email: 'john@example.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop' },
    product: { image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=100&auto=format&fit=crop', name: 'Leather Wallet 5%', detail: 'Brown' },
    payment: 'Card',
    amount: '$125.40',
    items: 2,
    shippingIcon: Truck,
    shipping: 'Standard Shipping',
    shippingDetail: '3-5 business days',
    priority: 'High',
    date: 'May 26, 2025',
    time: '10:30 AM'
  },
  {
    id: '#ORD-2025-1041',
    isNew: true,
    customer: { name: 'Emily Zhang', email: 'emily@example.com', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop' },
    product: { image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100&auto=format&fit=crop', name: 'Wireless Headphone 20%', detail: 'Black' },
    payment: 'PayPal',
    amount: '$89.99',
    items: 1,
    shippingIcon: Rocket,
    shipping: 'Express Shipping',
    shippingDetail: '1-2 business days',
    priority: 'Medium',
    date: 'May 26, 2025',
    time: '10:15 AM'
  },
  {
    id: '#ORD-2025-1040',
    isNew: true,
    customer: { name: 'David Brown', email: 'david@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' },
    product: { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop', name: 'Sports Shoes 10%', detail: 'Green / 42' },
    payment: 'Card',
    amount: '$78.50',
    items: 1,
    shippingIcon: Truck,
    shipping: 'Standard Shipping',
    shippingDetail: '3-5 business days',
    priority: 'Low',
    date: 'May 26, 2025',
    time: '09:45 AM'
  },
  {
    id: '#ORD-2025-1039',
    isNew: true,
    customer: { name: 'Sarah Wilson', email: 'sarah@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' },
    product: { image: 'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?q=80&w=100&auto=format&fit=crop', name: 'Cotton T-Shirt 15%', detail: 'Blue / L' },
    payment: 'PayPal',
    amount: '$35.25',
    items: 2,
    shippingIcon: Truck,
    shipping: 'Standard Shipping',
    shippingDetail: '3-5 business days',
    priority: 'High',
    date: 'May 26, 2025',
    time: '09:30 AM'
  },
  {
    id: '#ORD-2025-1038',
    isNew: true,
    customer: { name: 'Michael Chen', email: 'michael@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' },
    product: { image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=100&auto=format&fit=crop', name: 'Digital Watch 8%', detail: 'Black' },
    payment: 'Card',
    amount: '$45.80',
    items: 1,
    shippingIcon: Rocket,
    shipping: 'Express Shipping',
    shippingDetail: '1-2 business days',
    priority: 'Medium',
    date: 'May 26, 2025',
    time: '09:10 AM'
  },
  {
    id: '#ORD-2025-1037',
    isNew: false,
    customer: { name: 'Anna Taylor', email: 'anna@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop' },
    product: { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100&auto=format&fit=crop', name: 'Smart Watch Series 5', detail: 'Silver' },
    payment: 'Card',
    amount: '$210.00',
    items: 1,
    shippingIcon: Truck,
    shipping: 'Standard Shipping',
    shippingDetail: '3-5 business days',
    priority: 'Low',
    date: 'May 25, 2025',
    time: '04:20 PM'
  },
  {
    id: '#ORD-2025-1036',
    isNew: false,
    customer: { name: 'James Anderson', email: 'james@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop' },
    product: { image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=100&auto=format&fit=crop', name: 'Over-Ear Headphones', detail: 'White' },
    payment: 'PayPal',
    amount: '$140.50',
    items: 1,
    shippingIcon: Rocket,
    shipping: 'Express Shipping',
    shippingDetail: '1-2 business days',
    priority: 'High',
    date: 'May 25, 2025',
    time: '02:15 PM'
  }
];

const PendingOrders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedShipping, setSelectedShipping] = useState('All');

  const [viewingOrder, setViewingOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        order.id.toLowerCase().includes(q) ||
        order.customer.name.toLowerCase().includes(q) ||
        order.customer.email.toLowerCase().includes(q) ||
        order.product.name.toLowerCase().includes(q);

      const matchesPayment = selectedPayment === 'All' || order.payment === selectedPayment;
      const matchesPriority = selectedPriority === 'All' || order.priority.toLowerCase() === selectedPriority.toLowerCase();
      const matchesShipping = selectedShipping === 'All' || order.shipping.toLowerCase().includes(selectedShipping.toLowerCase());

      return matchesSearch && matchesPayment && matchesPriority && matchesShipping;
    });
  }, [orders, searchQuery, selectedPayment, selectedPriority, selectedShipping]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage));
  
  useEffect(() => {
    if (activePage > totalPages) {
      setActivePage(totalPages);
    }
  }, [totalPages, activePage]);

  const currentOrders = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, activePage, itemsPerPage]);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      const currentIds = currentOrders.map((o) => o.id);
      setSelectedOrders((prev) => Array.from(new Set([...prev, ...currentIds])));
    } else {
      const currentIds = currentOrders.map((o) => o.id);
      setSelectedOrders((prev) => prev.filter((id) => !currentIds.includes(id)));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllPageSelected =
    currentOrders.length > 0 &&
    currentOrders.every((o) => selectedOrders.includes(o.id));

  const handleView = (order) => {
    setViewingOrder(order);
    setActiveDropdownId(null);
  };

  const handleEdit = (order) => {
    setEditingOrder({ ...order });
    setActiveDropdownId(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setOrders((prev) =>
      prev.map((ord) => (ord.id === editingOrder.id ? editingOrder : ord))
    );
    setEditingOrder(null);
  };

  const handleDeleteOrder = (id) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== id));
    setActiveDropdownId(null);
  };

  return (
    <div className="pending-orders" ref={containerRef}>
      {/* KPI SUMMARY CARDS */}
      <section className="pending-orders__kpi-grid">
        {kpis.map((kpi, index) => (
          <div key={index} className="pending-orders__kpi-card">
            <div className={`pending-orders__kpi-icon-box pending-orders__kpi-icon-box--${kpi.type}`}>
              <kpi.icon size={20} weight="bold" />
            </div>
            <div className="pending-orders__kpi-meta">
              <span className="pending-orders__kpi-label">{kpi.label}</span>
              <div className="pending-orders__kpi-value-row">
                <span className="pending-orders__kpi-value">{kpi.value}</span>
              </div>
              <div className="pending-orders__kpi-change">
                <span className="pending-orders__text-green">{kpi.change}</span> vs last 30d
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ADVANCED FILTER BAR */}
      <section className="pending-orders__filter-section">
        <div className="pending-orders__filter-group">
          <div className="pending-orders__filter-input-wrapper">
            <label className="pending-orders__filter-label">Search Orders</label>
            <div className="pending-orders__input-with-icon">
              <input
                type="text"
                placeholder="Search by order ID, customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlass size={18} className="pending-orders__input-icon" />
            </div>
          </div>

          <div className="pending-orders__filter-input-wrapper">
            <label className="pending-orders__filter-label">Date Range</label>
            <div className="pending-orders__select-with-icon">
              <span>Select date range</span>
              <CalendarBlank size={18} />
            </div>
          </div>

          <div className="pending-orders__filter-input-wrapper">
            <label className="pending-orders__filter-label">Payment Method</label>
            <div className="pending-orders__custom-select">
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
              >
                <option value="All">All Payment Methods</option>
                <option value="Card">Card</option>
                <option value="PayPal">PayPal</option>
              </select>
              <CaretDown size={14} className="pending-orders__select-caret" />
            </div>
          </div>

          <div className="pending-orders__filter-input-wrapper">
            <label className="pending-orders__filter-label">Priority</label>
            <div className="pending-orders__custom-select">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="All">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <CaretDown size={14} className="pending-orders__select-caret" />
            </div>
          </div>

          <div className="pending-orders__filter-input-wrapper">
            <label className="pending-orders__filter-label">Shipping Method</label>
            <div className="pending-orders__custom-select">
              <select
                value={selectedShipping}
                onChange={(e) => setSelectedShipping(e.target.value)}
              >
                <option value="All">All Shipping Methods</option>
                <option value="standard">Standard</option>
                <option value="express">Express</option>
              </select>
              <CaretDown size={14} className="pending-orders__select-caret" />
            </div>
          </div>

          <div className="pending-orders__filter-input-wrapper">
            <label className="pending-orders__filter-label">More Filters</label>
            <button className="pending-orders__filter-btn">
              <Funnel size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <button className="pending-orders__export-btn">
          <DownloadSimple size={18} weight="bold" />
          <span>Export</span>
        </button>
      </section>

      {/* ORDERS TABLE */}
      <section className="pending-orders__table-card">
        <div className="pending-orders__table-responsive">
          <table className="pending-orders__table">
            <thead>
              <tr>
                <th className="pending-orders__checkbox-th">
                  <input
                    type="checkbox"
                    className="pending-orders__custom-checkbox"
                    onChange={toggleSelectAll}
                    checked={isAllPageSelected}
                  />
                </th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Shipping Method</th>
                <th>Priority</th>
                <th>Date</th>
                <th className="pending-orders__align-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => {
                  const ShippingIcon = order.shippingIcon;
                  const isChecked = selectedOrders.includes(order.id);

                  return (
                    <tr
                      key={order.id}
                      className={isChecked ? 'pending-orders__row--selected' : ''}
                    >
                      <td>
                        <input
                          type="checkbox"
                          className="pending-orders__custom-checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectRow(order.id)}
                        />
                      </td>
                      <td>
                        <div className="pending-orders__order-id-cell">
                          <span className="pending-orders__order-id-text">{order.id}</span>
                          {order.isNew && <span className="pending-orders__new-badge">NEW</span>}
                        </div>
                      </td>
                      <td>
                        <div className="pending-orders__customer-cell">
                          <img
                            src={order.customer.avatar}
                            alt={order.customer.name}
                            className="pending-orders__avatar-img"
                          />
                          <div>
                            <div className="pending-orders__customer-name">
                              {order.customer.name}
                            </div>
                            <div className="pending-orders__customer-email">
                              {order.customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="pending-orders__product-cell">
                          <img
                            src={order.product.image}
                            alt={order.product.name}
                            className="pending-orders__product-thumb"
                          />
                          <div>
                            <div className="pending-orders__product-name">
                              {order.product.name}
                            </div>
                            <div className="pending-orders__product-detail">
                              {order.product.detail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="pending-orders__payment-badge">{order.payment}</span>
                      </td>
                      <td>
                        <div className="pending-orders__amount-text">{order.amount}</div>
                        <div className="pending-orders__items-subtext">
                          {order.items} {order.items > 1 ? 'items' : 'item'}
                        </div>
                      </td>
                      <td>
                        <div className="pending-orders__shipping-cell">
                          <ShippingIcon size={18} className="pending-orders__shipping-icon" />
                          <div>
                            <div className="pending-orders__shipping-title">{order.shipping}</div>
                            <div className="pending-orders__shipping-sub">{order.shippingDetail}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`pending-orders__priority-badge pending-orders__priority--${order.priority.toLowerCase()}`}
                        >
                          {order.priority}
                        </span>
                      </td>
                      <td>
                        <div className="pending-orders__date-text">{order.date}</div>
                        <div className="pending-orders__time-text">{order.time}</div>
                      </td>
                      <td className="pending-orders__align-right">
                        <div className="pending-orders__action-group">
                          <button
                            className="pending-orders__action-btn pending-orders__action-btn--view"
                            aria-label="View Order"
                            onClick={() => handleView(order)}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="pending-orders__action-btn pending-orders__action-btn--edit"
                            aria-label="Edit Order"
                            onClick={() => handleEdit(order)}
                          >
                            <PencilSimple size={16} />
                          </button>
                          <button
                            className="pending-orders__action-btn pending-orders__action-btn--more"
                            aria-label="More Options"
                            onClick={() =>
                              setActiveDropdownId(activeDropdownId === order.id ? null : order.id)
                            }
                          >
                            <DotsThreeVertical size={16} weight="bold" />
                          </button>

                          {activeDropdownId === order.id && (
                            <div className="pending-orders__dropdown-menu">
                              <button onClick={() => handleView(order)}>View Details</button>
                              <button onClick={() => handleEdit(order)}>Edit Order</button>
                              <button
                                className="pending-orders__dropdown-delete"
                                onClick={() => handleDeleteOrder(order.id)}
                              >
                                Delete Order
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="pending-orders__empty-state">
                    No pending orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TABLE PAGINATION FOOTER */}
        <div className="pending-orders__pagination-footer">
          <div className="pending-orders__pagination-info">
            Showing{' '}
            <span>{filteredOrders.length > 0 ? (activePage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
            <span>{Math.min(activePage * itemsPerPage, filteredOrders.length)}</span> of{' '}
            <span>{filteredOrders.length}</span> orders
          </div>

          <div className="pending-orders__pagination-controls">
            <button
              className="pending-orders__page-arrow"
              disabled={activePage === 1}
              onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
            >
              <CaretLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`pending-orders__page-number ${
                  activePage === pageNum ? 'pending-orders__page-number--active' : ''
                }`}
                onClick={() => setActivePage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            <button
              className="pending-orders__page-arrow"
              disabled={activePage === totalPages}
              onClick={() => setActivePage((prev) => Math.min(prev + 1, totalPages))}
            >
              <CaretRight size={16} />
            </button>
          </div>

          <div className="pending-orders__per-page-selector">
            <span>Show</span>
            <div className="pending-orders__per-page-dropdown">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setActivePage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <CaretDown size={14} className="pending-orders__select-caret" />
            </div>
            <span>per page</span>
          </div>
        </div>
      </section>

      {/* VIEW ORDER MODAL */}
      {viewingOrder && (
        <div className="pending-orders__modal-overlay">
          <div className="pending-orders__modal">
            <div className="pending-orders__modal-header">
              <h3>Order Details ({viewingOrder.id})</h3>
              <button onClick={() => setViewingOrder(null)} className="pending-orders__modal-close">
                <X size={18} />
              </button>
            </div>
            <div className="pending-orders__modal-body">
              <p><strong>Customer:</strong> {viewingOrder.customer.name} ({viewingOrder.customer.email})</p>
              <p><strong>Product:</strong> {viewingOrder.product.name} - {viewingOrder.product.detail}</p>
              <p><strong>Amount:</strong> <span className="pending-orders__highlight">{viewingOrder.amount}</span></p>
              <p><strong>Payment:</strong> {viewingOrder.payment}</p>
              <p><strong>Shipping:</strong> {viewingOrder.shipping} ({viewingOrder.shippingDetail})</p>
              <p><strong>Priority:</strong> {viewingOrder.priority}</p>
              <p><strong>Date:</strong> {viewingOrder.date} at {viewingOrder.time}</p>
            </div>
          </div>
        </div>
      )}

      {/* EDIT ORDER MODAL */}
      {editingOrder && (
        <div className="pending-orders__modal-overlay">
          <div className="pending-orders__modal">
            <div className="pending-orders__modal-header">
              <h3>Edit Order {editingOrder.id}</h3>
              <button onClick={() => setEditingOrder(null)} className="pending-orders__modal-close">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="pending-orders__modal-form">
              <div className="pending-orders__form-group">
                <label>Priority</label>
                <select
                  value={editingOrder.priority}
                  onChange={(e) =>
                    setEditingOrder({ ...editingOrder, priority: e.target.value })
                  }
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="pending-orders__form-group">
                <label>Payment Method</label>
                <select
                  value={editingOrder.payment}
                  onChange={(e) =>
                    setEditingOrder({ ...editingOrder, payment: e.target.value })
                  }
                >
                  <option value="Card">Card</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>

              <div className="pending-orders__modal-actions">
                <button
                  type="button"
                  className="pending-orders__btn-cancel"
                  onClick={() => setEditingOrder(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="pending-orders__btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;