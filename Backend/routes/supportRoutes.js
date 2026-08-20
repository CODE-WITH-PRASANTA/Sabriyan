const express = require("express");

const {
  getAllTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  sendReply,
  getAverageResponseTime,
} = require("../controllers/supportController");

const router = express.Router();

// ==========================================
// AVERAGE RESPONSE TIME
// IMPORTANT: keep this BEFORE /:id
// ==========================================

router.get(
  "/stats/average-response-time",
  getAverageResponseTime
);

// ==========================================
// GET ALL TICKETS
// ==========================================

router.get("/", getAllTickets);

// ==========================================
// GET SINGLE TICKET
// ==========================================

router.get("/:id", getSingleTicket);

// ==========================================
// CREATE
// ==========================================

router.post("/", createTicket);

// ==========================================
// UPDATE
// ==========================================

router.put("/:id", updateTicket);

// ==========================================
// DELETE
// ==========================================

router.delete("/:id", deleteTicket);

// ==========================================
// REPLY
// ==========================================

router.post("/:id/reply", sendReply);

module.exports = router; 