const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");
const XLSX = require("xlsx");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
try {
 const userId = req.user.id;
 const userObjectId = new Types.ObjectId(String(userId));

 // Fetch total income and expenses
const totalIncome = await Income.aggregate([
{ $match: { userId: userObjectId } }, // This was correct
 { $group: { _id: null, total: { $sum: "$amount"} } },
 ]);

 const totalExpense = await Expense.aggregate([
 { $match: { userId: userObjectId } }, // This was correct
 { $group: { _id: null,total: { $sum: "$amount" } } },
 ]);

 // get income transactions in the last 60 days
 const last60DaysIncomeTransactions = await Income.find({
 userId: userObjectId, // <-- 1. FIX: Use userObjectId
 date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
 }).sort({ date: -1 });

 //get total income for last 60 days
 const incomeLast60Days = last60DaysIncomeTransactions.reduce(
 (sum, transaction) => sum + transaction.amount,
 0
 );

// get expense transations in the last 30 days
 const last30DaysExpenseTransactions = await Expense.find({
 userId: userObjectId, // <-- 2. FIX: Use userObjectId
date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
 }).sort({ date: -1 } );

// get total expenses for last 30 days
const expensesLast30Days = last30DaysExpenseTransactions.reduce(
(sum, transaction) => sum + transaction.amount,
0
 );

 // fetch last 5 transsactions (income + expenses)
const lastTransactions = [
...(await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map( // <-- 3. FIX: Use userObjectId
 (txn) => ({...txn.toObject(),
type: "income",
})
),
...(await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map( // <-- 4. FIX: Use userObjectId
(txn) => ({
 ...txn.toObject(),
type: "expense",
})
 ),
 ].sort((a, b) => new Date(b.date) - new Date(a.date)); //sort latest first (safer date sort)

// final response
res.json({
 totalBalance:
 (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
 totalIncome: totalIncome[0]?.total || 0,
totalExpense: totalExpense[0]?.total || 0,
last30DaysExpenses: {
 total: expensesLast30Days,
 transactions: last30DaysExpenseTransactions,
 },
last60DaysIncome: {
total: incomeLast60Days,
transactions: last60DaysIncomeTransactions,
 },
 recentTransactions: lastTransactions.slice(0, 5), // Ensure only 5 are sent
 });
 } catch (error) {
console.error("Dashboard Error:", error); // Log the error
 res.status(500).json({ message: "Server error" }); // Sanitize error response
 }
}

// Download Transactions
exports.downloadTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the entire end date

    // Fetch income transactions
    const incomes = await Income.find({
      userId: userObjectId,
      date: { $gte: start, $lte: end }
    }).sort({ date: 1 });

    // Fetch expense transactions
    const expenses = await Expense.find({
      userId: userObjectId,
      date: { $gte: start, $lte: end }
    }).sort({ date: 1 });

    // Prepare data for Excel
    const incomeData = incomes.map(income => ({
      Date: income.date.toISOString().split('T')[0],
      Type: 'Income',
      Category: income.source,
      Amount: income.amount,
      Icon: income.icon || '',
    }));

    const expenseData = expenses.map(expense => ({
      Date: expense.date.toISOString().split('T')[0],
      Type: 'Expense',
      Category: expense.category,
      Amount: expense.amount,
      Icon: expense.icon || '',
    }));

    const allTransactions = [...incomeData, ...expenseData].sort((a, b) => new Date(a.Date) - new Date(b.Date));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(allTransactions);

    // Set column widths
    ws['!cols'] = [
      { wch: 12 }, // Date
      { wch: 10 }, // Type
      { wch: 20 }, // Category
      { wch: 12 }, // Amount
      { wch: 10 }, // Icon
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Transactions");

    // Generate buffer
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // Set headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=transactions_${startDate}_to_${endDate}.xlsx`);

    res.send(buffer);
  } catch (error) {
    console.error("Download Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
