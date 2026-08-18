const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ["customer", "support"],
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    time: {
      type: String,
      default: "Just now",
    },

    // IMPORTANT:
    // Actual date/time used for response-time calculation
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const supportTicketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    customer: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    conversation: {
      type: [conversationSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SupportTicket",
  supportTicketSchema
);