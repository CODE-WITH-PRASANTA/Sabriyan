import React, { useState } from 'react';
import { 
  RiShoppingBag3Line, 
  RiPieChartLine, 
  RiFileList3Line, 
  RiCloseLine, 
  RiGiftLine, 
  RiCake3Line, 
  RiBox3Line 
} from 'react-icons/ri';
import './Analytics.css';

const Analytics = () => {
  // Modal states for "View All" functionality
  const [activeModal, setActiveModal] = useState(null); // 'products', 'categories', 'orders', or null

  // Complete Full Datasets for "View All" toggles
  const allTopProducts = [
    { id: 1, name: 'Dark Chocolate 70%', units: '532', revenue: '₹78,540', icon: <RiCake3Line /> },
    { id: 2, name: 'Milk Chocolate 100g', units: '412', revenue: '₹49,440', icon: <RiCake3Line /> },
    { id: 3, name: 'Almond Chocolate Bar', units: '308', revenue: '₹36,960', icon: <RiCake3Line /> },
    { id: 4, name: 'Hazelnut Truffle', units: '276', revenue: '₹33,120', icon: <RiCake3Line /> },
    { id: 5, name: 'Chocolate Gift Box', units: '244', revenue: '₹24,400', icon: <RiGiftLine /> },
    { id: 6, name: 'White Chocolate Slab', units: '190', revenue: '₹19,000', icon: <RiCake3Line /> },
    { id: 7, name: 'Caramel Crunch Bar', units: '165', revenue: '₹16,500', icon: <RiCake3Line /> }
  ];

  const allTopCategories = [
    { id: 1, name: 'Dark Chocolate', orders: '562', revenue: '₹1,05,670', color: 'orange', icon: <RiCake3Line /> },
    { id: 2, name: 'Milk Chocolate', orders: '412', revenue: '₹72,340', color: 'yellow', icon: <RiCake3Line /> },
    { id: 3, name: 'Gift Boxes', orders: '186', revenue: '₹31,690', color: 'purple', icon: <RiGiftLine /> },
    { id: 4, name: 'Truffles', orders: '152', revenue: '₹21,440', color: 'red', icon: <RiBox3Line /> },
    { id: 5, name: 'Chocolate Bars', orders: '124', revenue: '₹14,530', color: 'blue', icon: <RiShoppingBag3Line /> },
    { id: 6, name: 'Assorted Packs', orders: '98', revenue: '₹11,200', color: 'green', icon: <RiGiftLine /> }
  ];

  const allRecentOrders = [
    { id: '#ORD12548', customer: 'Rahul Sharma', amount: '₹2,450', status: 'Delivered' },
    { id: '#ORD12547', customer: 'Priya Singh', amount: '₹1,250', status: 'Processing' },
    { id: '#ORD12546', customer: 'Amit Verma', amount: '₹3,150', status: 'Shipped' },
    { id: '#ORD12545', customer: 'Neha Gupta', amount: '₹1,890', status: 'Delivered' },
    { id: '#ORD12544', customer: 'Sneha Patel', amount: '₹2,990', status: 'Processing' },
    { id: '#ORD12543', customer: 'Vikram Malhotra', amount: '₹4,100', status: 'Delivered' },
    { id: '#ORD12542', customer: 'Ananya Roy', amount: '₹950', status: 'Shipped' }
  ];

  return (
    <div className="analytics-container">
      <div className="analytics-grid">
        {/* Top Selling Products Card */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <h3>Top Selling Products</h3>
            <button className="analytics-view-all-btn" onClick={() => setActiveModal('products')}>
              View All
            </button>
          </div>
          <div className="analytics-table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-right">Units Sold</th>
                  <th className="text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {allTopProducts.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="analytics-product-info">
                        <div className="analytics-product-thumb">
                          {item.icon}
                        </div>
                        <span className="analytics-item-text">{item.name}</span>
                      </div>
                    </td>
                    <td className="text-right analytics-dim-text">{item.units}</td>
                    <td className="text-right analytics-bold-text">{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Categories by Sales Card */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <h3>Top Categories by Sales</h3>
            <button className="analytics-view-all-btn" onClick={() => setActiveModal('categories')}>
              View All
            </button>
          </div>
          <div className="analytics-table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th className="text-right">Orders</th>
                  <th className="text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {allTopCategories.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="analytics-product-info">
                        <div className={`analytics-category-thumb ${item.color}`}>
                          {item.icon}
                        </div>
                        <span className="analytics-item-text">{item.name}</span>
                      </div>
                    </td>
                    <td className="text-right analytics-dim-text">{item.orders}</td>
                    <td className="text-right analytics-bold-text">{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders Card */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <h3>Recent Orders</h3>
            <button className="analytics-view-all-btn" onClick={() => setActiveModal('orders')}>
              View All
            </button>
          </div>
          <div className="analytics-table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th className="text-right">Amount</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {allRecentOrders.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td><span className="analytics-order-id">{item.id}</span></td>
                    <td><span className="analytics-item-text">{item.customer}</span></td>
                    <td className="text-right analytics-bold-text">{item.amount}</td>
                    <td className="text-center">
                      <span className={`analytics-status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View All Modal Overlay */}
      {activeModal && (
        <div className="analytics-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="analytics-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="analytics-modal-header">
              <h3>
                {activeModal === 'products' && 'All Top Selling Products'}
                {activeModal === 'categories' && 'All Top Categories by Sales'}
                {activeModal === 'orders' && 'All Recent Orders'}
              </h3>
              <button className="analytics-modal-close" onClick={() => setActiveModal(null)}>
                <RiCloseLine />
              </button>
            </div>

            <div className="analytics-modal-body">
              {activeModal === 'products' && (
                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="text-right">Units Sold</th>
                      <th className="text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTopProducts.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="analytics-product-info">
                            <div className="analytics-product-thumb">{item.icon}</div>
                            <span className="analytics-item-text">{item.name}</span>
                          </div>
                        </td>
                        <td className="text-right analytics-dim-text">{item.units}</td>
                        <td className="text-right analytics-bold-text">{item.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeModal === 'categories' && (
                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th className="text-right">Orders</th>
                      <th className="text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTopCategories.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="analytics-product-info">
                            <div className={`analytics-category-thumb ${item.color}`}>{item.icon}</div>
                            <span className="analytics-item-text">{item.name}</span>
                          </div>
                        </td>
                        <td className="text-right analytics-dim-text">{item.orders}</td>
                        <td className="text-right analytics-bold-text">{item.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeModal === 'orders' && (
                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th className="text-right">Amount</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRecentOrders.map((item) => (
                      <tr key={item.id}>
                        <td><span className="analytics-order-id">{item.id}</span></td>
                        <td><span className="analytics-item-text">{item.customer}</span></td>
                        <td className="text-right analytics-bold-text">{item.amount}</td>
                        <td className="text-center">
                          <span className={`analytics-status-badge ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;