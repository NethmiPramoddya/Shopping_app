// Currency conversion utilities for Sri Lankan Rupees

// Current exchange rate (you can update this or fetch from an API)
const USD_TO_LKR_RATE = 300; // Approximate rate - you can update this as needed

/**
 * Convert USD to Sri Lankan Rupees
 * @param {number} usdAmount - Amount in USD
 * @returns {number} - Amount in LKR
 */
export const convertUsdToLkr = (usdAmount) => {
  return Math.round(usdAmount * USD_TO_LKR_RATE);
};

/**
 * Convert LKR to USD (for backwards compatibility)
 * @param {number} lkrAmount - Amount in LKR
 * @returns {number} - Amount in USD
 */
export const convertLkrToUsd = (lkrAmount) => {
  return Math.round((lkrAmount / USD_TO_LKR_RATE) * 100) / 100;
};

/**
 * Format price in Sri Lankan Rupees (assumes amount is already in LKR)
 * @param {number} amount - Amount in LKR to format
 * @param {boolean} showCurrency - Whether to show currency symbol
 * @returns {string} - Formatted price string
 */
export const formatLkrPrice = (amount, showCurrency = true) => {
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return showCurrency ? `Rs. ${formattedAmount}` : formattedAmount;
};

/**
 * Format price in USD (for reference or admin views)
 * @param {number} amount - Amount to format
 * @param {boolean} showCurrency - Whether to show currency symbol
 * @returns {string} - Formatted price string
 */
export const formatUsdPrice = (amount, showCurrency = true) => {
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return showCurrency ? `$${formattedAmount}` : formattedAmount;
};

/**
 * Get current exchange rate
 * @returns {number} - Current USD to LKR exchange rate
 */
export const getExchangeRate = () => {
  return USD_TO_LKR_RATE;
};

/**
 * Update exchange rate (for admin functionality)
 * @param {number} newRate - New exchange rate
 */
export const updateExchangeRate = (newRate) => {
  // In a real application, you might want to store this in localStorage or send to backend
  console.log(`Exchange rate updated to: 1 USD = ${newRate} LKR`);
  // USD_TO_LKR_RATE = newRate; // Note: This won't persist in current implementation
};

export default {
  convertUsdToLkr,
  convertLkrToUsd,
  formatLkrPrice,
  formatUsdPrice,
  getExchangeRate,
  updateExchangeRate
};