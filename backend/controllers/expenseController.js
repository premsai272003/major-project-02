const xlsx = require("xlsx");
const Expense = require("../models/Expense");
const User = require("../models/User");
const mongoose = require("mongoose");
const { sendEmail, emailTemplates } = require("../utils/emailService");

// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    try {
        const { icon, category, amount, date } = req.body;

        // validation: check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required"});
        }

        const newExpense = new Expense({
            userId: userObjectId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();

        // Send email notification
        try {
            const user = await User.findById(userObjectId);
            if (user && user.email) {
                const subject = "New Expense Added";
                const html = emailTemplates.transactionNotification("Expense", {
                    category: newExpense.category,
                    amount: newExpense.amount,
                    date: newExpense.date
                });
                await sendEmail(user.email, subject, html);
            }
        } catch (emailError) {
            console.error("Error sending expense notification email:", emailError);
            // Don't fail the request if email fails
        }

        res.status(200).json(newExpense);

    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
};

// Get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    try {
        const expense = await Expense.find({ userId: userObjectId }).sort({ date: -1 });
        res.json(expense);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Download Expense Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    try {
        const expense = await Expense.find({ userId: userObjectId }).sort({ date: -1 });

        // Prepare data for excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }
    catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
};
