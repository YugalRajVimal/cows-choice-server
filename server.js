const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
// const connectDB = require("./config/db"); // 🔸 Uncomment agar MongoDB connect karna ho
const formRoutes = require("./routes/FormRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5050;

// ==============================
// 🔸 MongoDB Connection (optional)
// ==============================
// connectDB();

// ==============================
// Enable CORS
// ==============================
const allowedOrigins = [
  // "http://localhost:5173",
  "https://cowschoice.com",
  "https://www.cowschoice.com",
  "https://dairy-products-mvxa.onrender.com/"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ==============================
// Middleware
// ==============================
app.use(bodyParser.json());

// ==============================
// Routes
// ==============================
app.use("/api/form", formRoutes);
 
// ✅ Optional: Root route for testing
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// ==============================
// Error Handler Middleware
// ==============================
app.use(errorHandler);

// ==============================
// Start Server
// ==============================
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
