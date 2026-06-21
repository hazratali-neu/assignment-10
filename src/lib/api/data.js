
export const getFetchData=async()=>{
   const res=await fetch(`${process.env.NEXT_PUBLIC_URL}/tickets/latest`)
   return res.json();
}