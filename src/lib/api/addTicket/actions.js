// 'use server'

// import { serverMutation } from "../server";

// export const addTicket = async (data) => {
//   const resData = await serverMutation('/api/addticket', 'POST', data);
//   return resData;
// };

'use server'

const baseURL = process.env.NEXT_PUBLIC_URL;

// 🎫 টিকিট অ্যাড করার অ্যাকশন (আগে যা ছিল তাই)
export const addTicket = async (data) => {
  const resData = await serverMutation('/api/addticket', 'POST', data);
  return resData;
};

// 🔍 ভেন্ডর অনুযায়ী টিকিট গেট করার নতুন অ্যাকশন (🎯 FIXED)
export const getTicketsByVendor = async (email) => {
  if (!email) return [];
  // এখানে আমরা ইউআরএল-এর সাথে সুন্দর করে ইমেইল কুয়েরি পাঠিয়ে দিচ্ছি
  const res = await fetch(`${baseURL}/api/addticket?email=${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store' // রিয়েল-টাইম ডেটা পাওয়ার জন্য ক্যাশ বন্ধ রাখা হলো
  });
  return res.json();
};

// ⚙️ কমন সার্ভার মিউটেশন হেল্পার
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



// ১. অনুমোদিত টিকিট নিয়ে আসার ফাংশন
export const getApprovedTickets = async () => {
  const res = await fetch(`${baseURL}/api/admin/tickets/approved`, { cache: 'no-store' });
  return res.json();
};

// ২. অ্যাডভারটাইজ স্ট্যাটাস আপডেট করার ফাংশন
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