const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getDashboardData, downloadTransactions } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", protect, getDashboardData);
router.get("/download", protect, downloadTransactions);

module.exports = router;
