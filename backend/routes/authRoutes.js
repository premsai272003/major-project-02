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
router.post("/upload-image", protect, upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { profileImageUrl: imageUrl },
            { new: true }
        ).select("-password");

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: `${req.protocol}://${req.get("host")}${imageUrl}`,
            user,
        });
    } catch (error) {
        res.status(500).json({ message: "Error saving image", error: error.message });
    }
});

module.exports = router;
