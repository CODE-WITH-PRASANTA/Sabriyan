import React, { useEffect, useMemo, useState } from "react";
import {
  FiHeadphones,
  FiMail,
  FiClock,
  FiCheckCircle,
  FiActivity,
  FiDownload,
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiSend,
  FiPaperclip,
  FiSmile,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import axios from "axios";
import "./Support.css";

const API_URL = "http://localhost:5000/api/support";

const Support = () => {
  // =========================================================
  // TICKETS
  // =========================================================

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // =========================================================
  // UI STATES
  // =========================================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [activeTab, setActiveTab] = useState("All Tickets");
  const [searchQuery, setSearchQuery] = useState("");

  // =========================================================
  // AVERAGE RESPONSE TIME
  // =========================================================

  const [averageResponseTime, setAverageResponseTime] =
    useState("0m");

  const [responseCount, setResponseCount] = useState(0);

  const [loadingResponseTime, setLoadingResponseTime] =
    useState(true);

  // =========================================================
  // MODAL STATES
  // =========================================================

  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // =========================================================
  // REPLY
  // =========================================================

  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // =========================================================
  // NEW TICKET FORM
  // =========================================================

  const [newSubject, setNewSubject] = useState("");
  const [newCustomer, setNewCustomer] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newStatus, setNewStatus] = useState("Open");
  const [newDescription, setNewDescription] = useState("");

  // =========================================================
  // EDIT TICKET
  // =========================================================

  const [editTicketData, setEditTicketData] = useState(null);

  // =========================================================
  // FETCH ALL TICKETS
  // =========================================================

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL);

      if (response.data.success) {
        const data = response.data.tickets || [];

        setTickets(data);

        if (data.length > 0) {
          setSelectedTicket((previous) => {
            if (!previous) {
              return data[0];
            }

            const updatedSelectedTicket = data.find(
              (ticket) => ticket.id === previous.id
            );

            return updatedSelectedTicket || data[0];
          });
        } else {
          setSelectedTicket(null);
        }
      }
    } catch (error) {
      console.error("Fetch tickets error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to connect with backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH AVERAGE RESPONSE TIME
  // =========================================================

  const fetchAverageResponseTime = async () => {
    try {
      setLoadingResponseTime(true);

      const response = await axios.get(
        `${API_URL}/stats/average-response-time`
      );

      if (response.data.success) {
        setAverageResponseTime(
          response.data.averageResponseTime?.formatted ||
            "0m"
        );

        setResponseCount(
          response.data.responseCount || 0
        );
      }
    } catch (error) {
      console.error(
        "Average response time error:",
        error
      );

      setAverageResponseTime("0m");
      setResponseCount(0);
    } finally {
      setLoadingResponseTime(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchTickets();
    fetchAverageResponseTime();
  }, []);

  // =========================================================
  // FILTERED TICKETS
  // =========================================================

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesTab =
        activeTab === "All Tickets" ||
        ticket.status === activeTab;

      const search = searchQuery
        .toLowerCase()
        .trim();

      const matchesSearch =
        !search ||
        ticket.subject
          ?.toLowerCase()
          .includes(search) ||
        ticket.customer
          ?.toLowerCase()
          .includes(search) ||
        ticket.id
          ?.toLowerCase()
          .includes(search) ||
        ticket.email
          ?.toLowerCase()
          .includes(search);

      return matchesTab && matchesSearch;
    });
  }, [tickets, activeTab, searchQuery]);

  // =========================================================
  // DYNAMIC METRICS
  // =========================================================

  const metrics = useMemo(() => {
    const total = tickets.length;

    const open = tickets.filter(
      (ticket) => ticket.status === "Open"
    ).length;

    const inProgress = tickets.filter(
      (ticket) => ticket.status === "In Progress"
    ).length;

    const resolved = tickets.filter(
      (ticket) => ticket.status === "Resolved"
    ).length;

    return {
      total,
      open,
      inProgress,
      resolved,
    };
  }, [tickets]);

  // =========================================================
  // RESET NEW TICKET FORM
  // =========================================================

  const resetNewTicketForm = () => {
    setNewSubject("");
    setNewCustomer("");
    setNewEmail("");
    setNewPhone("");
    setNewPriority("Medium");
    setNewStatus("Open");
    setNewDescription("");
  };

  // =========================================================
  // CREATE NEW TICKET
  // =========================================================

  const handleCreateTicket = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        subject: newSubject.trim(),
        customer: newCustomer.trim(),
        email: newEmail.trim(),
        phone: newPhone.trim(),
        priority: newPriority,
        status: newStatus,
        description: newDescription.trim(),
      };

      const response = await axios.post(
        API_URL,
        payload
      );

      if (response.data.success) {
        const createdTicket = response.data.ticket;

        setTickets((previous) => [
          createdTicket,
          ...previous,
        ]);

        setSelectedTicket(createdTicket);

        setIsNewTicketOpen(false);

        resetNewTicketForm();

        // Refresh average response time
        await fetchAverageResponseTime();

        alert("Ticket created successfully.");
      }
    } catch (error) {
      console.error("Create ticket error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create ticket."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE TICKET
  // =========================================================

  const handleDeleteTicket = async (id, e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      const response = await axios.delete(
        `${API_URL}/${encodeURIComponent(id)}`
      );

      if (response.data.success) {
        const remainingTickets = tickets.filter(
          (ticket) => ticket.id !== id
        );

        setTickets(remainingTickets);

        if (selectedTicket?.id === id) {
          setSelectedTicket(
            remainingTickets[0] || null
          );
        }

        // Refresh average response time
        await fetchAverageResponseTime();

        alert("Ticket deleted successfully.");
      }
    } catch (error) {
      console.error("Delete ticket error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete ticket."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const handleOpenEdit = (ticket, e) => {
    e.stopPropagation();

    setEditTicketData({
      ...ticket,
      phone: ticket.phone || "",
    });

    setIsEditModalOpen(true);
  };

  // =========================================================
  // UPDATE TICKET
  // =========================================================

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editTicketData) {
      return;
    }

    try {
      setSaving(true);

      const payload = {
        subject: editTicketData.subject.trim(),
        customer: editTicketData.customer.trim(),
        email: editTicketData.email.trim(),
        phone: editTicketData.phone?.trim() || "",
        priority: editTicketData.priority,
        status: editTicketData.status,
        description:
          editTicketData.description.trim(),
      };

      const response = await axios.put(
        `${API_URL}/${encodeURIComponent(
          editTicketData.id
        )}`,
        payload
      );

      if (response.data.success) {
        const updatedTicket = response.data.ticket;

        setTickets((previous) =>
          previous.map((ticket) =>
            ticket.id === updatedTicket.id
              ? updatedTicket
              : ticket
          )
        );

        setSelectedTicket(updatedTicket);

        setIsEditModalOpen(false);
        setEditTicketData(null);

        alert("Ticket updated successfully.");
      }
    } catch (error) {
      console.error("Update ticket error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update ticket."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // SEND SUPPORT REPLY
  // =========================================================

  const handleSendReply = async () => {
    if (
      !replyText.trim() ||
      !selectedTicket
    ) {
      return;
    }

    try {
      setSendingReply(true);

      const response = await axios.post(
        `${API_URL}/${encodeURIComponent(
          selectedTicket.id
        )}/reply`,
        {
          text: replyText.trim(),
        }
      );

      if (response.data.success) {
        const updatedTicket = response.data.ticket;

        setTickets((previous) =>
          previous.map((ticket) =>
            ticket.id === updatedTicket.id
              ? updatedTicket
              : ticket
          )
        );

        setSelectedTicket(updatedTicket);

        setReplyText("");

        // IMPORTANT:
        // Recalculate average response time
        await fetchAverageResponseTime();
      }
    } catch (error) {
      console.error("Reply error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to send reply."
      );
    } finally {
      setSendingReply(false);
    }
  };

  // =========================================================
  // EXPORT TICKETS
  // =========================================================

  const handleExportTickets = () => {
    if (!tickets.length) {
      alert("No tickets available to export.");
      return;
    }

    const headers = [
      "Ticket ID",
      "Subject",
      "Customer",
      "Email",
      "Phone",
      "Status",
      "Priority",
      "Created",
      "Updated",
      "Description",
    ];

    const rows = tickets.map((ticket) => [
      ticket.id,
      ticket.subject,
      ticket.customer,
      ticket.email,
      ticket.phone,
      ticket.status,
      ticket.priority,
      formatDate(ticket.created),
      formatDate(ticket.updated),
      ticket.description,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => {
            const text = String(value ?? "");

            return `"${text.replace(
              /"/g,
              '""'
            )}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `support-tickets-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleString();
  };

  // =========================================================
  // STATUS CLASS
  // =========================================================

  const getStatusClass = (status) => {
    return `Support-status-${status
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  // =========================================================
  // PRIORITY CLASS
  // =========================================================

  const getPriorityClass = (priority) => {
    return `Support-priority-${priority.toLowerCase()}`;
  };

  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (loading) {
    return (
      <div className="Support-container">
        <div className="Support-loading">
          <div className="Support-loading-spinner"></div>

          <p>
            Loading support tickets...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="Support-container">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="Support-header-wrapper">

        <div className="Support-title-group">

          <h1 className="Support-main-title">
            Support Tickets
          </h1>

          <p className="Support-subtitle">
            Manage customer support requests and
            provide quick solutions
          </p>

        </div>

        <div className="Support-header-actions">

          <button
            className="Support-btn Support-btn-export"
            onClick={handleExportTickets}
          >
            <FiDownload />
            Export Tickets
          </button>

          <button
            className="Support-btn Support-btn-primary"
            onClick={() => {
              resetNewTicketForm();
              setIsNewTicketOpen(true);
            }}
          >
            <FiPlus />
            New Ticket
          </button>

        </div>

      </div>

      {/* =====================================================
          METRICS
      ===================================================== */}

      <div className="Support-metrics-grid">

        {/* TOTAL */}

        <div className="Support-metric-card">

          <div className="Support-metric-info">

            <span className="Support-metric-title">
              Total Tickets
            </span>

            <h2 className="Support-metric-value">
              {metrics.total}
            </h2>

            <span className="Support-metric-trend Support-trend-up">
              Current total tickets
            </span>

          </div>

          <div className="Support-metric-icon Support-icon-green">
            <FiHeadphones />
          </div>

        </div>

        {/* OPEN */}

        <div className="Support-metric-card">

          <div className="Support-metric-info">

            <span className="Support-metric-title">
              Open Tickets
            </span>

            <h2 className="Support-metric-value">
              {metrics.open}
            </h2>

            <span className="Support-metric-trend Support-trend-up">
              Currently open
            </span>

          </div>

          <div className="Support-metric-icon Support-icon-yellow">
            <FiMail />
          </div>

        </div>

        {/* IN PROGRESS */}

        <div className="Support-metric-card">

          <div className="Support-metric-info">

            <span className="Support-metric-title">
              In Progress
            </span>

            <h2 className="Support-metric-value">
              {metrics.inProgress}
            </h2>

            <span className="Support-metric-trend Support-trend-up">
              Being handled
            </span>

          </div>

          <div className="Support-metric-icon Support-icon-blue">
            <FiClock />
          </div>

        </div>

        {/* RESOLVED */}

        <div className="Support-metric-card">

          <div className="Support-metric-info">

            <span className="Support-metric-title">
              Resolved Tickets
            </span>

            <h2 className="Support-metric-value">
              {metrics.resolved}
            </h2>

            <span className="Support-metric-trend Support-trend-up">
              Successfully resolved
            </span>

          </div>

          <div className="Support-metric-icon Support-icon-success">
            <FiCheckCircle />
          </div>

        </div>

        {/* =================================================
            AVERAGE RESPONSE TIME
        ================================================= */}

        <div className="Support-metric-card">

          <div className="Support-metric-info">

            <span className="Support-metric-title">
              Avg. Response Time
            </span>

            <h2 className="Support-metric-value">

              {loadingResponseTime
                ? "..."
                : averageResponseTime}

            </h2>

            <span className="Support-metric-trend Support-trend-down">

              {responseCount > 0
                ? `Based on ${responseCount} response${
                    responseCount > 1
                      ? "s"
                      : ""
                  }`
                : "No responses yet"}

            </span>

          </div>

          <div className="Support-metric-icon Support-icon-purple">
            <FiActivity />
          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN WORKSPACE
      ===================================================== */}

      <div className="Support-workspace">

        {/* ===================================================
            TABLE SECTION
        =================================================== */}

        <div className="Support-table-section">

          {/* FILTER BAR */}

          <div className="Support-filter-bar">

            <div className="Support-tabs">

              {[
                "All Tickets",
                "Open",
                "In Progress",
                "Resolved",
                "Closed",
              ].map((tab) => (

                <button
                  key={tab}
                  className={`Support-tab ${
                    activeTab === tab
                      ? "Support-tab-active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTab(tab)
                  }
                >
                  {tab}
                </button>

              ))}

            </div>

            <div className="Support-search-filter-group">

              <div className="Support-search-box">

                <FiSearch className="Support-search-icon" />

                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(
                      e.target.value
                    )
                  }
                />

              </div>

              <button className="Support-filter-btn">
                <FiFilter />
                Filters
              </button>

            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="Support-table-responsive">

            <table className="Support-tickets-table">

              <thead>

                <tr>

                  <th>
                    <input
                      type="checkbox"
                    />
                  </th>

                  <th>
                    TICKET ID
                  </th>

                  <th>
                    SUBJECT
                  </th>

                  <th>
                    CUSTOMER
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    PRIORITY
                  </th>

                  <th>
                    UPDATED
                  </th>

                  <th>
                    ACTION
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredTickets.length > 0 ? (

                  filteredTickets.map(
                    (ticket) => (

                      <tr
                        key={ticket.id}
                        className={
                          selectedTicket?.id ===
                          ticket.id
                            ? "Support-row-selected"
                            : ""
                        }
                        onClick={() =>
                          setSelectedTicket(
                            ticket
                          )
                        }
                      >

                        <td
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >
                          <input
                            type="checkbox"
                          />
                        </td>

                        <td className="Support-ticket-id">
                          {ticket.id}
                        </td>

                        <td className="Support-ticket-subject">
                          {ticket.subject}
                        </td>

                        <td>

                          <div className="Support-table-customer">

                            <span className="Support-cust-name">
                              {ticket.customer}
                            </span>

                            <span className="Support-cust-email">
                              {ticket.email}
                            </span>

                          </div>

                        </td>

                        <td>

                          <span
                            className={`Support-badge ${getStatusClass(
                              ticket.status
                            )}`}
                          >
                            {ticket.status}
                          </span>

                        </td>

                        <td>

                          <span
                            className={`Support-badge ${getPriorityClass(
                              ticket.priority
                            )}`}
                          >
                            {ticket.priority}
                          </span>

                        </td>

                        <td className="Support-ticket-updated">
                          {formatDate(
                            ticket.updated
                          )}
                        </td>

                        <td
                          className="Support-action-cell"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >

                          <div className="Support-action-wrapper">

                            {/* VIEW */}

                            <button
                              className="Support-action-icon-btn"
                              onClick={() =>
                                setSelectedTicket(
                                  ticket
                                )
                              }
                              title="View"
                            >
                              <FiEye />
                            </button>

                            {/* EDIT */}

                            <button
                              className="Support-action-icon-btn"
                              onClick={(e) =>
                                handleOpenEdit(
                                  ticket,
                                  e
                                )
                              }
                              title="Edit"
                            >
                              <FiEdit2 />
                            </button>

                            {/* DELETE */}

                            <button
                              className="Support-action-icon-btn Support-delete-btn"
                              onClick={(e) =>
                                handleDeleteTicket(
                                  ticket.id,
                                  e
                                )
                              }
                              disabled={
                                deletingId ===
                                ticket.id
                              }
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="Support-no-tickets"
                    >
                      No tickets found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="Support-pagination-bar">

            <span className="Support-pagination-info">
              Showing{" "}
              {filteredTickets.length}{" "}
              of {tickets.length} tickets
            </span>

            <div className="Support-pagination-controls">

              <button className="Support-page-btn">
                <FiChevronLeft />
              </button>

              <button className="Support-page-btn Support-page-active">
                1
              </button>

              <button className="Support-page-btn">
                2
              </button>

              <button className="Support-page-btn">
                3
              </button>

              <button className="Support-page-btn">
                4
              </button>

              <button className="Support-page-btn">
                5
              </button>

              <span className="Support-page-dots">
                ...
              </span>

              <button className="Support-page-btn">
                53
              </button>

              <button className="Support-page-btn">
                <FiChevronRight />
              </button>

            </div>

          </div>

        </div>

        {/* ===================================================
            RIGHT SIDE DETAILS
        =================================================== */}

        {selectedTicket ? (

          <div className="Support-details-section">

            {/* HEADER */}

            <div className="Support-details-header">

              <h3 className="Support-details-title">
                Ticket Details
              </h3>

              <span
                className={`Support-badge ${getStatusClass(
                  selectedTicket.status
                )}`}
              >
                ● {selectedTicket.status}
              </span>

            </div>

            {/* META */}

            <div className="Support-details-meta-grid">

              <div>

                <span className="Support-meta-label">
                  Ticket ID
                </span>

                <p className="Support-meta-value Support-highlight">
                  {selectedTicket.id}
                </p>

              </div>

              <div>

                <span className="Support-meta-label">
                  Priority
                </span>

                <p>

                  <span
                    className={`Support-badge ${getPriorityClass(
                      selectedTicket.priority
                    )}`}
                  >
                    {selectedTicket.priority}
                  </span>

                </p>

              </div>

              <div>

                <span className="Support-meta-label">
                  Created On
                </span>

                <p className="Support-meta-value">
                  {formatDate(
                    selectedTicket.created
                  )}
                </p>

              </div>

            </div>

            {/* SUBJECT */}

            <div className="Support-details-block">

              <span className="Support-meta-label">
                Subject
              </span>

              <p className="Support-subject-text">
                {selectedTicket.subject}
              </p>

            </div>

            {/* CUSTOMER */}

            <div className="Support-details-block">

              <span className="Support-meta-label">
                Customer
              </span>

              <div className="Support-customer-card-info">

                <div className="Support-customer-avatar-placeholder">

                  {selectedTicket.customer?.charAt(
                    0
                  )}

                </div>

                <div className="Support-customer-details-text">

                  <strong>
                    {selectedTicket.customer}
                  </strong>

                  <span>
                    {selectedTicket.email}
                  </span>

                </div>

                <div className="Support-customer-phone">
                  {selectedTicket.phone ||
                    "-"}
                </div>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="Support-details-block">

              <span className="Support-meta-label">
                Description
              </span>

              <p className="Support-desc-text">
                {selectedTicket.description}
              </p>

            </div>

            {/* =================================================
                CONVERSATION
            ================================================= */}

            <div className="Support-conversation-wrapper">

              <span className="Support-meta-label">
                Conversation
              </span>

              <div className="Support-conversation-list">

                {(
                  selectedTicket.conversation ||
                  []
                ).map(
                  (conv, idx) => (

                    <div
                      key={idx}
                      className={`Support-chat-bubble-row ${
                        conv.sender ===
                        "support"
                          ? "Support-row-support"
                          : "Support-row-customer"
                      }`}
                    >

                      {/* SUPPORT AVATAR */}

                      {conv.sender ===
                        "support" && (

                        <div className="Support-chat-avatar Support-avatar-support">
                          <FiHeadphones />
                        </div>

                      )}

                      {/* MESSAGE */}

                      <div
                        className={`Support-chat-bubble ${
                          conv.sender ===
                          "support"
                            ? "Support-bubble-support"
                            : "Support-bubble-customer"
                        }`}
                      >

                        <p>
                          {conv.text}
                        </p>

                        <span className="Support-chat-time">
                          {conv.time}
                        </span>

                      </div>

                      {/* CUSTOMER AVATAR */}

                      {conv.sender ===
                        "customer" && (

                        <div className="Support-chat-avatar Support-avatar-customer">

                          {selectedTicket.customer?.charAt(
                            0
                          )}

                        </div>

                      )}

                    </div>

                  )
                )}

              </div>

            </div>

            {/* =================================================
                REPLY BOX
            ================================================= */}

            <div className="Support-reply-box-container">

              <textarea
                className="Support-reply-textarea"
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) =>
                  setReplyText(
                    e.target.value
                  )
                }
              />

              <div className="Support-reply-actions-bar">

                <div className="Support-reply-tools">

                  <button className="Support-tool-icon-btn">
                    <FiPaperclip />
                  </button>

                  <button className="Support-tool-icon-btn">
                    <FiSmile />
                  </button>

                </div>

                <button
                  className="Support-btn Support-btn-primary Support-send-btn"
                  onClick={
                    handleSendReply
                  }
                  disabled={
                    sendingReply ||
                    !replyText.trim()
                  }
                >

                  <FiSend />

                  {sendingReply
                    ? "Sending..."
                    : "Send Reply"}

                </button>

              </div>

            </div>

          </div>

        ) : (

          <div className="Support-details-section Support-no-selection">

            <p>
              Select a ticket to view details
            </p>

          </div>

        )}

      </div>

      {/* =====================================================
          NEW TICKET MODAL
      ===================================================== */}

      {isNewTicketOpen && (

        <div
          className="Support-modal-overlay"
          onClick={() => {
            if (!saving) {
              setIsNewTicketOpen(
                false
              );
            }
          }}
        >

          <div
            className="Support-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="Support-modal-header">

              <h2>
                Create New Support Ticket
              </h2>

              <button
                className="Support-modal-close"
                onClick={() =>
                  !saving &&
                  setIsNewTicketOpen(
                    false
                  )
                }
              >
                <FiX />
              </button>

            </div>

            <form
              onSubmit={
                handleCreateTicket
              }
              className="Support-modal-form"
            >

              {/* SUBJECT */}

              <div className="Support-form-group">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="e.g. Issue with billing"
                  value={
                    newSubject
                  }
                  onChange={(e) =>
                    setNewSubject(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

              {/* CUSTOMER + EMAIL */}

              <div className="Support-form-row">

                <div className="Support-form-group">

                  <label>
                    Customer Name
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={
                      newCustomer
                    }
                    onChange={(e) =>
                      setNewCustomer(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="Support-form-group">

                  <label>
                    Customer Email
                  </label>

                  <input
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={newEmail}
                    onChange={(e) =>
                      setNewEmail(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

              </div>

              {/* PHONE + PRIORITY */}

              <div className="Support-form-row">

                <div className="Support-form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="text"
                    placeholder="+91 9876543210"
                    value={newPhone}
                    onChange={(e) =>
                      setNewPhone(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="Support-form-group">

                  <label>
                    Priority
                  </label>

                  <select
                    value={
                      newPriority
                    }
                    onChange={(e) =>
                      setNewPriority(
                        e.target.value
                      )
                    }
                  >

                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>

                  </select>

                </div>

              </div>

              {/* STATUS */}

              <div className="Support-form-row">

                <div className="Support-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    value={
                      newStatus
                    }
                    onChange={(e) =>
                      setNewStatus(
                        e.target.value
                      )
                    }
                  >

                    <option value="Open">
                      Open
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                    <option value="Closed">
                      Closed
                    </option>

                  </select>

                </div>

              </div>

              {/* DESCRIPTION */}

              <div className="Support-form-group">

                <label>
                  Description / Message
                </label>

                <textarea
                  placeholder="Describe the issue in detail..."
                  value={
                    newDescription
                  }
                  onChange={(e) =>
                    setNewDescription(
                      e.target.value
                    )
                  }
                  rows="4"
                  required
                />

              </div>

              {/* FOOTER */}

              <div className="Support-modal-footer">

                <button
                  type="button"
                  className="Support-btn Support-btn-secondary"
                  onClick={() =>
                    !saving &&
                    setIsNewTicketOpen(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="Support-btn Support-btn-primary"
                  disabled={saving}
                >
                  {saving
                    ? "Creating..."
                    : "Create Ticket"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =====================================================
          EDIT TICKET MODAL
      ===================================================== */}

      {isEditModalOpen &&
        editTicketData && (

          <div
            className="Support-modal-overlay"
            onClick={() => {
              if (!saving) {
                setIsEditModalOpen(
                  false
                );
              }
            }}
          >

            <div
              className="Support-modal-content"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="Support-modal-header">

                <h2>
                  Edit Ticket (
                  {editTicketData.id}
                  )
                </h2>

                <button
                  className="Support-modal-close"
                  onClick={() =>
                    !saving &&
                    setIsEditModalOpen(
                      false
                    )
                  }
                >
                  <FiX />
                </button>

              </div>

              <form
                onSubmit={
                  handleEditSubmit
                }
                className="Support-modal-form"
              >

                {/* SUBJECT */}

                <div className="Support-form-group">

                  <label>
                    Subject
                  </label>

                  <input
                    type="text"
                    value={
                      editTicketData.subject
                    }
                    onChange={(e) =>
                      setEditTicketData({
                        ...editTicketData,
                        subject:
                          e.target.value,
                      })
                    }
                    required
                  />

                </div>

                {/* CUSTOMER + EMAIL */}

                <div className="Support-form-row">

                  <div className="Support-form-group">

                    <label>
                      Customer Name
                    </label>

                    <input
                      type="text"
                      value={
                        editTicketData.customer
                      }
                      onChange={(e) =>
                        setEditTicketData({
                          ...editTicketData,
                          customer:
                            e.target.value,
                        })
                      }
                      required
                    />

                  </div>

                  <div className="Support-form-group">

                    <label>
                      Customer Email
                    </label>

                    <input
                      type="email"
                      value={
                        editTicketData.email
                      }
                      onChange={(e) =>
                        setEditTicketData({
                          ...editTicketData,
                          email:
                            e.target.value,
                        })
                      }
                      required
                    />

                  </div>

                </div>

                {/* PHONE + PRIORITY */}

                <div className="Support-form-row">

                  <div className="Support-form-group">

                    <label>
                      Phone Number
                    </label>

                    <input
                      type="text"
                      value={
                        editTicketData.phone ||
                        ""
                      }
                      onChange={(e) =>
                        setEditTicketData({
                          ...editTicketData,
                          phone:
                            e.target.value,
                        })
                      }
                    />

                  </div>

                  <div className="Support-form-group">

                    <label>
                      Priority
                    </label>

                    <select
                      value={
                        editTicketData.priority
                      }
                      onChange={(e) =>
                        setEditTicketData({
                          ...editTicketData,
                          priority:
                            e.target.value,
                        })
                      }
                    >

                      <option value="Low">
                        Low
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="High">
                        High
                      </option>

                    </select>

                  </div>

                </div>

                {/* STATUS */}

                <div className="Support-form-row">

                  <div className="Support-form-group">

                    <label>
                      Status
                    </label>

                    <select
                      value={
                        editTicketData.status
                      }
                      onChange={(e) =>
                        setEditTicketData({
                          ...editTicketData,
                          status:
                            e.target.value,
                        })
                      }
                    >

                      <option value="Open">
                        Open
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Resolved">
                        Resolved
                      </option>

                      <option value="Closed">
                        Closed
                      </option>

                    </select>

                  </div>

                </div>

                {/* DESCRIPTION */}

                <div className="Support-form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    value={
                      editTicketData.description
                    }
                    onChange={(e) =>
                      setEditTicketData({
                        ...editTicketData,
                        description:
                          e.target.value,
                      })
                    }
                    rows="4"
                    required
                  />

                </div>

                {/* FOOTER */}

                <div className="Support-modal-footer">

                  <button
                    type="button"
                    className="Support-btn Support-btn-secondary"
                    onClick={() =>
                      !saving &&
                      setIsEditModalOpen(
                        false
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="Support-btn Support-btn-primary"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

    </div>
  );
};

export default Support;