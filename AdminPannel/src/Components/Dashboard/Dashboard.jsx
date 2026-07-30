import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  AlertTriangle, 
  MoreVertical, 
  PlusCircle, 
  FolderPlus, 
  ClipboardList, 
  Tag, 
  FileText, 
  BarChart2, 
  UserCheck, 
  Settings, 
  ArrowRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import './Dashboard.css';

// --- Sample Data ---
const salesData = [
  { day: 'May 1', sales: 4000 },
  { day: 'May 6', sales: 6000 },
  { day: 'May 11', sales: 5000 },
  { day: 'May 16', sales: 9000 },
  { day: 'May 21', sales: 6450 },
  { day: 'May 26', sales: 12000 },
  { day: 'May 31', sales: 15000 },
];

const miniChartData1 = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 18 }, { v: 25 }];
const miniChartData2 = [{ v: 5 }, { v: 8 }, { v: 12 }, { v: 10 }, { v: 15 }, { v: 14 }];
const miniChartData3 = [{ v: 8 }, { v: 12 }, { v: 10 }, { v: 18 }, { v: 16 }, { v: 22 }];
const miniChartData4 = [{ v: 4 }, { v: 6 }, { v: 9 }, { v: 12 }, { v: 15 }, { v: 19 }];

const orderStatusData = [
  { name: 'Pending', value: 42, percentage: '11.8%', color: '#f59e0b' },
  { name: 'Processing', value: 96, percentage: '27.0%', color: '#3b82f6' },
  { name: 'Shipped', value: 123, percentage: '34.6%', color: '#10b981' },
  { name: 'Delivered', value: 78, percentage: '21.9%', color: '#8b5cf6' },
  { name: 'Cancelled', value: 17, percentage: '4.8%', color: '#ef4444' },
];

const topCategoriesData = [
  { name: 'Dark Chocolate', value: 45, color: '#10b981' },
  { name: 'Milk Chocolate', value: 25, color: '#3b82f6' },
  { name: 'Nut & Fruit', value: 15, color: '#8b5cf6' },
  { name: 'Gift Packs', value: 10, color: '#f59e0b' },
  { name: 'Others', value: 5, color: '#ef4444' },
];

