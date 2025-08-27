require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const helmet = require("helmet");   // ✅ Added for security

const app = express();

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// ✅ Security middleware (recommended)
app.use(helmet());

// Body parser
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/v1/auth", authRoutes);

// Routes (example)
app.get("/", (req, res) => {
    res.send("API is running...");
});

// ✅ Error handling middleware (required for stability)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

/*
Purpose of this file:
- Load environment variables (dotenv)
- Setup Express server
- Enable CORS
- Secure app with Helmet
- Parse JSON requests
- Connect MongoDB using Mongoose
- Define routes
- Handle errors globally
- Start the server
*/
