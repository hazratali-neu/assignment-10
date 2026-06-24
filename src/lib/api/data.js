
export const getFetchData=async()=>{
   const res=await fetch(`${process.env.NEXT_PUBLIC_URL}/tickets/latest`)
   return res.json();
}
// ২. সব অ্যাডেড টিকিট আনার জন্য (নতুন ফাংশন)
export const getFetchAddticketData = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:8000';
    
    const res = await fetch(`${baseUrl}/api/addticket`, {
        cache: 'no-store' // যাতে প্রতিবার ডাটাবেজ থেকে একদম ফ্রেশ ডেটা আসে
    });

    if (!res.ok) {
        throw new Error('Failed to fetch addticket data');
    }
    return res.json();
};