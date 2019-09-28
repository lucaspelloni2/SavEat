export default async (path: string) => {
  const response = await fetch(`http://localhost:9000${path}`);
  const json = await response.json();
  if (json.success) {
    return json.data;
  }
  throw new Error(json.error)
};
