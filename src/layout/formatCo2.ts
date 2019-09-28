export default (gram: number): string => {
  if (gram < 1000) {
    return Math.floor(gram) + 'g';
  }
  return (gram / 1000).toFixed(2) + 'kg';
};
