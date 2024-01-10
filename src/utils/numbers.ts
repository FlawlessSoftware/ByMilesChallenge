export const formatCurrency = (amount: string) => {
  // Convert the string amount to a number first
  const numberAmount = parseFloat(amount);

  // Use the browser's Intl.NumberFormat API to format the currency
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(numberAmount);
};
