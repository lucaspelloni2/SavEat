export default async (path: string) => {
  const response = await fetch(`https://makachange.herokuapp.com${path}`);
  const json = await response.json();
  if (json.success) {
    return json.data;
  }
  throw new Error(json.error)
};
