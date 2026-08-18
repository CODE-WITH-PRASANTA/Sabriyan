import React, { useState, useEffect, useCallback } from "react";
import {
  FaFilter,
  FaSearch,
  FaChevronDown,
  FaCalendarAlt,
  FaRedo,
  FaTrashAlt,
  FaDownload,
  FaEye,
  FaEdit,
  FaTimes,
  FaEnvelope,
  FaPhoneAlt,
  FaTag
} from "react-icons/fa";
import API from "../../api/axios";
import "./ColdLeads.css";

const ColdLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState([]);

  // Form Filter Inputs State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Applied Filters State (Active parameters sent to API)
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "All Status",
    source: "All Sources",
    from: "",
    to: ""
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  // Modal States
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);

  // 1. Fetch Contact Inquiries from Backend API
  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      // Search parameter
      if (appliedFilters.search.trim()) {
        params.search = appliedFilters.search.trim();
      }

      // Status parameter
      if (appliedFilters.status && appliedFilters.status !== "All Status") {
        params.status = appliedFilters.status;
      }

      // Source parameter
      if (appliedFilters.source && appliedFilters.source !== "All Sources") {
        params.source = appliedFilters.source;
      }

      // Date Range parameters
      if (appliedFilters.from) {
        params.fromDate = appliedFilters.from;
      }

      if (appliedFilters.to) {
        params.toDate = appliedFilters.to;
      }

      const response = await API.get("/contact", { params });

      if (response.data && response.data.success) {
        const mappedData = (response.data.data || []).map((item) => {
          const createdAt = new Date(item.createdAt);
          return {
            id: item._id,
            name: item.fullName || "N/A",
            avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100`,
            email: item.email || "N/A",
            phone: item.phone || "N/A",
            subject: item.subject || "General Inquiry",
            source: item.source || "Website",
            status: item.status || "New",
            message: item.message || "",
            rawDate: isNaN(createdAt.getTime()) ? "" : createdAt.toISOString().split("T")[0],
            addedOnDate: isNaN(createdAt.getTime())
              ? "N/A"
              : createdAt.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }),
            addedOnTime: isNaN(createdAt.getTime())
              ? "N/A"
              : createdAt.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                })
          };
        });

        // Additional client-side filtering for Name / Email / Phone / Subject / Date
        let filtered = mappedData;

        if (appliedFilters.search.trim()) {
          const query = appliedFilters.search.toLowerCase().trim();
          filtered = filtered.filter(
            (l) =>
              l.name.toLowerCase().includes(query) ||
              l.email.toLowerCase().includes(query) ||
              l.phone.toLowerCase().includes(query) ||
              l.subject.toLowerCase().includes(query)
          );
        }

        if (appliedFilters.source !== "All Sources") {
          filtered = filtered.filter((l) => l.source === appliedFilters.source);
        }

        if (appliedFilters.from) {
          filtered = filtered.filter((l) => l.rawDate >= appliedFilters.from);
        }

        if (appliedFilters.to) {
          filtered = filtered.filter((l) => l.rawDate <= appliedFilters.to);
        }

        setLeads(filtered);
        setTotalPages(response.data.totalPages || 1);
        setTotalCount(response.data.total || 0);
      }
    } catch (error) {
      console.error("Error fetching contact inquiries:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, appliedFilters]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Handle Real-time Search Input
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setAppliedFilters((prev) => ({
      ...prev,
      search: val
    }));
    setCurrentPage(1);
  };

  // Filter Trigger Handler
  const handleApplyFilter = () => {
    setAppliedFilters({
      search: searchTerm,
      status: statusFilter,
      source: sourceFilter,
      from: fromDate,
      to: toDate
    });
    setCurrentPage(1);
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All Status");
    setSourceFilter("All Sources");
    setFromDate("");
    setToDate("");
    setAppliedFilters({
      search: "",
      status: "All Status",
      source: "All Sources",
      from: "",
      to: ""
    });
    setCurrentPage(1);
  };

  // Export Filtered Table Data to CSV
  const handleExport = () => {
    if (leads.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = "ID,Name,Email,Phone,Subject,Source,Status,Added Date,Added Time\n";
    const rows = leads
      .map(
        (lead) =>
          `"${lead.id}","${lead.name}","${lead.email}","${lead.phone}","${lead.subject}","${lead.source}","${lead.status}","${lead.addedOnDate}","${lead.addedOnTime}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Contact_Inquiries_Export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Checkbox Selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeads(leads.map((item) => item.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter((item) => item !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  // Delete Single Inquiry via API
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await API.delete(`/contact/${id}`);
        setLeads((prev) => prev.filter((item) => item.id !== id));
        setSelectedLeads((prev) => prev.filter((item) => item !== id));
      } catch (error) {
        console.error("Failed to delete inquiry:", error);
        alert("Failed to delete inquiry from server.");
      }
    }
  };

  // Bulk Delete Inquiries via API
  const handleBulkDelete = async () => {
    if (selectedLeads.length === 0) {
      alert("Please select at least one lead to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedLeads.length} selected lead(s)?`)) {
      try {
        await Promise.all(selectedLeads.map((id) => API.delete(`/contact/${id}`)));
        setSelectedLeads([]);
        fetchInquiries();
      } catch (error) {
        console.error("Bulk delete error:", error);
        alert("Some items could not be deleted.");
      }
    }
  };

  // Update Inquiry Details / Status via API
  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/contact/${editModalData.id}`, {
        fullName: editModalData.name,
        email: editModalData.email,
        phone: editModalData.phone,
        subject: editModalData.subject,
        status: editModalData.status
      });

      setEditModalData(null);
      fetchInquiries();
    } catch (error) {
      console.error("Failed to update inquiry:", error);
      alert("Failed to update inquiry.");
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setSelectedLeads([]);
    }
  };

  // Badge Style Helpers
  const getSourceBadgeClass = (source) => {
    switch (source) {
      case "Website": return "source-website";
      case "Referral": return "source-referral";
      case "Social Media": return "source-social";
      case "Advertisement": return "source-ad";
      default: return "source-website";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "New": return "status-new";
      case "Contacted":
      case "In Progress": return "status-contacted";
      case "Follow Up": return "status-followup";
      case "Closed":
      case "Resolved": return "status-closed";
      default: return "status-new";
    }
  };

  return (
    <div className="ColdLeads green-dark-theme">
      <div className="ColdLeads-container">
        {/* Header Title */}
        <div className="ColdLeads-headerTitle">
          <FaFilter className="title-icon" />
          <h2>Filter Leads & Inquiries</h2>
        </div>

        {/* Top Controls Bar */}
        <div className="ColdLeads-topBar">
          <div className="ColdLeads-searchBox">
            <input
              type="text"
              placeholder="Search by Name, Email, Phone..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && handleApplyFilter()}
            />
            <button
              type="button"
              className="search-icon-btn"
              onClick={handleApplyFilter}
              title="Click to search"
            >
              <FaSearch className="search-icon" />
            </button>
          </div>

          <div className="ColdLeads-selectWrapper">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setAppliedFilters((prev) => ({ ...prev, status: e.target.value }));
                setCurrentPage(1);
              }}
            >
              <option value="All Status">All Status</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <FaChevronDown className="arrow-icon" />
          </div>

          <div className="ColdLeads-selectWrapper">
            <select
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                setAppliedFilters((prev) => ({ ...prev, source: e.target.value }));
                setCurrentPage(1);
              }}
            >
              <option value="All Sources">All Sources</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
              <option value="Advertisement">Advertisement</option>
            </select>
            <FaChevronDown className="arrow-icon" />
          </div>

          <div className="ColdLeads-dateWrapper">
            <input
              type={fromDate ? "date" : "text"}
              placeholder="From Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => !fromDate && (e.target.type = "text")}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <FaCalendarAlt className="date-icon" />
          </div>

          <div className="ColdLeads-dateWrapper">
            <input
              type={toDate ? "date" : "text"}
              placeholder="To Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => !toDate && (e.target.type = "text")}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <FaCalendarAlt className="date-icon" />
          </div>

          <button className="btn-filter-submit" onClick={handleApplyFilter}>
            <FaFilter /> Filter
          </button>

          <button className="btn-filter-reset" onClick={handleResetFilters}>
            <FaRedo /> Reset
          </button>
        </div>

        {/* Main Table Container */}
        <div className="ColdLeads-tableCard">
          <div className="ColdLeads-tableWrapper">
            <table className="ColdLeads-table">
              <thead>
                <tr>
                  <th style={{ width: "36px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={
                        leads.length > 0 && selectedLeads.length === leads.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th style={{ width: "40px" }}>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Added On</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="no-data">
                      Loading inquiries...
                    </td>
                  </tr>
                ) : leads.length > 0 ? (
                  leads.map((item, index) => (
                    <tr
                      key={item.id}
                      className={
                        selectedLeads.includes(item.id) ? "selected-row" : ""
                      }
                    >
                      <td style={{ textAlign: "center" }}>
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(item.id)}
                          onChange={() => handleSelectOne(item.id)}
                        />
                      </td>
                      <td className="row-num">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td>
                        <div className="user-profile">
                          <img src={item.avatar} alt={item.name} />
                          <span className="user-name">{item.name}</span>
                        </div>
                      </td>
                      <td className="text-muted">{item.email}</td>
                      <td className="text-muted">{item.phone}</td>
                      <td>{item.subject}</td>
                      <td>
                        <span
                          className={`badge ${getSourceBadgeClass(item.source)}`}
                        >
                          {item.source}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusBadgeClass(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="added-on">
                          <div>{item.addedOnDate}</div>
                          <div className="time">{item.addedOnTime}</div>
                        </div>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button
                            className="act-btn view"
                            onClick={() => setViewModalData(item)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            className="act-btn edit"
                            onClick={() => setEditModalData(item)}
                            title="Edit Lead"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="act-btn delete"
                            onClick={() => handleDelete(item.id)}
                            title="Delete Lead"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="no-data">
                      No leads found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Controls & Pagination */}
          <div className="ColdLeads-footer">
            <div className="ColdLeads-leftButtons">
              <button className="btn-bulk-delete" onClick={handleBulkDelete}>
                <FaTrashAlt /> Bulk Delete
              </button>
              <button className="btn-export" onClick={handleExport}>
                <FaDownload /> Export
              </button>
            </div>

            <div className="ColdLeads-pagination">
              <span className="pagination-text">
                Showing page {currentPage} of {totalPages} ({totalCount} total inquiries)
              </span>

              <div className="pagination-buttons">
                <button
                  className="page-btn text-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    className={`page-btn num-btn ${
                      currentPage === num ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(num)}
                  >
                    {num}
                  </button>
                ))}

                <button
                  className="page-btn text-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewModalData && (
        <div className="ColdLeads-modalOverlay">
          <div className="ColdLeads-modal">
            <button
              className="modal-close"
              onClick={() => setViewModalData(null)}
              title="Close"
            >
              <FaTimes />
            </button>
            <div className="modal-header-banner">
              <img
                src={viewModalData.avatar}
                alt={viewModalData.name}
                className="modal-avatar"
              />
              <h3>{viewModalData.name}</h3>
              <div className="modal-badges">
                <span
                  className={`badge ${getSourceBadgeClass(viewModalData.source)}`}
                >
                  {viewModalData.source}
                </span>
                <span
                  className={`badge ${getStatusBadgeClass(viewModalData.status)}`}
                >
                  {viewModalData.status}
                </span>
              </div>
            </div>

            <div className="modal-details-grid">
              <div className="detail-box">
                <FaEnvelope className="icon" />
                <div>
                  <label>Email Address</label>
                  <p>{viewModalData.email}</p>
                </div>
              </div>

              <div className="detail-box">
                <FaPhoneAlt className="icon" />
                <div>
                  <label>Phone Number</label>
                  <p>{viewModalData.phone}</p>
                </div>
              </div>

              <div className="detail-box">
                <FaTag className="icon" />
                <div>
                  <label>Inquiry Subject</label>
                  <p>{viewModalData.subject}</p>
                </div>
              </div>

              <div className="detail-box">
                <FaCalendarAlt className="icon" />
                <div>
                  <label>Date Added</label>
                  <p>
                    {viewModalData.addedOnDate} at {viewModalData.addedOnTime}
                  </p>
                </div>
              </div>
            </div>

            {viewModalData.message && (
              <div className="detail-box full-width" style={{ marginTop: "15px" }}>
                <div>
                  <label>Message Content</label>
                  <p style={{ marginTop: "5px", color: "#ddd", lineHeight: "1.5" }}>
                    {viewModalData.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalData && (
        <div className="ColdLeads-modalOverlay">
          <div className="ColdLeads-modal edit-modal">
            <button
              className="modal-close"
              onClick={() => setEditModalData(null)}
              title="Close"
            >
              <FaTimes />
            </button>
            <h3 className="edit-title">Edit Lead Details</h3>
            <form onSubmit={handleEditSave} className="edit-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={editModalData.name}
                  onChange={(e) =>
                    setEditModalData({ ...editModalData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editModalData.email}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        email: e.target.value
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={editModalData.phone}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        phone: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    value={editModalData.subject}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        subject: e.target.value
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editModalData.status}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        status: e.target.value
                      })
                    }
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditModalData(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColdLeads;