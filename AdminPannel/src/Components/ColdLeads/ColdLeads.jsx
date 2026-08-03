import React, { useState } from "react";
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
import "./ColdLeads.css";

// 45 Dummy Lead Records for working Pagination
const generateDummyData = () => {
  const sources = ["Website", "Referral", "Social Media", "Advertisement"];
  const statuses = ["New", "Contacted", "Follow Up", "Closed"];
  const subjects = [
    "Product Inquiry",
    "Bulk Order",
    "Franchise Inquiry",
    "Become Distributor",
    "Other Enquiry"
  ];
  const names = [
    "Rahul Verma", "Priya Sharma", "Amit Patel", "Neha Iyer", "Sandeep Singh",
    "Anjali Mehta", "Vikram Joshi", "Kavya Reddy", "Manish Kumar", "Pooja Nair",
    "Rohan Das", "Simran Kaur", "Arjun Kapoor", "Sneha Rao", "Karan Malhotra",
    "Ritu Sen", "Alok Mishra", "Divya Pillai", "Siddharth Roy", "Tanvi Bhatia",
    "Gaurav Saxena", "Meera Joshi", "Aakash Gupta", "Isha Verma", "Varun Chopra",
    "Nisha Agarwal", "Rajesh Khanna", "Swati Bose", "Nikhil Seth", "Aarti Pandey",
    "Deepak Sharma", "Preeti Jain", "Sanjay Dutt", "Poonam Gill", "Tarun Bajaj",
    "Shweta Sen", "Abhinav Shukla", "Roshni Patel", "Harsh Vardhan", "Nandini Rai",
    "Vineet Garg", "Komal Yadav", "Yash Singhal", "Payal Biswas", "Mohit Suri"
  ];

  const avatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100"
  ];

  return names.map((name, index) => {
    const firstName = name.split(" ")[0].toLowerCase();
    const lastName = name.split(" ")[1].toLowerCase();
    const day = String((index % 20) + 1).padStart(2, "0");
    return {
      id: index + 1,
      name: name,
      avatar: avatars[index % avatars.length],
      email: `${firstName}.${lastName}@email.com`,
      phone: `+91 ${Math.floor(6000000000 + Math.random() * 3999999999)}`,
      subject: subjects[index % subjects.length],
      source: sources[index % sources.length],
      status: statuses[index % statuses.length],
      rawDate: `2025-05-${day}`,
      addedOnDate: `${23 - (index % 5)} May 2025`,
      addedOnTime: `${(index % 12) + 1}:${(index * 5) % 60 < 10 ? "0" : ""}${(index * 5) % 60} ${index % 2 === 0 ? "AM" : "PM"}`
    };
  });
};

const initialLeads = generateDummyData();

const ColdLeads = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLeads, setSelectedLeads] = useState([]);

  // Form Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Applied Filters State (Triggered when "Filter" button is clicked)
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "All Status",
    source: "All Sources",
    from: "",
    to: ""
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal States
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);

  // Filter Button Trigger
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

  // Reset Button Handler
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

  // Export Button Handler (Exports filtered table data to CSV)
  const handleExport = () => {
    if (filteredLeads.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = "ID,Name,Email,Phone,Subject,Source,Status,Added Date,Added Time\n";
    const rows = filteredLeads
      .map(
        (lead) =>
          `"${lead.id}","${lead.name}","${lead.email}","${lead.phone}","${lead.subject}","${lead.source}","${lead.status}","${lead.addedOnDate}","${lead.addedOnTime}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ColdLeads_Export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Checkbox Select Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeads(currentLeads.map((item) => item.id));
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

  // Actions
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads((prev) => prev.filter((item) => item.id !== id));
      setSelectedLeads((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedLeads.length === 0) {
      alert("Please select at least one lead to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedLeads.length} selected lead(s)?`)) {
      setLeads((prev) => prev.filter((item) => !selectedLeads.includes(item.id)));
      setSelectedLeads([]);
    }
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    setLeads((prev) =>
      prev.map((item) => (item.id === editModalData.id ? editModalData : item))
    );
    setEditModalData(null);
  };

  // Filtering Calculation
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      lead.email.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      lead.phone.includes(appliedFilters.search) ||
      lead.subject.toLowerCase().includes(appliedFilters.search.toLowerCase());

    const matchesStatus =
      appliedFilters.status === "All Status" || lead.status === appliedFilters.status;
    const matchesSource =
      appliedFilters.source === "All Sources" || lead.source === appliedFilters.source;

    let matchesDate = true;
    if (appliedFilters.from) {
      matchesDate = matchesDate && lead.rawDate >= appliedFilters.from;
    }
    if (appliedFilters.to) {
      matchesDate = matchesDate && lead.rawDate <= appliedFilters.to;
    }

    return matchesSearch && matchesStatus && matchesSource && matchesDate;
  });

  // Pagination Calculation
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setSelectedLeads([]);
    }
  };

  // Badge Helper Classes
  const getSourceBadgeClass = (source) => {
    switch (source) {
      case "Website": return "source-website";
      case "Referral": return "source-referral";
      case "Social Media": return "source-social";
      case "Advertisement": return "source-ad";
      default: return "";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "New": return "status-new";
      case "Contacted": return "status-contacted";
      case "Follow Up": return "status-followup";
      case "Closed": return "status-closed";
      default: return "";
    }
  };

  return (
    <div className="ColdLeads green-dark-theme">
      <div className="ColdLeads-container">
        {/* Header Title */}
        <div className="ColdLeads-headerTitle">
          <FaFilter className="title-icon" />
          <h2>Filter Leads</h2>
        </div>

        {/* Top Controls Bar */}
        <div className="ColdLeads-topBar">
          {/* Centered Search Box & Icon */}
          <div className="ColdLeads-searchBox">
            <input
              type="text"
              placeholder="Search Leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Closed">Closed</option>
            </select>
            <FaChevronDown className="arrow-icon" />
          </div>

          <div className="ColdLeads-selectWrapper">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
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
                        currentLeads.length > 0 &&
                        selectedLeads.length === currentLeads.length
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
                {currentLeads.length > 0 ? (
                  currentLeads.map((item, index) => (
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
                      <td className="row-num">{indexOfFirstItem + index + 1}</td>
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
                      No leads found matching your search and filter criteria.
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
                Showing {filteredLeads.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
                {Math.min(indexOfLastItem, filteredLeads.length)} of{" "}
                {filteredLeads.length} leads
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

      {/* VIEW MODAL (Eye Icon Click) */}
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
                    required
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
                  <label>Source</label>
                  <select
                    value={editModalData.source}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        source: e.target.value
                      })
                    }
                  >
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Advertisement">Advertisement</option>
                  </select>
                </div>
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
                  <option value="Contacted">Contacted</option>
                  <option value="Follow Up">Follow Up</option>
                  <option value="Closed">Closed</option>
                </select>
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