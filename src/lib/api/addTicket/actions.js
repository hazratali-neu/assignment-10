'use server'

import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_URL;

// সার্ভার মিউটেশন হেল্পার ফাংশন
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

export const addTicket = async (data) => {
 
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return { message: "Unauthorized: Please login first." };
  }

  if (session.user?.isFraud === true || session.user?.role === 'fraud') {
    return { message: "Access Denied: Your account is restricted from adding tickets." };
  }


  return await serverMutation('/api/addticket', 'POST', data);
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

export const updateUserRole = async (id, role) => {
  const res = await fetch(`${baseURL}/api/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  return res.json();
};

export const markAsFraud = async (id) => {
  const res = await fetch(`${baseURL}/api/admin/users/fraud/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
};

export const getAllUsers = async () => {
  const res = await fetch(`${baseURL}/api/users`, { cache: 'no-store' });
  return res.json();
};