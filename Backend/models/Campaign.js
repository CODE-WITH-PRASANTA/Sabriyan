const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  type: { type: String, required: true, default: 'Discount' },
  channel: { type: String, required: true, default: 'Instagram' },
  duration: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  budget: { type: String, required: true },
  reach: { type: String, default: '0' },
  status: { type: String, required: true, default: 'Scheduled' },
  thumbnail: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);