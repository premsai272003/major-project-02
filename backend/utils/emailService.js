const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to your email provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send email function
const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Email templates
const emailTemplates = {
    transactionNotification: (type, data) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; text-align: center;">New ${type} Added</h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>${type} Details:</strong></p>
                <p><strong>Source/Category:</strong> ${data.source || data.category}</p>
                <p><strong>Amount:</strong> ₹${data.amount}</p>
                <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
            </div>
            <p style="color: #666; text-align: center;">This is an automated notification from your Expense Tracker.</p>
        </div>
    `,

    dailySummary: (userName, incomeData, expenseData, date) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; text-align: center;">Daily Financial Summary</h2>
            <p>Hi ${userName},</p>
            <p>Here's your financial summary for ${date}:</p>

            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-top: 0;">Income</h3>
                <p><strong>Total Income:</strong> ₹${incomeData.total}</p>
                <p><strong>Transactions:</strong> ${incomeData.count}</p>
                ${incomeData.transactions.map(t => `<p>• ${t.source}: ₹${t.amount}</p>`).join('')}
            </div>

            <div style="background-color: #ffebee; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #c62828; margin-top: 0;">Expenses</h3>
                <p><strong>Total Expenses:</strong> ₹${expenseData.total}</p>
                <p><strong>Transactions:</strong> ${expenseData.count}</p>
                ${expenseData.transactions.map(t => `<p>• ${t.category}: ₹${t.amount}</p>`).join('')}
            </div>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Net Balance:</strong> ₹${(incomeData.total - expenseData.total).toFixed(2)}</p>
            </div>

            <p style="color: #666; text-align: center;">This is an automated daily summary from your Expense Tracker.</p>
        </div>
    `,

    monthlySummary: (userName, incomeData, expenseData, month, year) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; text-align: center;">Monthly Financial Summary</h2>
            <p>Hi ${userName},</p>
            <p>Here's your complete financial summary for ${month} ${year}:</p>

            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-top: 0;">Monthly Income</h3>
                <p><strong>Total Income:</strong> ₹${incomeData.total}</p>
                <p><strong>Transactions:</strong> ${incomeData.count}</p>
                <h4>Top Income Sources:</h4>
                ${incomeData.topSources.map(s => `<p>• ${s.source}: ₹${s.amount}</p>`).join('')}
            </div>

            <div style="background-color: #ffebee; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #c62828; margin-top: 0;">Monthly Expenses</h3>
                <p><strong>Total Expenses:</strong> ₹${expenseData.total}</p>
                <p><strong>Transactions:</strong> ${expenseData.count}</p>
                <h4>Top Expense Categories:</h4>
                ${expenseData.topCategories.map(c => `<p>• ${c.category}: ₹${c.amount}</p>`).join('')}
            </div>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Monthly Overview</h3>
                <p><strong>Net Balance:</strong> ₹${(incomeData.total - expenseData.total).toFixed(2)}</p>
                <p><strong>Savings Rate:</strong> ${incomeData.total > 0 ? ((1 - expenseData.total / incomeData.total) * 100).toFixed(1) : 0}%</p>
            </div>

            <p style="color: #666; text-align: center;">This is an automated monthly summary from your Expense Tracker.</p>
        </div>
    `
};

module.exports = {
    sendEmail,
    emailTemplates
};
