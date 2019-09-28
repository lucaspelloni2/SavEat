export default (gram: number): string => {
  const shade = Math.min(700, gram) / 700;
  const hue = ((1 - Math.min(1, shade * 2)) * 120).toString(10);
  return 'hsl(' + hue + ',100%,' + 40 + '%)';
};
