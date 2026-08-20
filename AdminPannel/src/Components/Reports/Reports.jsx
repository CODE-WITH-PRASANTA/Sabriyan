import React, { useMemo, useState } from "react";
import {
  RiMoneyRupeeCircleLine,
  RiShoppingBag3Line,
  RiLineChartLine,
  RiUserLine,
  RiArrowGoBackLine,
  RiArrowUpSFill,
  RiArrowDownSFill,
  RiArrowDownSLine,
  RiGiftLine,
  RiBox3Line,
  RiCake3Line,
  RiRefreshLine,
} from "react-icons/ri";

import "./Reports.css";

const Reports = () => {
  /* =========================================================
     STATES
  ========================================================= */

  const [salesView, setSalesView] = useState("Daily");
  const [chartType, setChartType] = useState("Line");
  const [channelPeriod, setChannelPeriod] = useState("This Month");

  const [salesOpen, setSalesOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [channelOpen, setChannelOpen] = useState(false);

  const [salesHover, setSalesHover] = useState(null);
  const [channelHover, setChannelHover] = useState(null);

  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);

  /* =========================================================
     SALES DATA
  ========================================================= */

  const salesData = {
    Daily: [
      { label: "May 10", value: 14500 },
      { label: "May 11", value: 17200 },
      { label: "May 12", value: 19800 },
      { label: "May 13", value: 22500 },
      { label: "May 14", value: 24800 },
      { label: "May 15", value: 26800 },
      { label: "May 16", value: 29200 },
      { label: "May 17", value: 31800 },
      { label: "May 18", value: 32500 },
      { label: "May 19", value: 31900 },
      { label: "May 20", value: 29500 },
      { label: "May 21", value: 25200 },
      { label: "May 22", value: 19000 },
      { label: "May 23", value: 14800 },
      { label: "May 24", value: 13600 },
      { label: "May 25", value: 15200 },
      { label: "May 26", value: 20500 },
      { label: "May 27", value: 31000 },
      { label: "May 28", value: 44800 },
      { label: "May 29", value: 57000 },
      { label: "May 30", value: 63500 },
      { label: "May 31", value: 61000 },
      { label: "Jun 01", value: 51000 },
      { label: "Jun 02", value: 33000 },
      { label: "Jun 03", value: 20500 },
      { label: "Jun 04", value: 17500 },
      { label: "Jun 05", value: 23000 },
      { label: "Jun 06", value: 64000 },
      { label: "Jun 07", value: 82000 },
      { label: "Jun 08", value: 61000 },
      { label: "Jun 09", value: 32000 },
    ],

    Weekly: [
      { label: "Week 1", value: 42000 },
      { label: "Week 2", value: 58000 },
      { label: "Week 3", value: 46000 },
      { label: "Week 4", value: 71000 },
      { label: "Week 5", value: 64000 },
      { label: "Week 6", value: 83000 },
      { label: "Week 7", value: 69000 },
    ],

    Monthly: [
      { label: "Jan", value: 62000 },
      { label: "Feb", value: 74000 },
      { label: "Mar", value: 68000 },
      { label: "Apr", value: 81000 },
      { label: "May", value: 92000 },
      { label: "Jun", value: 78000 },
      { label: "Jul", value: 98000 },
      { label: "Aug", value: 86000 },
    ],
  };

  const currentSalesData = salesData[salesView];

  const chartMax = useMemo(() => {
    const max = Math.max(
      ...currentSalesData.map((item) => item.value)
    );

    return Math.ceil(max / 20000) * 20000;
  }, [currentSalesData]);

  /* =========================================================
     CHANNEL DATA
  ========================================================= */

  const channelData = {
    "This Month": [
      {
        name: "Website",
        percent: 65,
        amount: 159686,
        color: "#10b981",
      },
      {
        name: "Mobile App",
        percent: 25,
        amount: 61418,
        color: "#3b82f6",
      },
      {
        name: "Marketplace",
        percent: 10,
        amount: 24566,
        color: "#f97316",
      },
    ],

    "Last Month": [
      {
        name: "Website",
        percent: 58,
        amount: 142480,
        color: "#10b981",
      },
      {
        name: "Mobile App",
        percent: 28,
        amount: 68890,
        color: "#3b82f6",
      },
      {
        name: "Marketplace",
        percent: 14,
        amount: 34300,
        color: "#f97316",
      },
    ],

    "This Quarter": [
      {
        name: "Website",
        percent: 62,
        amount: 476850,
        color: "#10b981",
      },
      {
        name: "Mobile App",
        percent: 24,
        amount: 184560,
        color: "#3b82f6",
      },
      {
        name: "Marketplace",
        percent: 14,
        amount: 107620,
        color: "#f97316",
      },
    ],
  };

  const currentChannelData = channelData[channelPeriod];

  const channelTotal = currentChannelData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  /* =========================================================
     PRODUCTS
  ========================================================= */

  const products = [
    {
      name: "Dark Chocolate 70%",
      units: 532,
      revenue: 78540,
      icon: <RiCake3Line />,
    },
    {
      name: "Milk Chocolate 100g",
      units: 412,
      revenue: 49440,
      icon: <RiCake3Line />,
    },
    {
      name: "Almond Chocolate Bar",
      units: 308,
      revenue: 36960,
      icon: <RiCake3Line />,
    },
    {
      name: "Hazelnut Truffle",
      units: 276,
      revenue: 33120,
      icon: <RiCake3Line />,
    },
    {
      name: "Chocolate Gift Box",
      units: 244,
      revenue: 24400,
      icon: <RiGiftLine />,
    },
    {
      name: "Dark Truffle Box",
      units: 210,
      revenue: 21800,
      icon: <RiBox3Line />,
    },
    {
      name: "Premium Cocoa Bar",
      units: 186,
      revenue: 19200,
      icon: <RiCake3Line />,
    },
  ];

  /* =========================================================
     CATEGORIES
  ========================================================= */

  const categories = [
    {
      name: "Dark Chocolate",
      orders: 562,
      revenue: 105670,
      icon: <RiCake3Line />,
      className: "dark",
    },
    {
      name: "Milk Chocolate",
      orders: 412,
      revenue: 72340,
      icon: <RiCake3Line />,
      className: "yellow",
    },
    {
      name: "Gift Boxes",
      orders: 186,
      revenue: 31690,
      icon: <RiGiftLine />,
      className: "purple",
    },
    {
      name: "Truffles",
      orders: 152,
      revenue: 21440,
      icon: <RiBox3Line />,
      className: "red",
    },
    {
      name: "Chocolate Bars",
      orders: 124,
      revenue: 14530,
      icon: <RiShoppingBag3Line />,
      className: "blue",
    },
    {
      name: "Premium Collection",
      orders: 98,
      revenue: 12850,
      icon: <RiCake3Line />,
      className: "green",
    },
  ];

  /* =========================================================
     ORDERS
  ========================================================= */

  const orders = [
    {
      id: "#ORD12548",
      customer: "Rahul Sharma",
      amount: 2450,
      status: "Delivered",
      statusClass: "delivered",
    },
    {
      id: "#ORD12547",
      customer: "Priya Singh",
      amount: 1250,
      status: "Processing",
      statusClass: "processing",
    },
    {
      id: "#ORD12546",
      customer: "Amit Verma",
      amount: 3150,
      status: "Shipped",
      statusClass: "shipped",
    },
    {
      id: "#ORD12545",
      customer: "Neha Gupta",
      amount: 1890,
      status: "Delivered",
      statusClass: "delivered",
    },
    {
      id: "#ORD12544",
      customer: "Sneha Patel",
      amount: 2990,
      status: "Processing",
      statusClass: "processing",
    },
    {
      id: "#ORD12543",
      customer: "Rohan Das",
      amount: 1680,
      status: "Delivered",
      statusClass: "delivered",
    },
    {
      id: "#ORD12542",
      customer: "Anjali Roy",
      amount: 2260,
      status: "Shipped",
      statusClass: "shipped",
    },
  ];

  /* =========================================================
     HELPERS
  ========================================================= */

  const formatCurrency = (value) => {
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const getChartPoints = () => {
    const width = 720;
    const height = 220;
    const horizontalPadding = 8;
    const verticalPadding = 10;

    return currentSalesData.map((item, index) => {
      const x =
        horizontalPadding +
        (index / (currentSalesData.length - 1)) *
          (width - horizontalPadding * 2);

      const y =
        height -
        verticalPadding -
        (item.value / chartMax) *
          (height - verticalPadding * 2);

      return {
        ...item,
        x,
        y,
      };
    });
  };

  const chartPoints = getChartPoints();

  const buildSmoothPath = (points) => {
    if (!points.length) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const previous = points[i - 1];
      const current = points[i];

      const controlX =
        (previous.x + current.x) / 2;

      path += `
        C ${controlX} ${previous.y},
          ${controlX} ${current.y},
          ${current.x} ${current.y}
      `;
    }

    return path;
  };

  const linePath = buildSmoothPath(chartPoints);

  const areaPath =
    linePath +
    ` L ${
      chartPoints[chartPoints.length - 1]?.x || 0
    } 220
      L ${chartPoints[0]?.x || 0} 220 Z`;

  /* =========================================================
     CHART HOVER
  ========================================================= */

  const handleSalesMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const mouseX =
      event.clientX - rect.left;

    const percentage = Math.max(
      0,
      Math.min(1, mouseX / rect.width)
    );

    const index = Math.round(
      percentage *
        (currentSalesData.length - 1)
    );

    const selected = chartPoints[index];

    if (!selected) return;

    setSalesHover({
      index,
      label: selected.label,
      value: selected.value,
      x: (selected.x / 720) * 100,
      y: selected.y,
    });
  };

  /* =========================================================
     DONUT
  ========================================================= */

  const radius = 62;
  const circumference =
    2 * Math.PI * radius;

  let cumulativePercent = 0;

  const donutSegments =
    currentChannelData.map((item, index) => {
      const segmentLength =
        (item.percent / 100) *
        circumference;

      const gap = 2;

      const segment = {
        ...item,
        index,
        dashArray: `${Math.max(
          segmentLength - gap,
          0
        )} ${
          circumference -
          segmentLength +
          gap
        }`,
        dashOffset:
          -(cumulativePercent / 100) *
          circumference,
      };

      cumulativePercent += item.percent;

      return segment;
    });

  /* =========================================================
     DROPDOWN HANDLERS
  ========================================================= */

  const selectSalesView = (value) => {
    setSalesView(value);
    setSalesOpen(false);
    setSalesHover(null);
  };

  const selectChartType = (value) => {
    setChartType(value);
    setChartOpen(false);
  };

  const selectChannelPeriod = (value) => {
    setChannelPeriod(value);
    setChannelOpen(false);
    setChannelHover(null);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="reports-container">

      {/* =====================================================
          METRICS
      ===================================================== */}

      <div className="reports-metrics-grid">

        <div className="reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">
              Total Sales
            </span>

            <div className="reports-metric-icon green-bg">
              <RiMoneyRupeeCircleLine />
            </div>
          </div>

          <div className="reports-metric-value">
            ₹2,45,670
          </div>

          <div className="reports-metric-trend positive">
            <RiArrowUpSFill />
            12.5%

            <span className="reports-trend-period">
              vs Apr 10 - May 09
            </span>
          </div>
        </div>


        <div className="reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">
              Total Orders
            </span>

            <div className="reports-metric-icon green-bg">
              <RiShoppingBag3Line />
            </div>
          </div>

          <div className="reports-metric-value">
            1,248
          </div>

          <div className="reports-metric-trend positive">
            <RiArrowUpSFill />
            8.7%

            <span className="reports-trend-period">
              vs Apr 10 - May 09
            </span>
          </div>
        </div>


        <div className="reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">
              Average Order Value
            </span>

            <div className="reports-metric-icon orange-bg">
              <RiLineChartLine />
            </div>
          </div>

          <div className="reports-metric-value">
            ₹1,969
          </div>

          <div className="reports-metric-trend positive">
            <RiArrowUpSFill />
            3.4%

            <span className="reports-trend-period">
              vs Apr 10 - May 09
            </span>
          </div>
        </div>


        <div className="reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">
              Total Customers
            </span>

            <div className="reports-metric-icon purple-bg">
              <RiUserLine />
            </div>
          </div>

          <div className="reports-metric-value">
            856
          </div>

          <div className="reports-metric-trend positive">
            <RiArrowUpSFill />
            6.2%

            <span className="reports-trend-period">
              vs Apr 10 - May 09
            </span>
          </div>
        </div>


        <div className="reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">
              Return / Refunds
            </span>

            <div className="reports-metric-icon blue-bg">
              <RiArrowGoBackLine />
            </div>
          </div>

          <div className="reports-metric-value">
            38
          </div>

          <div className="reports-metric-trend negative">
            <RiArrowDownSFill />
            5.1%

            <span className="reports-trend-period">
              vs Apr 10 - May 09
            </span>
          </div>
        </div>

      </div>


      {/* =====================================================
          CHARTS
      ===================================================== */}

      <div className="reports-charts-grid">

        {/* SALES OVERVIEW */}

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

              <div className="reports-dropdown-wrapper">

                <button
                  type="button"
                  className={`reports-dropdown ${
                    salesOpen ? "active" : ""
                  }`}
                  onClick={() => {
                    setSalesOpen(!salesOpen);
                    setChartOpen(false);
                    setChannelOpen(false);
                  }}
                >
                  <span>{salesView}</span>

                  <RiArrowDownSLine
                    className={
                      salesOpen
                        ? "reports-arrow-open"
                        : ""
                    }
                  />
                </button>


                {salesOpen && (
                  <div className="reports-dropdown-menu">

                    {[
                      "Daily",
                      "Weekly",
                      "Monthly",
                    ].map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={
                          salesView === option
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          selectSalesView(option)
                        }
                      >
                        {option}
                      </button>
                    ))}

                  </div>
                )}

              </div>


              <div className="reports-dropdown-wrapper">

                <button
                  type="button"
                  className={`reports-dropdown ${
                    chartOpen ? "active" : ""
                  }`}
                  onClick={() => {
                    setChartOpen(!chartOpen);
                    setSalesOpen(false);
                    setChannelOpen(false);
                  }}
                >
                  <span>{chartType}</span>

                  <RiArrowDownSLine
                    className={
                      chartOpen
                        ? "reports-arrow-open"
                        : ""
                    }
                  />
                </button>


                {chartOpen && (
                  <div className="reports-dropdown-menu">

                    {["Line", "Area"].map(
                      (option) => (
                        <button
                          type="button"
                          key={option}
                          className={
                            chartType === option
                              ? "selected"
                              : ""
                          }
                          onClick={() =>
                            selectChartType(
                              option
                            )
                          }
                        >
                          {option}
                        </button>
                      )
                    )}

                  </div>
                )}

              </div>

            </div>

          </div>


          <div className="reports-chart-wrapper">

            <div className="reports-y-axis">

              {[
                chartMax,
                chartMax * 0.75,
                chartMax * 0.5,
                chartMax * 0.25,
                0,
              ].map((value, index) => (
                <span key={index}>
                  {value >= 1000
                    ? `${Math.round(
                        value / 1000
                      )}K`
                    : value}
                </span>
              ))}

            </div>


            <div
              className="reports-svg-container"
              onMouseMove={
                handleSalesMouseMove
              }
              onMouseLeave={() =>
                setSalesHover(null)
              }
            >

              <div className="reports-grid-lines">

                {[0, 25, 50, 75, 100].map(
                  (position) => (
                    <span
                      key={position}
                      style={{
                        top: `${position}%`,
                      }}
                    />
                  )
                )}

              </div>


              <svg
                viewBox="0 0 720 220"
                preserveAspectRatio="none"
                className="reports-line-svg"
              >

                <defs>

                  <linearGradient
                    id="reportsGreenGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#10b981"
                      stopOpacity="0.32"
                    />

                    <stop
                      offset="100%"
                      stopColor="#10b981"
                      stopOpacity="0"
                    />

                  </linearGradient>

                </defs>


                <path
                  d={areaPath}
                  fill="url(#reportsGreenGradient)"
                  opacity={
                    chartType === "Area"
                      ? "1"
                      : "0.35"
                  }
                />


                <path
                  d={linePath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="reports-main-line"
                />


                {salesHover && (
                  <>
                    <line
                      x1={
                        chartPoints[
                          salesHover.index
                        ].x
                      }
                      x2={
                        chartPoints[
                          salesHover.index
                        ].x
                      }
                      y1="0"
                      y2="220"
                      stroke="#10b981"
                      strokeOpacity="0.18"
                      strokeDasharray="4 5"
                    />

                    <circle
                      cx={
                        chartPoints[
                          salesHover.index
                        ].x
                      }
                      cy={
                        chartPoints[
                          salesHover.index
                        ].y
                      }
                      r="8"
                      fill="#0f251b"
                      stroke="#10b981"
                      strokeWidth="2"
                    />

                    <circle
                      cx={
                        chartPoints[
                          salesHover.index
                        ].x
                      }
                      cy={
                        chartPoints[
                          salesHover.index
                        ].y
                      }
                      r="3.5"
                      fill="#ffffff"
                    />
                  </>
                )}

              </svg>


              {salesHover && (
                <div
                  className="reports-chart-tooltip"
                  style={{
                    left: `${salesHover.x}%`,
                    top: `${Math.max(
                      8,
                      (salesHover.y / 220) *
                        100
                    )}%`,
                  }}
                >
                  <div className="reports-tooltip-date">
                    {salesHover.label}
                  </div>

                  <div className="reports-tooltip-value">
                    {formatCurrency(
                      salesHover.value
                    )}
                  </div>

                  <div className="reports-tooltip-small">
                    Sales
                  </div>
                </div>
              )}

            </div>

          </div>


          <div className="reports-x-axis">

            {currentSalesData
              .filter((_, index) => {

                if (
                  currentSalesData.length <= 8
                ) {
                  return true;
                }

                const step = Math.floor(
                  currentSalesData.length / 7
                );

                return (
                  index % step === 0 ||
                  index ===
                    currentSalesData.length - 1
                );
              })
              .map((item, index) => (
                <span key={index}>
                  {item.label}
                </span>
              ))}

          </div>

        </div>


        {/* SALES BY CHANNEL */}

        <div className="reports-card reports-sales-channel">

          <div className="reports-card-header">

            <h3>Sales by Channel</h3>

            <div className="reports-dropdown-wrapper">

              <button
                type="button"
                className={`reports-dropdown ${
                  channelOpen
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  setChannelOpen(
                    !channelOpen
                  );
                  setSalesOpen(false);
                  setChartOpen(false);
                }}
              >
                <span>
                  {channelPeriod}
                </span>

                <RiArrowDownSLine
                  className={
                    channelOpen
                      ? "reports-arrow-open"
                      : ""
                  }
                />
              </button>


              {channelOpen && (
                <div className="reports-dropdown-menu reports-channel-menu">

                  {[
                    "This Month",
                    "Last Month",
                    "This Quarter",
                  ].map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={
                        channelPeriod ===
                        option
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        selectChannelPeriod(
                          option
                        )
                      }
                    >
                      {option}
                    </button>
                  ))}

                </div>
              )}

            </div>

          </div>


          <div className="reports-channel-content">

            <div className="reports-donut-container">

              <svg
                viewBox="0 0 180 180"
                className="reports-donut-svg"
              >

                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="none"
                  stroke="#172a21"
                  strokeWidth="28"
                />

                {donutSegments.map(
                  (segment) => (
                    <circle
                      key={segment.name}
                      cx="90"
                      cy="90"
                      r={radius}
                      fill="none"
                      stroke={
                        segment.color
                      }
                      strokeWidth={
                        channelHover ===
                        segment.index
                          ? "34"
                          : "28"
                      }
                      strokeDasharray={
                        segment.dashArray
                      }
                      strokeDashoffset={
                        segment.dashOffset
                      }
                      transform="rotate(-90 90 90)"
                      className="reports-donut-segment"
                      onMouseEnter={() =>
                        setChannelHover(
                          segment.index
                        )
                      }
                      onMouseLeave={() =>
                        setChannelHover(null)
                      }
                    />
                  )
                )}

              </svg>


              <div className="reports-donut-center">

                <span className="reports-donut-value">
                  {formatCurrency(
                    channelTotal
                  )}
                </span>

                <span className="reports-donut-label">
                  Total
                </span>

              </div>


              {channelHover !== null && (
                <div className="reports-donut-tooltip">

                  <span>
                    {
                      currentChannelData[
                        channelHover
                      ].name
                    }
                  </span>

                  <strong>
                    {
                      currentChannelData[
                        channelHover
                      ].percent
                    }
                    %
                  </strong>

                  <small>
                    {formatCurrency(
                      currentChannelData[
                        channelHover
                      ].amount
                    )}
                  </small>

                </div>
              )}

            </div>


            <div className="reports-channel-legend">

              {currentChannelData.map(
                (channel, index) => (
                  <div
                    key={channel.name}
                    className={`reports-legend-row ${
                      channelHover === index
                        ? "channel-active"
                        : ""
                    }`}
                    onMouseEnter={() =>
                      setChannelHover(index)
                    }
                    onMouseLeave={() =>
                      setChannelHover(null)
                    }
                  >

                    <div className="reports-legend-info">

                      <span
                        className="reports-dot"
                        style={{
                          backgroundColor:
                            channel.color,
                        }}
                      />

                      <span className="reports-channel-name">
                        {channel.name}
                      </span>

                    </div>


                    <div className="reports-channel-stats">

                      <span className="reports-channel-percent">
                        {channel.percent}%
                      </span>

                      <span className="reports-channel-amount">
                        (
                        {formatCurrency(
                          channel.amount
                        )}
                        )
                      </span>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM GRID
      ===================================================== */}

      <div className="reports-bottom-grid">

        {/* PRODUCTS */}

        <div className="reports-card reports-table-card">

          <div className="reports-table-header">

            <h3>Top Selling Products</h3>

            <button
              type="button"
              className="reports-view-all"
              onClick={() =>
                setShowAllProducts(
                  !showAllProducts
                )
              }
            >
              {showAllProducts
                ? "Show Less"
                : "View All"}
            </button>

          </div>


          <div className="reports-table reports-product-table">

            <div className="reports-table-row reports-table-heading">

              <span>Product</span>
              <span>Units Sold</span>
              <span>Revenue</span>

            </div>


            {(showAllProducts
              ? products
              : products.slice(0, 5)
            ).map((product) => (

              <div
                className="reports-table-row"
                key={product.name}
              >

                <div className="reports-product-name">

                  <div className="reports-small-icon">
                    {product.icon}
                  </div>

                  <span>
                    {product.name}
                  </span>

                </div>

                <span>
                  {product.units}
                </span>

                <strong>
                  {formatCurrency(
                    product.revenue
                  )}
                </strong>

              </div>

            ))}

          </div>

        </div>


        {/* CATEGORIES */}

        <div className="reports-card reports-table-card">

          <div className="reports-table-header">

            <h3>
              Top Categories by Sales
            </h3>

            <button
              type="button"
              className="reports-view-all"
              onClick={() =>
                setShowAllCategories(
                  !showAllCategories
                )
              }
            >
              {showAllCategories
                ? "Show Less"
                : "View All"}
            </button>

          </div>


          <div className="reports-table reports-category-table">

            <div className="reports-table-row reports-table-heading">

              <span>Category</span>
              <span>Orders</span>
              <span>Revenue</span>

            </div>


            {(showAllCategories
              ? categories
              : categories.slice(0, 5)
            ).map((category) => (

              <div
                className="reports-table-row"
                key={category.name}
              >

                <div className="reports-category-name">

                  <div
                    className={`reports-category-icon ${category.className}`}
                  >
                    {category.icon}
                  </div>

                  <span>
                    {category.name}
                  </span>

                </div>

                <span>
                  {category.orders}
                </span>

                <strong>
                  {formatCurrency(
                    category.revenue
                  )}
                </strong>

              </div>

            ))}

          </div>

        </div>


        {/* =================================================
            RECENT ORDERS
        ================================================= */}

        <div className="reports-card reports-table-card reports-orders-card">

          <div className="reports-table-header">

            <h3>
              Recent Orders
            </h3>

            <button
              type="button"
              className="reports-view-all"
              onClick={() =>
                setShowAllOrders(
                  !showAllOrders
                )
              }
            >
              {showAllOrders
                ? "Show Less"
                : "View All"}
            </button>

          </div>


          <div className="reports-orders-table">

            {/* HEADER */}

            <div className="reports-order-grid reports-order-heading">

              <span>
                Order ID
              </span>

              <span>
                Customer
              </span>

              <span>
                Amount
              </span>

              <span>
                Status
              </span>

            </div>


            {/* ROWS */}

            {(showAllOrders
              ? orders
              : orders.slice(0, 5)
            ).map((order) => (

              <div
                className="reports-order-grid reports-order-data"
                key={order.id}
              >

                <span className="reports-order-id">
                  {order.id}
                </span>


                <strong className="reports-customer-name">
                  {order.customer}
                </strong>


                <strong className="reports-order-amount">
                  {formatCurrency(
                    order.amount
                  )}
                </strong>


                <span
                  className={`reports-order-status ${order.statusClass}`}
                >

                  <span className="reports-status-dot"></span>

                  <span className="reports-status-text">
                    {order.status}
                  </span>

                </span>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="reports-footer">

        <div className="reports-footer-info">

          <RiRefreshLine />

          <span>
            Report data is updated automatically
          </span>

        </div>

        <span>
          Last updated just now
        </span>

      </div>

    </div>
  );
};

export default Reports;