const Attribute = require("../models/Attribute");

// ==========================================
// 1. GET ALL ATTRIBUTES (Search, Filter, Sort, Pagination)
// ==========================================
// @route   GET /api/attributes
const getAttributes = async (req, res) => {
  try {
    const { search, status, sort, page = 1, limit = 6 } = req.query;

    const query = {};

    // Search Filter
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Status Filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // Sorting Logic
    let sortOptions = {};
    if (sort === 'Newest') {
      sortOptions.createdAt = -1;
    } else if (sort === 'Oldest') {
      sortOptions.createdAt = 1;
    } else if (sort === 'A to Z') {
      sortOptions.name = 1;
    } else {
      sortOptions.createdAt = -1;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 6;
    const skip = (pageNum - 1) * limitNum;

    // Stat Counts
    const totalAttributes = await Attribute.countDocuments();
    const activeAttributes = await Attribute.countDocuments({ status: 'Active' });
    const filteredTotal = await Attribute.countDocuments(query);

    const attributes = await Attribute.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      stats: {
        totalAttributes,
        activeAttributes,
      },
      pagination: {
        totalItems: filteredTotal,
        totalPages: Math.ceil(filteredTotal / limitNum) || 1,
        currentPage: pageNum,
        limit: limitNum,
      },
      count: attributes.length,
      data: attributes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 2. GET SINGLE ATTRIBUTE BY ID
// ==========================================
// @route   GET /api/attributes/:id
const getAttributeById = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ success: false, message: 'Attribute not found' });
    }
    res.status(200).json({ success: true, data: attribute });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 3. CREATE NEW ATTRIBUTE
// ==========================================
// @route   POST /api/attributes
const createAttribute = async (req, res) => {
  try {
    const {
      name,
      slug,
      type,
      inputType,
      description,
      displayOrder,
      status,
      addValuesManually,
      values,
      image,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Attribute name is required' });
    }

    const newAttribute = new Attribute({
      name: name.trim(),
      slug: slug ? slug.trim() : undefined,
      type: type || 'Select',
      inputType: inputType || 'Dropdown',
      description: description || 'Product attribute description',
      displayOrder: Number(displayOrder) || 1,
      status: status || 'Active',
      addValuesManually: addValuesManually !== undefined ? addValuesManually : true,
      values: Array.isArray(values) ? values : [],
      image: image || undefined,
    });

    const savedAttribute = await newAttribute.save();

    res.status(201).json({
      success: true,
      message: 'Attribute created successfully',
      data: savedAttribute,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ==========================================
// 4. UPDATE ATTRIBUTE
// ==========================================
// @route   PUT /api/attributes/:id
const updateAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ success: false, message: 'Attribute not found' });
    }

    const {
      name,
      slug,
      type,
      inputType,
      description,
      displayOrder,
      status,
      addValuesManually,
      values,
      image,
    } = req.body;

    if (name) attribute.name = name.trim();
    if (slug) attribute.slug = slug.trim();
    if (type) attribute.type = type;
    if (inputType) attribute.inputType = inputType;
    if (description !== undefined) attribute.description = description;
    if (displayOrder !== undefined) attribute.displayOrder = Number(displayOrder);
    if (status) attribute.status = status;
    if (addValuesManually !== undefined) attribute.addValuesManually = addValuesManually;
    if (values && Array.isArray(values)) attribute.values = values;
    if (image) attribute.image = image;

    const updatedAttribute = await attribute.save();

    res.status(200).json({
      success: true,
      message: 'Attribute updated successfully',
      data: updatedAttribute,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ==========================================
// 5. TOGGLE ATTRIBUTE STATUS
// ==========================================
// @route   PATCH /api/attributes/:id/status
const toggleAttributeStatus = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ success: false, message: 'Attribute not found' });
    }

    attribute.status = attribute.status === 'Active' ? 'Inactive' : 'Active';
    await attribute.save();

    res.status(200).json({
      success: true,
      message: `Attribute status updated to ${attribute.status}`,
      data: attribute,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 6. DELETE ATTRIBUTE
// ==========================================
// @route   DELETE /api/attributes/:id
const deleteAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findByIdAndDelete(req.params.id);
    if (!attribute) {
      return res.status(404).json({ success: false, message: 'Attribute not found' });
    }

    res.status(200).json({ success: true, message: 'Attribute deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAttributes,
  getAttributeById,
  createAttribute,
  updateAttribute,
  toggleAttributeStatus,
  deleteAttribute,
};