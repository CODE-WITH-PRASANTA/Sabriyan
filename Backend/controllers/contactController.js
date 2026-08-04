const ContactInquiry = require("../models/ContactInquiry");

// Helper to escape regex search queries
const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

// ================= 1. CREATE CONTACT INQUIRY (POST) =================
exports.createInquiry = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Email, and Message are required.',
      });
    }

    const newInquiry = new ContactInquiry({
      fullName,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
    });

    const savedInquiry = await newInquiry.save();

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully!',
      data: savedInquiry,
    });
  } catch (error) {
    console.error('Error submitting contact inquiry:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit inquiry',
    });
  }
};

// ================= 2. GET ALL INQUIRIES (GET) =================
exports.getInquiries = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};

    // Search filter
    if (search && String(search).trim() !== '') {
      const sanitizedSearch = escapeRegex(String(search).trim());
      query.$or = [
        { fullName: { $regex: sanitizedSearch, $options: 'i' } },
        { email: { $regex: sanitizedSearch, $options: 'i' } },
        { subject: { $regex: sanitizedSearch, $options: 'i' } },
        { message: { $regex: sanitizedSearch, $options: 'i' } },
      ];
    }

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await ContactInquiry.countDocuments(query);
    const inquiries = await ContactInquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: inquiries.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: inquiries,
    });
  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching inquiries',
    });
  }
};

// ================= 3. GET SINGLE INQUIRY BY ID =================
exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await ContactInquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// ================= 4. UPDATE INQUIRY STATUS =================
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedInquiry = await ContactInquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: updatedInquiry,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Update failed' });
  }
};

// ================= 5. DELETE INQUIRY =================
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await ContactInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Delete failed' });
  }
};