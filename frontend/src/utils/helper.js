import moment from 'moment'; // Required for date formatting in charts

// ===================================
// USER & AUTH HELPERS
// ===================================

export const validateEmail = (email) => {
 const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return regex.test(email);
};

export const getInitials = (name) => {
 if (!name) return "";

 const words = name.split(" ");
 let initials = "";

 // Take maximum 2 initials
 for (let i = 0; i < Math.min(words.length, 2); i++) {
 initials += words[i][0];
 }

 return initials.toUpperCase();
};

// ===================================
// FORMATTING HELPERS
// ===================================

export const addThousandsSeparator = (num) => {
 if (num == null || isNaN(num)) return "";

 const [integerPart, fractionalPart] = num.toString().split(".");
 const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

 return fractionalPart
 ? `${formattedInteger}.${fractionalPart}`
 : formattedInteger;
};

// ===================================
// CHART DATA HELPERS
// ===================================

/**
 * NOTE: This function can be replaced by the more generic 'prepareBarChartData' 
 * if you pass the key as 'category'. Keeping it for now.
 */
export const prepareExpenseBarChartData = (data = []) => {
 const chartData = data.map((item) => ({
 category: item?.category,
 amount: item?.amount,
 }));

 return chartData;
};

/**
* Groups transactions by category/source and sums their amounts.
* Used for Bar Charts (Income or Expense).
* @param {Array} transactions - The list of income or expense objects.
* @param {string} key - The key to group by (e.g., "source" for income or "category" for expense).
*/
export const prepareBarChartData = (transactions = [], key = "category") => {
 const categoryMap = new Map();

 transactions.forEach((item) => {
 const name = item[key] || "Other";
 const amount = Number(item.amount) || 0;

 if (categoryMap.has(name)) {
 categoryMap.set(name, categoryMap.get(name) + amount);
} else {
 categoryMap.set(name, amount);
 }
 });

 // Convert map to array format for Recharts
 return Array.from(categoryMap, ([name, amount]) => ({
 name, // Renamed key to 'name' for better Recharts compatibility
 amount,
 }));
};

/**
* Groups transactions by date and sums their amounts.
* Used for the Line Chart.
* @param {Array} transactions - The list of expense or income objects.
*/
export const prepareLineChartData = (transactions = []) => {
 const dateMap = new Map();

 // Sort by date first
 const sortedTransactions = [...transactions].sort((a, b) =>
 new Date(a.date) - new Date(b.date)
 );

 sortedTransactions.forEach((item) => {
 // Format date to a readable string like "12 Nov"
 const date = moment(item.date).format("DD MMM");
 const amount = Number(item.amount) || 0;

 if (dateMap.has(date)) {
 dateMap.set(date, dateMap.get(date) + amount);
 } else {
 dateMap.set(date, amount);
 }
 });

 // Convert map to array format for Recharts
 return Array.from(dateMap, ([date, amount]) => ({
 date,
 amount,
 }));
};

// ===================================
// FILE EXPORT HELPERS
// ===================================

/**
* Exports an array of objects to a CSV file.
* @param {Array} data - Array of objects.
* @param {string} filename - The name of the file to download.
*/
export const exportToCSV = (data, filename) => {
 if (data.length === 0) return;

 const csvRows = [];
 // Get headers
 const headers = Object.keys(data[0]);
 csvRows.push(headers.join(','));

 // Get values
 for (const row of data) {
 const values = headers.map(header => {
 const escaped = ('' + row[header]).replace(/"/g, '\\"');
 return `"${escaped}"`;
 });
 csvRows.push(values.join(','));
 }

 const csvString = csvRows.join('\n');
 const blob = new Blob([csvString], { type: 'text/csv' });
 const url = URL.createObjectURL(blob);

 const a = document.createElement('a');
 a.setAttribute('hidden', '');
 a.setAttribute('href', url);
 a.setAttribute('download', filename);

 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
};