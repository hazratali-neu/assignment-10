'use server'
const baseURL = process.env.NEXT_PUBLIC_URL;
export const addTicket = async (data) => {
  const resData = await serverMutation('/api/addticket', 'POST', data);
  return resData;
};

export const getTicketsByVendor = async (email) => {
  if (!email) return [];
 
  const res = await fetch(`${baseURL}/api/addticket?email=${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });
  return res.json();
};
export const serverMutation = async (path, method, data) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getApprovedTickets = async () => {
  const res = await fetch(`${baseURL}/api/admin/tickets/approved`, { cache: 'no-store' });
  return res.json();
};
export const toggleAdvertiseTicket = async (id, isAdvertised) => {
  const res = await fetch(`${baseURL}/api/admin/tickets/advertise/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isAdvertised }),
  });
  return res.json();
};