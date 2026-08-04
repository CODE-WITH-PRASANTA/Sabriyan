const Customer = require('../models/Customer');

// Helper to escape special regex characters for search
const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

// ================= 1. CREATE CUSTOMER =================
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, group, dob, gender, address, category } = req.body;

    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email: email.toLowerCase() });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: 'A customer with this email already exists.',
      });
    }

    const newCustomer = new Customer({
      name,
      email,
      phone,
      group: group || 'Regular',
      vip: group === 'VIP Customers',
      dob,
      gender,
      address,
      category: category ? (Array.isArray(category) ? category : [category]) : ['General'],
    });

    const savedCustomer = await newCustomer.save();

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: savedCustomer,
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create customer',
    });
  }
};

// ================= 2. GET ALL CUSTOMERS (With Search & Filter) =================
exports.getCustomers = async (req, res) => {
  try {
    const { search, group, status, page = 1, limit = 10 } = req.query;
    const query = {};

    // Search filter (Name, Email, Phone)
    if (search && String(search).trim() !== '') {
      const sanitized = escapeRegex(String(search).trim());
      query.$or = [
        { name: { $regex: sanitized, $options: 'i' } },
        { email: { $regex: sanitized, $options: 'i' } },
        { phone: { $regex: sanitized, $options: 'i' } },
      ];
    }

    // Group filter
    if (group && group !== 'All Groups') {
      query.group = group;
    }

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Customer.countDocuments(query);
    const customers = await Customer.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: customers.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: customers,
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching customers',
    });
  }
};

// ================= 3. GET SINGLE CUSTOMER BY ID =================
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// ================= 4. UPDATE CUSTOMER =================
exports.updateCustomer = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.group) {
      updates.vip = updates.group === 'VIP Customers';
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      data: updatedCustomer,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Update failed' });
  }
};

// ================= 5. DELETE CUSTOMER =================
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Delete failed' });
  }
};