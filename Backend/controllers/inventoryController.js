const Inventory = require('../models/Inventory');

// सभी आइटम्स प्राप्त करें
exports.getItems = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// नया आइटम जोड़ें
exports.createItem = async (req, res) => {
  try {
    const { name, sku, category, unit, stock, lowStock, cost, expiry, supplier, notes, img } = req.body;
    
    const stockNum = parseInt(stock) || 0;
    const lowStockNum = parseInt(lowStock) || 0;
    const status = stockNum <= lowStockNum ? 'Low Stock' : 'In Stock';

    const newItem = new Inventory({
      name,
      sku,
      category,
      unit,
      stock: stockNum,
      lowStock: lowStockNum,
      cost,
      expiry: expiry || '31 Dec 2026',
      supplier,
      notes,
      status,
      img: img || 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=60'
    });

    const savedItem = await newItem.save();
    res.status(201).json({ success: true, data: savedItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// आइटम अपडेट करें
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, category, unit, stock, lowStock, cost, expiry, supplier, notes } = req.body;

    const stockNum = parseInt(stock) || 0;
    const lowStockNum = parseInt(lowStock) || 0;
    const status = stockNum <= lowStockNum ? 'Low Stock' : 'In Stock';

    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      {
        name,
        sku,
        category,
        unit,
        stock: stockNum,
        lowStock: lowStockNum,
        cost,
        expiry,
        supplier,
        notes,
        status
      },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// आइटम डिलीट करें
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Inventory.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};