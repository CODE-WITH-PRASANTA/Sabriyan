require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
 
const app = express();

// Route Imports
const honeyProductRoutes = require('./routes/honeyProductRoutes');
const testimonialRoutes = require("./routes/testimonialRoutes");
const customerRoutes = require("./routes/customerRoutes");
const premiumCollectionRoutes = require("./routes/premiumCollectionRoutes");
const contactRoutes = require("./routes/contactRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const attributeRoutes = require("./routes/attributeRoutes");
const productRoutes = require("./routes/productRoutes");
const storeArticleRoutes = require("./routes/storeArticleRoutes");
const blogRoutes = require('./routes/blogRoutes')
const reviewRoutes = require('./routes/reviewRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const couponRoutes = require('./routes/couponRoutes');
const supportRoutes = require("./routes/supportRoutes");
const websiteSettingRoutes = require("./routes/websiteSettingRoutes");


// ======================
// Ensure Uploads Directory Exists
// ======================
const uploadsPath = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// ======================
// Middleware
// ======================
app.use(
  cors({
    origin: "*", // Adjust to specific origin (e.g., 'http://localhost:5173') if needed
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Static Folder for Uploads
app.use("/uploads", express.static(uploadsPath));

// ======================
// Test Route
// ======================
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// ======================
// MongoDB Connection
// ======================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
    console.log("📂 Database:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();

// ======================
// Routes
// ======================
app.use("/api/honey-products", honeyProductRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/premium-collection", premiumCollectionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/store-articles", storeArticleRoutes);
app.use(
  "/api/blog",
  blogRoutes
);
app.use('/api/reviews', reviewRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use("/api/support", supportRoutes);
app.use(
  "/api/website-settings",
  websiteSettingRoutes
);

// ======================
// 404 Route Handler
// ======================
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// ======================
// Global Error Handler
// ======================
app.use((err, req, res, next) => {
  console.error("💥 Global Server Error:", err.stack || err.message);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});