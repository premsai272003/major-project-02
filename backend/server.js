require("dotnev"),config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// Connect to MongoDB
// the purpos eof this file is to connect the server with the database
// and to start the server
// we are using mongoose to connect to the mongodb database
// we are using dotenv to manage the environment variables
// we are using express to create the server