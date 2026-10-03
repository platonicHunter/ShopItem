export const calculateInterest = (
  price: number,
  percentage: number,
): number => {
  if (isNaN(price) || price < 0) return 0;
  const increasedPrice = price * (1 + percentage / 100);
  return Number(increasedPrice.toFixed(2));
};