const topProducts = [
  { name: 'Dark Classic 55% Cocoa', sold: 156, revenue: '₹46,800', progress: 80, img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&q=80' },
  { name: 'Milk Delight', sold: 128, revenue: '₹32,000', progress: 65, img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=100&q=80' },
  { name: 'Nut Fusion', sold: 112, revenue: '₹28,000', progress: 55, img: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=100&q=80' },
  { name: 'Gift Box Collection', sold: 98, revenue: '₹24,500', progress: 45, img: 'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?w=100&q=80' },
  { name: 'Combo Pack', sold: 76, revenue: '₹18,900', progress: 35, img: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=100&q=80' },
];

const recentOrders = [
  { id: '#ORD-2025-3561', name: 'Dark Classic 55%', status: 'Delivered', statusClass: 'status-delivered', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&q=80' },
  { id: '#ORD-2025-3560', name: 'Milk Delight', status: 'Processing', statusClass: 'status-processing', img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=100&q=80' },
  { id: '#ORD-2025-3559', name: 'Nut Fusion', status: 'Shipped', statusClass: 'status-shipped', img: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=100&q=80' },
  { id: '#ORD-2025-3558', name: 'Gift Box Collection', status: 'Pending', statusClass: 'status-pending', img: 'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?w=100&q=80' },
  { id: '#ORD-2025-3557', name: 'Combo Pack', status: 'Delivered', statusClass: 'status-delivered', img: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=100&q=80' },
];

const lowStockItems = [
  { name: 'Dark Classic 55%', stock: 5, img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&q=80' },
  { name: 'Milk Delight', stock: 7, img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=100&q=80' },
  { name: 'Nut Fusion', stock: 3, img: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=100&q=80' },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      
      {/* 1. Top KPI Grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="icon-wrapper green-glow"><TrendingUp size={20} /></div>
            <div>
              <span className="kpi-title">Total Sales</span>
              <h2 className="kpi-value">₹1,24,560</h2>
              <p className="kpi-subtitle green-text">▲ 24.56% <span className="muted-text">vs last month</span></p>
            </div>
          </div>
          <div className="kpi-chart">
            <ResponsiveContainer width="100%" height={30}>
              <AreaChart data={miniChartData1}>
                <Area type="monotone" dataKey="v" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="icon-wrapper yellow-glow"><ShoppingBag size={20} /></div>
            <div>
              <span className="kpi-title">Total Orders</span>
              <h2 className="kpi-value">356</h2>
              <p className="kpi-subtitle green-text">▲ 18.48% <span className="muted-text">vs last month</span></p>
            </div>
          </div>
          <div className="kpi-chart">
            <ResponsiveContainer width="100%" height={30}>
              <AreaChart data={miniChartData2}>
                <Area type="monotone" dataKey="v" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="icon-wrapper purple-glow"><Users size={20} /></div>
            <div>
              <span className="kpi-title">Total Customers</span>
              <h2 className="kpi-value">2,845</h2>
              <p className="kpi-subtitle green-text">▲ 11.22% <span className="muted-text">vs last month</span></p>
            </div>
          </div>
          <div className="kpi-chart">
            <ResponsiveContainer width="100%" height={30}>
              <AreaChart data={miniChartData3}>
                <Area type="monotone" dataKey="v" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="icon-wrapper blue-glow"><Package size={20} /></div>
            <div>
              <span className="kpi-title">Total Products</span>
              <h2 className="kpi-value">128</h2>
              <p className="kpi-subtitle green-text">▲ 8.75% <span className="muted-text">vs last month</span></p>
            </div>
          </div>
          <div className="kpi-chart">
            <ResponsiveContainer width="100%" height={30}>
              <AreaChart data={miniChartData4}>
                <Area type="monotone" dataKey="v" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="icon-wrapper red-glow"><AlertTriangle size={20} /></div>
            <div>
              <span className="kpi-title">Low Stock Items</span>
              <h2 className="kpi-value">14</h2>
              <p className="kpi-subtitle muted-text">Needs attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Dashboard Middle Grid */}
      <div className="dashboard-grid">
        
        {/* Left Column - Sales Overview */}
        <div className="dashboard-card sales-overview">
          <div className="card-header">
            <div className="header-left">
              <h3>Sales Overview</h3>
              <div className="sales-total">
                <span className="total-amount">₹1,24,560</span>
                <span className="muted-text text-sm"> Total Sales</span>
              </div>
            </div>
            <select className="dropdown-select">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="main-chart-container">
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#6b7280" axisLine={false} tickLine={false} />
                <YAxis stroke="#6b7280" axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000}K`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px' }}
                  formatter={(val) => [`Sales: ₹${val.toLocaleString()}`]} 
                />
                <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Middle Column - Order Status */}
        <div className="dashboard-card order-status">
          <div className="card-header">
            <h3>Order Status</h3>
          </div>
          <div className="donut-chart-wrapper">
            <ResponsiveContainer width={150} height={150}>
              <PieChart>
                <Pie data={orderStatusData} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <h3>356</h3>
              <span>Total</span>
            </div>
            <div className="chart-legend">
              {orderStatusData.map((item, idx) => (
                <div className="legend-item" key={idx}>
                  <div className="legend-info">
                    <span className="dot" style={{ backgroundColor: item.color }}></span>
                    <span className="legend-label">{item.name}</span>
                  </div>
                  <span className="legend-value">{item.value} ({item.percentage})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column Top - Recent Orders */}
        <div className="dashboard-card recent-orders">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <a href="#viewall" className="link-green">View All</a>
          </div>
          <div className="orders-list">
            {recentOrders.map((order, idx) => (
              <div key={idx} className="order-item">
                <img src={order.img} alt={order.name} className="item-thumb" />
                <div className="order-details">
                  <span className="order-id">{order.id}</span>
                  <span className="order-name">{order.name}</span>
                </div>
                <span className={`status-badge ${order.statusClass}`}>{order.status}</span>
              </div>
            ))}
          </div>
          <a href="#all" className="view-all-bottom">View All Orders <ArrowRight size={14} /></a>
        </div>

        {/* Bottom Left - Top Selling Products */}
        <div className="dashboard-card top-selling">
          <div className="card-header">
            <h3>Top Selling Products</h3>
            <a href="#viewall" className="link-green">View All</a>
          </div>
          <div className="table-responsive">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((prod, idx) => (
                  <tr key={idx}>
                    <td className="product-cell">
                      <img src={prod.img} alt={prod.name} className="item-thumb" />
                      <span>{prod.name}</span>
                    </td>
                    <td>
                      <div>{prod.sold}</div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: `${prod.progress}%` }}></div></div>
                    </td>
                    <td className="bold-text">{prod.revenue}</td>
                    <td><MoreVertical size={16} className="action-icon" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Middle - Top Categories */}
        <div className="dashboard-card top-categories">
          <div className="card-header">
            <h3>Top Categories</h3>
            <a href="#viewall" className="link-green">View All</a>
          </div>
          <div className="donut-chart-wrapper">
            <ResponsiveContainer width={150} height={150}>
              <PieChart>
                <Pie data={topCategoriesData} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                  {topCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <span className="muted-text text-xs">Total Sales</span>
              <h4 className="total-sales-text">₹1,24,560</h4>
            </div>
            <div className="chart-legend">
              {topCategoriesData.map((item, idx) => (
                <div className="legend-item" key={idx}>
                  <div className="legend-info">
                    <span className="dot" style={{ backgroundColor: item.color }}></span>
                    <span className="legend-label">{item.name}</span>
                  </div>
                  <span className="legend-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Right - Low Stock Alert */}
        <div className="dashboard-card low-stock-alert">
          <div className="card-header">
            <h3>Low Stock Alert</h3>
            <a href="#viewall" className="link-green">View All</a>
          </div>
          <div className="stock-list">
            {lowStockItems.map((item, idx) => (
              <div key={idx} className="stock-item">
                <div className="stock-info">
                  <img src={item.img} alt={item.name} className="item-thumb" />
                  <div>
                    <h4 className="stock-title">{item.name}</h4>
                    <span className="stock-count">Stock: {item.stock} units</span>
                  </div>
                </div>
                <button className="restock-btn">Restock</button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Quick Actions Footer Toolbar */}
      <div className="quick-actions-bar">
        <h3 className="quick-actions-title">Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn btn-green"><PlusCircle size={16} /> Add New Product</button>
          <button className="action-btn btn-orange"><FolderPlus size={16} /> Add Category</button>
          <button className="action-btn btn-blue"><ClipboardList size={16} /> Manage Orders</button>
          <button className="action-btn btn-purple"><Tag size={16} /> Coupons & Offers</button>
          <button className="action-btn btn-cyan"><FileText size={16} /> Inventory Report</button>
          <button className="action-btn btn-emerald"><BarChart2 size={16} /> Sales Report</button>
          <button className="action-btn btn-amber"><UserCheck size={16} /> Customer List</button>
          <button className="action-btn btn-slate"><Settings size={16} /> Site Settings</button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;