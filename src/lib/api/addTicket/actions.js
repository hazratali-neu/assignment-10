'use server'

import { serverMutation } from "../server";

export const addTicket = async (data) => {
  const resData = await serverMutation('/api/addticket', 'POST', data);
  return resData;
};