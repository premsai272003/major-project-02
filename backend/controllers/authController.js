const User = require('../models/User');
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, phoneNumber, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Full name, email, and password are required" });
    }

    try {
        // Check if email already exists
        const existingEmailUser = await User.findOne({ email });
        if (existingEmailUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Check if phone number already exists
        if (phoneNumber) {
            const existingPhoneUser = await User.findOne({ phoneNumber });
            if (existingPhoneUser) {
                return res.status(400).json({ message: "Phone number already in use" });
            }
        }

        // Save user
        const user = await User.create({
            fullName,
            email,
            phoneNumber: phoneNumber || null,
            password,
            profileImageUrl: profileImageUrl || null, // optional
        });

        // If profileImageUrl is provided, construct full URL
        if (user.profileImageUrl) {
            user.profileImageUrl = `${req.protocol}://${req.get("host")}${user.profileImageUrl}`;
        } else {
            user.profileImageUrl = null;
        }

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, phoneNumber, password } = req.body;

    if (!password || (!email && !phoneNumber)) {
        return res.status(400).json({ message: "Password and either email or phone number are required" });
    }

    try {
        const user = await User.findOne({
            $or: [
                { email: email || null },
                { phoneNumber: phoneNumber || null }
            ]
        });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // If profileImageUrl exists, construct full URL
        if (user.profileImageUrl) {
            user.profileImageUrl = `${req.protocol}://${req.get("host")}${user.profileImageUrl}`;
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};

// Get User Info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If profileImageUrl exists, construct full URL
        if (user.profileImageUrl) {
            user.profileImageUrl = `${req.protocol}://${req.get("host")}${user.profileImageUrl}`;
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user info", error: err.message });
    }
};
