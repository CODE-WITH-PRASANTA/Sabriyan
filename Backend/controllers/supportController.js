const SupportTicket = require("../models/SupportTicket");

// ==========================================
// FORMAT TICKET
// ==========================================

const formatTicket = (ticket) => {
  return {
    id: ticket.ticketId,
    _id: ticket._id,
    subject: ticket.subject,
    customer: ticket.customer,
    email: ticket.email,
    phone: ticket.phone,
    status: ticket.status,
    priority: ticket.priority,
    updated: ticket.updatedAt,
    created: ticket.createdAt,
    description: ticket.description,
    conversation: ticket.conversation || [],
  };
};

// ==========================================
// GET ALL TICKETS
// ==========================================

const getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find()
      .sort({ createdAt: -1 })
      .lean();

    const formattedTickets = tickets.map(formatTicket);

    res.status(200).json({
      success: true,
      count: formattedTickets.length,
      tickets: formattedTickets,
    });
  } catch (error) {
    console.error("Get Tickets Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE TICKET
// ==========================================

const getSingleTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findOne({
      ticketId: req.params.id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      ticket: formatTicket(ticket),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch ticket",
      error: error.message,
    });
  }
};

// ==========================================
// GENERATE NEXT TICKET ID
// ==========================================

const generateTicketId = async () => {
  const lastTicket = await SupportTicket.findOne()
    .sort({ createdAt: -1 })
    .lean();

  if (!lastTicket) {
    return "#TK-1001";
  }

  const lastNumber = parseInt(
    lastTicket.ticketId.replace("#TK-", ""),
    10
  );

  const nextNumber = lastNumber + 1;

  return `#TK-${nextNumber}`;
};

// ==========================================
// CREATE TICKET
// ==========================================

const createTicket = async (req, res) => {
  try {
    const {
      subject,
      customer,
      email,
      phone,
      status,
      priority,
      description,
    } = req.body;

    if (!subject || !customer || !email || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Subject, customer, email and description are required",
      });
    }

    const ticketId = await generateTicketId();

    const now = new Date();

    const ticket = await SupportTicket.create({
      ticketId,
      subject,
      customer,
      email,
      phone: phone || "",
      status: status || "Open",
      priority: priority || "Medium",
      description,

      conversation: [
        {
          sender: "customer",
          text: description,
          time: now.toLocaleString(),
          timestamp: now,
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket: formatTicket(ticket),
    });
  } catch (error) {
    console.error("Create Ticket Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create ticket",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE TICKET
// ==========================================

const updateTicket = async (req, res) => {
  try {
    const {
      subject,
      customer,
      email,
      phone,
      status,
      priority,
      description,
    } = req.body;

    const ticket = await SupportTicket.findOne({
      ticketId: req.params.id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    ticket.subject = subject ?? ticket.subject;
    ticket.customer = customer ?? ticket.customer;
    ticket.email = email ?? ticket.email;
    ticket.phone = phone ?? ticket.phone;
    ticket.status = status ?? ticket.status;
    ticket.priority = priority ?? ticket.priority;
    ticket.description = description ?? ticket.description;

    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      ticket: formatTicket(ticket),
    });
  } catch (error) {
    console.error("Update Ticket Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update ticket",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE TICKET
// ==========================================

const deleteTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findOneAndDelete({
      ticketId: req.params.id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
      ticketId: req.params.id,
    });
  } catch (error) {
    console.error("Delete Ticket Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete ticket",
      error: error.message,
    });
  }
};

// ==========================================
// SEND REPLY
// ==========================================

const sendReply = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reply message is required",
      });
    }

    const ticket = await SupportTicket.findOne({
      ticketId: req.params.id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const now = new Date();

    ticket.conversation.push({
      sender: "support",
      text: text.trim(),
      time: now.toLocaleString(),
      timestamp: now,
    });

    ticket.updatedAt = now;

    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Reply sent successfully",
      ticket: formatTicket(ticket),
    });
  } catch (error) {
    console.error("Send Reply Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send reply",
      error: error.message,
    });
  }
};

// ==========================================
// GET AVERAGE RESPONSE TIME
// ==========================================

const getAverageResponseTime = async (req, res) => {
  try {
    const tickets = await SupportTicket.find()
      .select("conversation")
      .lean();

    let totalResponseTime = 0;
    let responseCount = 0;

    tickets.forEach((ticket) => {
      const conversation = ticket.conversation || [];

      if (conversation.length === 0) {
        return;
      }

      // Find customer messages
      for (let i = 0; i < conversation.length; i++) {
        const currentMessage = conversation[i];

        if (currentMessage.sender !== "customer") {
          continue;
        }

        const customerTime = currentMessage.timestamp
          ? new Date(currentMessage.timestamp)
          : null;

        if (
          !customerTime ||
          Number.isNaN(customerTime.getTime())
        ) {
          continue;
        }

        // Find first support reply AFTER customer message
        const supportReply = conversation
          .slice(i + 1)
          .find(
            (message) =>
              message.sender === "support" &&
              message.timestamp
          );

        if (!supportReply) {
          continue;
        }

        const supportTime = new Date(
          supportReply.timestamp
        );

        if (
          Number.isNaN(supportTime.getTime()) ||
          supportTime <= customerTime
        ) {
          continue;
        }

        const difference =
          supportTime.getTime() -
          customerTime.getTime();

        totalResponseTime += difference;
        responseCount++;

        // Only first response of each customer message
        break;
      }
    });

    // No support response available
    if (responseCount === 0) {
      return res.status(200).json({
        success: true,
        averageResponseTime: {
          milliseconds: 0,
          minutes: 0,
          hours: 0,
          formatted: "0m",
        },
        responseCount: 0,
      });
    }

    const averageMilliseconds =
      totalResponseTime / responseCount;

    const totalMinutes = Math.round(
      averageMilliseconds / (1000 * 60)
    );

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let formatted = "";

    if (hours > 0 && minutes > 0) {
      formatted = `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      formatted = `${hours}h`;
    } else {
      formatted = `${minutes}m`;
    }

    res.status(200).json({
      success: true,

      averageResponseTime: {
        milliseconds: averageMilliseconds,
        minutes: totalMinutes,
        hours,
        formatted,
      },

      responseCount,
    });
  } catch (error) {
    console.error(
      "Average Response Time Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to calculate average response time",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  sendReply,
  getAverageResponseTime,
};