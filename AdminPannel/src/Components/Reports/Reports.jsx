import React, { useState } from 'react';
import { 
  RiMoneyRupeeCircleLine, 
  RiShoppingBag3Line, 
  RiLineChartLine, 
  RiUserLine, 
  RiArrowGoBackLine, 
  RiArrowUpSFill, 
  RiArrowDownSFill, 
  RiArrowDownSLine 
} from 'react-icons/ri';
import './Reports.css';

const Reports = () => {
  const [salesView, setSalesView] = useState('Daily');
  const [chartType, setChartType] = useState('Line');
  const [channelPeriod, setChannelPeriod] = useState('This Month');

  return (
    <div className="reports-container">
      {/* Top Metrics Grid */}
      <div className="reports-metrics-grid">
        <div className="reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">Total Sales</span>
            <div className="reports-metric-icon green-bg">
              <RiMoneyRupeeCircleLine />
            </div>
          </div>
          <div className="reports-metric-value">₹2,45,670</div>
          <div className="reports-metric-trend positive">
            <RiArrowUpSFill /> 12.5% <span className="reports-trend-period">vs Apr 10 - May 09</span>
          </div>
        </div>

        <div className="reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">Total Orders</span>
            <div className="reports-metric-icon green-bg">
              <RiShoppingBag3Line />
            </div>
          </div>
          <div className="reports-metric-value">1,248</div>
          <div className="reports-metric-trend positive">
            <RiArrowUpSFill /> 8.7% <span className="reports-trend-period">vs Apr 10 - May 09</span>
          </div>
        </div>

        <div className="reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">Average Order Value</span>
            <div className="reports-metric-icon orange-bg">
              <RiLineChartLine />
            </div>
          </div>
          <div className="reports-metric-value">₹1,969</div>
          <div className="reports-metric-trend positive">
            <RiArrowUpSFill /> 3.4% <span className="reports-trend-period">vs Apr 10 - May 09</span>
          </div>
        </div>

        <div className="reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">Total Customers</span>
            <div className="reports-metric-icon purple-bg">
              <RiUserLine />
            </div>
          </div>
          <div className="reports-metric-value">856</div>
          <div className="reports-metric-trend positive">
            <RiArrowUpSFill /> 6.2% <span className="reports-trend-period">vs Apr 10 - May 09</span>
          </div>
        </div>

        <div className="reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">Return / Refunds</span>
            <div className="reports-metric-icon blue-bg">
              <RiArrowGoBackLine />
            </div>
          </div>
          <div className="reports-metric-value">38</div>
          <div className="reports-metric-trend negative">
            <RiArrowDownSFill /> 5.1% <span className="reports-trend-period">vs Apr 10 - May 09</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="reports-charts-grid">
        {/* Sales Overview Chart */}
        <div className="reports-card reports-sales-overview">
          <div className="reports-card-header">
            <div className="reports-card-title-wrap">
              <h3>Sales Overview</h3>
              <div className="reports-legend-item">
                <span className="reports-legend-dot"></span>
                <span>Sales (₹)</span>
              </div>
            </div>
            <div className="reports-card-controls">
              <div className="reports-dropdown">
                <span>{salesView}</span>
                <RiArrowDownSLine />
              </div>
              <div className="reports-dropdown">
                <span>{chartType}</span>
                <RiArrowDownSLine />
              </div>
            </div>
          </div>

          <div className="reports-chart-body">
            <div className="reports-y-axis">
              <span>80K</span>
              <span>60K</span>
              <span>40K</span>
              <span>20K</span>
              <span>0</span>
            </div>
            <div className="reports-svg-container">
              <svg viewBox="0 0 650 200" preserveAspectRatio="none" className="reports-line-svg">
                <defs>
                  <linearGradient id="reportsGreenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 0,160 Q 50,150 100,140 T 200,120 T 300,150 T 400,90 T 500,110 T 570,30 T 650,120 V 200 H 0 Z" 
                  fill="url(#reportsGreenGradient)" 
                />
                <path 
                  d="M 0,160 Q 50,150 100,140 T 200,120 T 300,150 T 400,90 T 500,110 T 570,30 T 650,120" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="3" 
                />
              </svg>
              <div className="reports-chart-pulse-dot" style={{ top: '22%', left: '87.5%' }}></div>
            </div>
          </div>

          <div className="reports-x-axis">
            <span>May 10</span>
            <span>May 15</span>
            <span>May 20</span>
            <span>May 25</span>
            <span>May 30</span>
            <span>Jun 04</span>
            <span>Jun 08</span>
          </div>
        </div>

        {/* Sales by Channel Donut Chart */}
        <div className="reports-card reports-sales-channel">
          <div className="reports-card-header">
            <h3>Sales by Channel</h3>
            <div className="reports-dropdown">
              <span>{channelPeriod}</span>
              <RiArrowDownSLine />
            </div>
          </div>

          <div className="reports-channel-content">
            <div className="reports-donut-container">
              <svg viewBox="0 0 160 160" className="reports-donut-svg">
                <circle cx="80" cy="80" r="60" fill="none" stroke="#f97316" strokeWidth="26" strokeDasharray="377" strokeDashoffset="339.3" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#3b82f6" strokeWidth="26" strokeDasharray="377" strokeDashoffset="282.7" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#10b981" strokeWidth="26" strokeDasharray="377" strokeDashoffset="131.95" />
              </svg>
              <div className="reports-donut-center">
                <span className="reports-donut-value">₹2,45,670</span>
                <span className="reports-donut-label">Total</span>
              </div>
            </div>

            <div className="reports-channel-legend">
              <div className="reports-legend-row">
                <div className="reports-legend-info">
                  <span className="reports-dot website"></span>
                  <span className="reports-channel-name">Website</span>
                </div>
                <div className="reports-channel-stats">
                  <span className="reports-channel-percent">65%</span>
                  <span className="reports-channel-amount">(₹1,59,686)</span>
                </div>
              </div>

              <div className="reports-legend-row">
                <div className="reports-legend-info">
                  <span className="reports-dot mobile"></span>
                  <span className="reports-channel-name">Mobile App</span>
                </div>
                <div className="reports-channel-stats">
                  <span className="reports-channel-percent">25%</span>
                  <span className="reports-channel-amount">(₹61,418)</span>
                </div>
              </div>

              <div className="reports-legend-row">
                <div className="reports-legend-info">
                  <span className="reports-dot marketplace"></span>
                  <span className="reports-channel-name">Marketplace</span>
                </div>
                <div className="reports-channel-stats">
                  <span className="reports-channel-percent">10%</span>
                  <span className="reports-channel-amount">(₹24,566)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;