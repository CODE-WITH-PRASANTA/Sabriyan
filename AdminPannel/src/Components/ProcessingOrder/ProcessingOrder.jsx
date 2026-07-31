import React, { useState, useMemo } from 'react';
import './ProcessingOrder.css';

const mockOrdersData = [
  {
    id: '#ORD-2025-3545',
    customer: { name: 'Sneha Reddy', email: 'sneha.reddy@email.com', avatar: 'https://i.pravatar.cc/150?u=sneha' },
    product: { name: 'Dark Chocolate 55%', items: 2, image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=100&auto=format&fit=crop&q=60' },
    amount: '₹980.00',
    status: 'Packed',
    tracking: { id: 'TRK1234567890', courier: 'BlueDart Express' },
    payment: { type: 'Online', status: 'Paid' },
    date: 'May 29, 2025',
    time: '11:20 AM',
    orderTime: '11:00 AM'
  },
  {
    id: '#ORD-2025-3546',
    customer: { name: 'Amit Kumar', email: 'amit.kumar@email.com', avatar: 'https://i.pravatar.cc/150?u=amit' },
    product: { name: 'Honey Premium 500g', items: 3, image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=100&auto=format&fit=crop&q=60' },
    amount: '₹1,470.00',
    status: 'Shipped',
    tracking: { id: 'TRK1234567891', courier: 'Delhivery' },
    payment: { type: 'COD', status: 'Cash on Delivery' },
    date: 'May 29, 2025',
    time: '10:45 AM',
    orderTime: '10:15 AM'
  },
  {
    id: '#ORD-2025-3547',
    customer: { name: 'Kavita Singh', email: 'kavita.singh@email.com', avatar: 'https://i.pravatar.cc/150?u=kavita' },
    product: { name: 'Combo Pack', items: 1, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=100&auto=format&fit=crop&q=60' },
    amount: '₹2,250.00',
    status: 'Out for Delivery',
    tracking: { id: 'TRK1234567892', courier: 'Shadowfax' },
    payment: { type: 'Online', status: 'Paid' },
    date: 'May 29, 2025',
    time: '09:30 AM',
    orderTime: '08:45 AM'
  },
  {
    id: '#ORD-2025-3548',
    customer: { name: 'Manoj Das', email: 'manoj.das@email.com', avatar: 'https://i.pravatar.cc/150?u=manoj' },
    product: { name: 'Milk Chocolate Bar', items: 5, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=60' },
    amount: '₹900.00',
    status: 'Packed',
    tracking: { id: 'TRK1234567893', courier: 'BlueDart Express' },
    payment: { type: 'UPI', status: 'Paid' },
    date: 'May 29, 2025',
    time: '09:15 AM',
    orderTime: '08:30 AM'
  },
  {
    id: '#ORD-2025-3549',
    customer: { name: 'Pooja Verma', email: 'pooja.verma@email.com', avatar: 'https://i.pravatar.cc/150?u=pooja' },
    product: { name: 'Nut Fusion', items: 2, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=100&auto=format&fit=crop&q=60' },
    amount: '₹560.00',
    status: 'Shipped',
    tracking: { id: 'TRK1234567894', courier: 'Delhivery' },
    payment: { type: 'COD', status: 'Cash on Delivery' },
    date: 'May 29, 2025',
    time: '08:45 AM',
    orderTime: '07:50 AM'
  }
];

const ProcessingOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [shippingFilter, setShippingFilter] = useState('All');
  const [selectedRows, setSelectedRows] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return mockOrdersData.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchesPayment = paymentFilter === 'All' || order.payment.type === paymentFilter;
      const matchesShipping = shippingFilter === 'All' || order.tracking.courier === shippingFilter;

      return matchesSearch && matchesStatus && matchesPayment && matchesShipping;
    });
  }, [searchTerm, statusFilter, paymentFilter, shippingFilter]);

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const totalOrders = filteredOrders.length;

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageIds = paginatedOrders.map((o) => o.id);
      setSelectedRows(Array.from(new Set([...selectedRows, ...pageIds])));
    } else {
      const pageIds = paginatedOrders.map((o) => o.id);
      setSelectedRows(selectedRows.filter((id) => !pageIds.includes(id)));
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const exportToCSV = () => {
    const headers = ['Order ID,Customer,Product,Amount,Status,Courier,Payment Method,Date'];
    const rows = filteredOrders.map(o => 
      `"${o.id}","${o.customer.name}","${o.product.name}","${o.amount}","${o.status}","${o.tracking.courier}","${o.payment.type}","${o.date} ${o.time}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `processing_orders_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status) => {
    let badgeClass = 'processing-order-badge-packed';
    if (status === 'Shipped') badgeClass = 'processing-order-badge-shipped';
    if (status === 'Out for Delivery') badgeClass = 'processing-order-badge-out';
    if (status === 'Delivered Today') badgeClass = 'processing-order-badge-delivered';

    return (
      <span className={`processing-order-badge ${badgeClass}`}>
        <span className="processing-order-badge-icon">●</span> {status}
      </span>
    );
  };

  const getPaymentBadge = (payment) => {
    let colorClass = 'processing-order-pay-online';
    if (payment.type === 'COD') colorClass = 'processing-order-pay-cod';
    if (payment.type === 'UPI') colorClass = 'processing-order-pay-upi';

    return (
      <div className="processing-order-payment-cell">
        <span className={`processing-order-pay-badge ${colorClass}`}>
          <span className="processing-order-pay-icon">@</span> {payment.type}
        </span>
        <span className="processing-order-row-subtext processing-order-text-truncate">
          <span className="processing-order-check-icon">✓</span> {payment.status}
        </span>
      </div>
    );
  };

  const isAllCurrentPageSelected = 
    paginatedOrders.length > 0 && 
    paginatedOrders.every((o) => selectedRows.includes(o.id));

  return (
    <div className="processing-order-wrapper">
      <main className="processing-order-main">
        {/* Analytics Top Cards */}
        <section className="processing-order-analytics">
          <div className="processing-order-analytics-card">
            <div className="processing-order-card-icon processing-order-card-icon-green">
              <span className="material-icons-outlined">shopping_bag</span>
            </div>
            <div className="processing-order-card-info">
              <span className="processing-order-card-title">Processing Orders</span>
              <h3 className="processing-order-card-total">96</h3>
              <span className="processing-order-card-sub">₹78,450.00</span>
            </div>
          </div>

          <div className="processing-order-analytics-card">
            <div className="processing-order-card-icon processing-order-card-icon-green">
              <span className="material-icons-outlined">edit</span>
            </div>
            <div className="processing-order-card-info">
              <span className="processing-order-card-title">Packed</span>
              <h3 className="processing-order-card-total">32</h3>
              <span className="processing-order-card-sub processing-order-text-muted">33.33%</span>
            </div>
          </div>

          <div className="processing-order-analytics-card">
            <div className="processing-order-card-icon processing-order-card-icon-green">
              <span className="material-icons-outlined">local_shipping</span>
            </div>
            <div className="processing-order-card-info">
              <span className="processing-order-card-title">Shipped</span>
              <h3 className="processing-order-card-total">48</h3>
              <span className="processing-order-card-sub processing-order-text-muted">50.00%</span>
            </div>
          </div>

          <div className="processing-order-analytics-card">
            <div className="processing-order-card-icon processing-order-card-icon-green">
              <span className="material-icons-outlined">directions_car</span>
            </div>
            <div className="processing-order-card-info">
              <span className="processing-order-card-title">Out for Delivery</span>
              <h3 className="processing-order-card-total">12</h3>
              <span className="processing-order-card-sub processing-order-text-muted">12.50%</span>
            </div>
          </div>

          <div className="processing-order-analytics-card">
            <div className="processing-order-card-icon processing-order-card-icon-green">
              <span className="material-icons-outlined">assignment_turned_in</span>
            </div>
            <div className="processing-order-card-info">
              <span className="processing-order-card-title">Delivered Today</span>
              <h3 className="processing-order-card-total">8</h3>
              <span className="processing-order-card-sub processing-order-text-muted">08.33%</span>
            </div>
          </div>
        </section>

        {/* Filter Controls Bar */}
        <section className="processing-order-filters">
          <div className="processing-order-filter-group">
            <div className="processing-order-filter-item processing-order-filter-search">
              <label>Search Orders</label>
              <div className="processing-order-input-with-icon">
                <input
                  type="text"
                  placeholder="Search by Order ID, customer..."
                  value={searchTerm}
                  onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
                />
                <span className="material-icons-outlined">search</span>
              </div>
            </div>

            <div className="processing-order-filter-item">
              <label>Order Status</label>
              <select
                value={statusFilter}
                onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered Today">Delivered Today</option>
              </select>
            </div>

            <div className="processing-order-filter-item">
              <label>Payment Method</label>
              <select
                value={paymentFilter}
                onChange={(e) => handleFilterChange(setPaymentFilter, e.target.value)}
              >
                <option value="All">All Payment Methods</option>
                <option value="Online">Online</option>
                <option value="COD">COD</option>
                <option value="UPI">UPI</option>
              </select>
            </div>

            <div className="processing-order-filter-item">
              <label>Shipping Method</label>
              <select
                value={shippingFilter}
                onChange={(e) => handleFilterChange(setShippingFilter, e.target.value)}
              >
                <option value="All">All Shipping Methods</option>
                <option value="BlueDart Express">BlueDart Express</option>
                <option value="Delhivery">Delhivery</option>
                <option value="Shadowfax">Shadowfax</option>
                <option value="Express Delivery">Express Delivery</option>
              </select>
            </div>
          </div>

          <button className="processing-order-btn-export" onClick={exportToCSV}>
            <span className="material-icons-outlined">download</span> Export
          </button>
        </section>

        {/* Table View Container */}
        <section className="processing-order-table-card">
          <div className="processing-order-table-responsive">
            <table className="processing-order-table">
              <thead>
                <tr>
                  <th className="processing-order-col-checkbox">
                    <input
                      type="checkbox"
                      className="processing-order-custom-checkbox"
                      onChange={handleSelectAll}
                      checked={isAllCurrentPageSelected}
                    />
                  </th>
                  <th className="processing-order-col-id">Order ID</th>
                  <th className="processing-order-col-customer">Customer</th>
                  <th className="processing-order-col-product">Products</th>
                  <th className="processing-order-col-amount">Amount</th>
                  <th className="processing-order-col-status">Status</th>
                  <th className="processing-order-col-tracking">Tracking Info</th>
                  <th className="processing-order-col-payment">Payment</th>
                  <th className="processing-order-col-date">Date</th>
                  <th className="processing-order-col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((row) => (
                    <tr
                      key={row.id}
                      className={selectedRows.includes(row.id) ? 'processing-order-selected-row' : ''}
                    >
                      <td className="processing-order-col-checkbox">
                        <input
                          type="checkbox"
                          className="processing-order-custom-checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleRowSelect(row.id)}
                        />
                      </td>
                      <td className="processing-order-col-id processing-order-font-mono">{row.id}</td>
                      <td className="processing-order-col-customer">
                        <div className="processing-order-user-profile-cell">
                          <img src={row.customer.avatar} alt={row.customer.name} />
                          <div className="processing-order-cell-text-stack">
                            <span className="processing-order-cell-primary-text processing-order-text-truncate">{row.customer.name}</span>
                            <span className="processing-order-row-subtext processing-order-text-truncate">{row.customer.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="processing-order-col-product">
                        <div className="processing-order-product-item-cell">
                          <img src={row.product.image} alt={row.product.name} className="processing-order-product-img" />
                          <div className="processing-order-cell-text-stack">
                            <span className="processing-order-cell-primary-text processing-order-text-truncate">{row.product.name}</span>
                            <span className="processing-order-row-subtext">{row.product.items} Items</span>
                          </div>
                        </div>
                      </td>
                      <td className="processing-order-col-amount processing-order-font-bold">{row.amount}</td>
                      <td className="processing-order-col-status">
                        <div className="processing-order-status-cell-wrapper">
                          {getStatusBadge(row.status)}
                          <span className="processing-order-row-subtext processing-order-date-time-sub processing-order-text-truncate">
                            <span className="material-icons-outlined">schedule</span> {row.date} {row.time}
                          </span>
                        </div>
                      </td>
                      <td className="processing-order-col-tracking">
                        <div className="processing-order-tracking-cell">
                          <span className="processing-order-font-mono processing-order-font-bold processing-order-text-truncate">{row.tracking.id}</span>
                          <span className="processing-order-row-subtext processing-order-text-truncate">{row.tracking.courier}</span>
                        </div>
                      </td>
                      <td className="processing-order-col-payment">{getPaymentBadge(row.payment)}</td>
                      <td className="processing-order-col-date">
                        <div className="processing-order-date-cell">
                          <span className="processing-order-cell-primary-text">{row.date}</span>
                          <span className="processing-order-row-subtext">{row.orderTime}</span>
                        </div>
                      </td>
                      <td className="processing-order-col-actions">
                        <div className="processing-order-action-buttons-cell">
                          <button 
                            className="processing-order-btn-action processing-order-view-btn" 
                            title="View Details"
                            onClick={() => setSelectedOrder(row)}
                          >
                            <span className="material-icons-outlined">visibility</span>
                          </button>
                          <button className="processing-order-btn-action processing-order-ship-btn" title="Ship Package">
                            <span className="material-icons-outlined">local_shipping</span>
                          </button>
                          <button className="processing-order-btn-action processing-order-more-btn" title="More Actions">
                            <span className="material-icons-outlined">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="processing-order-no-data-cell">
                      <div className="processing-order-empty-state">
                        <span className="material-icons-outlined">search_off</span>
                        <p>No matching processing orders found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <footer className="processing-order-pagination">
            <div className="processing-order-results-count">
              Showing {filteredOrders.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
            </div>

            <div className="processing-order-pagination-wrapper">
              <button
                className={`processing-order-page-num ${currentPage === 1 ? 'processing-order-active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              {filteredOrders.length > itemsPerPage && (
                <button 
                  className={`processing-order-page-num ${currentPage === 2 ? 'processing-order-active' : ''}`} 
                  onClick={() => setCurrentPage(2)}
                >
                  2
                </button>
              )}
              <button className="processing-order-page-num processing-order-arrow-btn" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredOrders.length / itemsPerPage) || 1))}>
                <span className="material-icons-outlined">chevron_right</span>
              </button>
            </div>

            <div className="processing-order-items-per-page">
              <span>Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <span>per page</span>
            </div>
          </footer>
        </section>
      </main>

      {/* Modal */}
      {selectedOrder && (
        <div className="processing-order-modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="processing-order-modal" onClick={(e) => e.stopPropagation()}>
            <header className="processing-order-modal-header">
              <h3>Order Details ({selectedOrder.id})</h3>
              <button className="processing-order-close-btn" onClick={() => setSelectedOrder(null)}>
                <span className="material-icons-outlined">close</span>
              </button>
            </header>
            <div className="processing-order-modal-body">
              <div className="processing-order-modal-section">
                <h4>Customer Details</h4>
                <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
              </div>
              <div className="processing-order-modal-section">
                <h4>Order Summary</h4>
                <p><strong>Product:</strong> {selectedOrder.product.name}</p>
                <p><strong>Quantity:</strong> {selectedOrder.product.items}</p>
                <p><strong>Amount:</strong> {selectedOrder.amount}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingOrder;