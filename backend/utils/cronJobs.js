const cron = require('node-cron');
const User = require('../models/User');
const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { sendEmail, emailTemplates } = require('./emailService');

// Daily summary job - runs at 8 PM every day
const scheduleDailySummary = () => {
    cron.schedule('0 20 * * *', async () => {
        console.log('Running daily summary job...');

        try {
            const users = await User.find({});
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const today = new Date();
            today.setHours(23, 59, 59, 999);

            for (const user of users) {
                try {
                    // Get yesterday's income
                    const incomeTransactions = await Income.find({
                        userId: user._id,
                        date: { $gte: yesterday, $lte: today }
                    });

                    // Get yesterday's expenses
                    const expenseTransactions = await Expense.find({
                        userId: user._id,
                        date: { $gte: yesterday, $lte: today }
                    });

                    const incomeData = {
                        total: incomeTransactions.reduce((sum, t) => sum + t.amount, 0),
                        count: incomeTransactions.length,
                        transactions: incomeTransactions.slice(0, 5) // Top 5 transactions
                    };

                    const expenseData = {
                        total: expenseTransactions.reduce((sum, t) => sum + t.amount, 0),
                        count: expenseTransactions.length,
                        transactions: expenseTransactions.slice(0, 5) // Top 5 transactions
                    };

                    // Only send email if there are transactions
                    if (incomeData.count > 0 || expenseData.count > 0) {
                        const subject = `Daily Financial Summary - ${yesterday.toLocaleDateString()}`;
                        const html = emailTemplates.dailySummary(
                            user.fullName,
                            incomeData,
                            expenseData,
                            yesterday.toLocaleDateString()
                        );

                        await sendEmail(user.email, subject, html);
                        console.log(`Daily summary sent to ${user.email}`);
                    }
                } catch (error) {
                    console.error(`Error sending daily summary to ${user.email}:`, error);
                }
            }
        } catch (error) {
            console.error('Error in daily summary job:', error);
        }
    });
};

// Monthly summary job - runs on the 1st of every month at 9 AM
const scheduleMonthlySummary = () => {
    cron.schedule('0 9 1 * *', async () => {
        console.log('Running monthly summary job...');

        try {
            const users = await User.find({});
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            const firstDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
            const lastDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0, 23, 59, 59, 999);

            for (const user of users) {
                try {
                    // Get last month's income
                    const incomeTransactions = await Income.find({
                        userId: user._id,
                        date: { $gte: firstDayOfLastMonth, $lte: lastDayOfLastMonth }
                    });

                    // Get last month's expenses
                    const expenseTransactions = await Expense.find({
                        userId: user._id,
                        date: { $gte: firstDayOfLastMonth, $lte: lastDayOfLastMonth }
                    });

                    // Calculate totals
                    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
                    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

                    // Get top income sources
                    const incomeBySource = {};
                    incomeTransactions.forEach(t => {
                        incomeBySource[t.source] = (incomeBySource[t.source] || 0) + t.amount;
                    });
                    const topIncomeSources = Object.entries(incomeBySource)
                        .map(([source, amount]) => ({ source, amount }))
                        .sort((a, b) => b.amount - a.amount)
                        .slice(0, 5);

                    // Get top expense categories
                    const expenseByCategory = {};
                    expenseTransactions.forEach(t => {
                        expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
                    });
                    const topExpenseCategories = Object.entries(expenseByCategory)
                        .map(([category, amount]) => ({ category, amount }))
                        .sort((a, b) => b.amount - a.amount)
                        .slice(0, 5);

                    const incomeData = {
                        total: totalIncome,
                        count: incomeTransactions.length,
                        topSources: topIncomeSources
                    };

                    const expenseData = {
                        total: totalExpenses,
                        count: expenseTransactions.length,
                        topCategories: topExpenseCategories
                    };

                    // Always send monthly summary
                    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                                      'July', 'August', 'September', 'October', 'November', 'December'];
                    const subject = `Monthly Financial Summary - ${monthNames[lastMonth.getMonth()]} ${lastMonth.getFullYear()}`;
                    const html = emailTemplates.monthlySummary(
                        user.fullName,
                        incomeData,
                        expenseData,
                        monthNames[lastMonth.getMonth()],
                        lastMonth.getFullYear()
                    );

                    await sendEmail(user.email, subject, html);
                    console.log(`Monthly summary sent to ${user.email}`);
                } catch (error) {
                    console.error(`Error sending monthly summary to ${user.email}:`, error);
                }
            }
        } catch (error) {
            console.error('Error in monthly summary job:', error);
        }
    });
};

// Initialize all cron jobs
const initCronJobs = () => {
    scheduleDailySummary();
    scheduleMonthlySummary();
    console.log('Cron jobs initialized successfully');
};

module.exports = {
    initCronJobs
};
