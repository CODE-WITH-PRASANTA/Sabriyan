const Campaign = require("../models/Campaign");

// Get all campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching campaigns' });
  }
};

// Create campaign
exports.createCampaign = async (req, res) => {
  try {
    const { name, desc, type, channel, startDate, endDate, budget, status } = req.body;
    
    let thumbnail = req.body.thumbnail;
    if (req.file && req.file.destinationPath) {
      thumbnail = `${req.protocol}://${req.get('host')}${req.file.destinationPath}`;
    }

    const duration = startDate && endDate ? `${startDate} - ${endDate}` : 'May 20, 2025 - Jun 10, 2025';
    const formattedBudget = budget && !budget.startsWith('₹') ? `₹${budget}` : budget;

    const newCampaign = new Campaign({
      name,
      desc,
      type,
      channel,
      duration,
      startDate,
      endDate,
      budget: formattedBudget || '₹2,000',
      reach: '0',
      status: status || 'Scheduled',
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=80'
    });

    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
};

// Update campaign
exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file && req.file.destinationPath) {
      updateData.thumbnail = `${req.protocol}://${req.get('host')}${req.file.destinationPath}`;
    }

    if (updateData.startDate && updateData.endDate) {
      updateData.duration = `${updateData.startDate} - ${updateData.endDate}`;
    }

    if (updateData.budget && !updateData.budget.startsWith('₹')) {
      updateData.budget = `₹${updateData.budget}`;
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCampaign) return res.status(404).json({ error: 'Campaign not found' });

    res.status(200).json(updatedCampaign);
  } catch (error) {
    console.error('Failed to update campaign:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
};

// Delete campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Campaign.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Campaign not found' });
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
};