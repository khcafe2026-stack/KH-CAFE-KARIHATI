export const toBanglaDigits = (num: number | string): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (digit) => banglaDigits[parseInt(digit)]);
};

export const formatBanglaPrice = (price: number): string => {
  return `৳${toBanglaDigits(Math.round(price))}`;
};
