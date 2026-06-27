

// export const getFetchAddticketData = async () => {
//     const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:8000';
    
//     const res = await fetch(`${baseUrl}/api/addticket`, {
//         cache: 'no-store' 
//     });

//     if (!res.ok) {
//         throw new Error('Failed to fetch addticket data');
//     }
//     return res.json();
// };

export const getFetchAddticketData = async (email) => {
  const url = email 
    ? `${process.env.NEXT_PUBLIC_URL}/api/addticket?email=${email}`
    : `${process.env.NEXT_PUBLIC_URL}/api/addticket`;
    
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
};

