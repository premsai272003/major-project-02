require("dotenv").config(); // Load .env variables at the very top
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const helmet = require("helmet");
const { initCronJobs } = require("./utils/cronJobs");

const app = express();

// Middleware: CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both common Vite ports
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Security middleware
app.use(helmet());

// Body parser
app.use(express.json());

// Connect to MongoDB
connectDB();

// Initialize cron jobs
initCronJobs();

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
