
const baseURL=process.env.NEXT_PUBLIC_URL;

export const serverMutation = async (path, method, data) => {
  //   console.log(data);

  const res = await fetch(`${baseURL}${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};