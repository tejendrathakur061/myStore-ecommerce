const currencyFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

const formatCurrency = (amount) => `₹${currencyFormatter.format(amount || 0)}`;

export default formatCurrency;
