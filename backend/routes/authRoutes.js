const express = require('express');
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const User = require("../models/User");

const router = express.Router();

// Register & Login
router.post("/register", registerUser);
router.post("/login", loginUser);

// Get logged-in user info
router.get("/getUser", protect, getUserInfo);

// Upload profile image
router.post("/upload-image", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    try {
        // For signup, we don't have a user yet, so just return the image URL
        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: imageUrl,  // return relative path
        });
    } catch (error) {
        res.status(500).json({ message: "Error uploading image", error: error.message });
    }
});

module.exports = router;
