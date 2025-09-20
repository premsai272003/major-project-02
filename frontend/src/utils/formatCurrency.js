// src/utils/formatCurrency.js
export const formatCurrency = (amount) => {
  if (!amount) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // no decimals
  }).format(amount);
};
