const xlsx = require("xlsx");
const Income = require("../models/Income");
const User = require("../models/User");
const mongoose = require("mongoose");
const { sendEmail, emailTemplates } = require("../utils/emailService");

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    try {
        const { icon, source, amount, date } = req.body;

        // validation: check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required"});
        }

        const newIncome = new Income({
    userId: userObjectId,
    icon,
    source,
    amount,
    date: new Date(date)
});

        await newIncome.save();

        // Send email notification
        try {
            const user = await User.findById(userObjectId);
            if (user && user.email) {
                const subject = "New Income Added";
                const html = emailTemplates.transactionNotification("Income", {
                    source: newIncome.source,
                    amount: newIncome.amount,
                    date: newIncome.date
                });
                await sendEmail(user.email, subject, html);
            }
        } catch (emailError) {
            console.error("Error sending income notification email:", emailError);
            // Don't fail the request if email fails
        }

        res.status(200).json(newIncome);

    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
};

//Get All Income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    const userObjectId = new mongoose.Types.ObjectId(userId); // <-- ADDED (only change)

    try {
        const income = await Income.find({ userId: userObjectId }).sort({ date: -1 }); // <-- CHANGED: query by ObjectId
        res.json(income);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//Delete Income Source
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfuly" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//Download Income Source
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    const userObjectId = new mongoose.Types.ObjectId(userId); // <-- ADDED (only change)

    try {
        const income = await Income.find({ userId: userObjectId }).sort({ date: -1 }); // <-- CHANGED: query by ObjectId

        // Prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    }
    catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
};
