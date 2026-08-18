require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const honeyProductRoutes = require("./routes/honeyProductRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const customerRoutes = require("./routes/customerRoutes");
const premiumCollectionRoutes = require("./routes/premiumCollectionRoutes");
const contactRoutes = require("./routes/contactRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const attributeRoutes = require("./routes/attributeRoutes");
const productRoutes = require("./routes/productRoutes");
const blogRoutes = require("./routes/blogRoutes");
// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

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
app.use("/api/blogs", blogRoutes);
// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});