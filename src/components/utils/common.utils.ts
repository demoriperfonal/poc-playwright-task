export function formatCurrency(amount: string) {
    const num = parseFloat(amount);
    if (isNaN(num)) {
        return 'Invalid amount';
    }
    const formattedAmount = num.toFixed(2);
    return '$' + formattedAmount;
}