const Review = require('../models/Review');

// Sabhi reviews fetch karna
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Naya review add karna
exports.createReview = async (req, res) => {
  try {
    const { customer, email, product, rating, title, review, status, productImg } = req.body;
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newReview = new Review({
      customer,
      email,
      avatar: customer ? customer.charAt(0).toUpperCase() : 'C',
      product,
      productImg: productImg || 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=80',
      rating: Number(rating),
      title,
      review,
      status: status || 'Approved',
      date: formattedDate,
      time: formattedTime
    });

    const savedReview = await newReview.save();
    res.status(201).json({ success: true, data: savedReview });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Review update karna
exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        avatar: req.body.customer ? req.body.customer.charAt(0).toUpperCase() : 'C',
        rating: Number(req.body.rating)
      },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Review delete karna
exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};