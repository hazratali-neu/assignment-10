
export const getFetchAddticketData = async (email) => {
  const url = email 
    ? `${process.env.NEXT_PUBLIC_URL}/api/addticket?email=${email}`
    : `${process.env.NEXT_PUBLIC_URL}/api/addticket`;
    
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
};

