// import { NextResponse } from 'next/server';
// import { headers } from 'next/headers';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   try {
//     const headersList = await headers();
//     const origin = headersList.get('origin'); 
//     const body = await req.json();
    
//     const { bookingId, title, price, quantity } = body;

//     const validPrice = parseFloat(price) || 0;
//     const validQuantity = parseInt(quantity) || 1;


//     const finalPrice = validPrice <= 0 ? 100 : validPrice;


//     const lineObj = {
//       price_data: {
//         currency: 'bdt', // বাংলাদেশী টাকা (BDT)
//         // স্ট্রাইপ পয়সায় হিসাব করে, তাই ১০০ দিয়ে গুণ এবং পারফেক্টলি রাউন্ড করা হলো
//         unit_amount: Math.round(finalPrice * 100), 
//         product_data: {
//           name: title || "Ticket Booking", // টিকেট টাইটেল না থাকলে ডিফল্ট নাম
//         },
//       },
//       quantity: validQuantity, // বুকিং কোয়ান্টিটি
//     };

//     // ২. পেমেন্ট শেষে ট্র্যাকিং করার জন্য মেটাডেটা
//     const metaObj = {
//       bookingId: bookingId || '',
//       ticketTitle: title || '',
//       amount: (finalPrice * validQuantity).toFixed(2),
//       quantity: validQuantity.toString(),
//     };

//     // ৩. পেমেন্ট সফল বা ক্যানসেল হলে ইউজার কুয়েরি প্যারামিটারসহ বুকড টিকিট পেজে ফেরত যাবে
//     const successUrl = `${origin}/dashboard/user/booked-tickets?success=true&bookingId=${bookingId}`;
//     const cancelUrl = `${origin}/dashboard/user/booked-tickets?cancel=true`;

//     // ৪. স্ট্রাইপ সেশন তৈরি
//     const session = await stripe.checkout.sessions.create({
//       line_items: [lineObj],
//       metadata: metaObj,
//       mode: 'payment', // ওয়ান-টাইম ডাইনামিক পেমেন্ট
//       success_url: successUrl,
//       cancel_url: cancelUrl,
//     });

//     // স্ট্রাইপ পেমেন্ট পেজের ইউআরএল রিটার্ন করা
//     return NextResponse.json({ url: session.url });
//   } catch (err) {
//     console.error("Stripe Session Error: ", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin'); 
    const body = await req.json();
    
    const { bookingId, title, price, quantity } = body;

    const validPrice = parseFloat(price) || 0;
    const validQuantity = parseInt(quantity) || 1;

    // স্ট্রাইপ এর নিয়ম অনুযায়ী অ্যামাউন্ট কম হলে এরর দেখাবে, 
    // তাই সর্বনিম্ন প্রাইস এখানে সেট করে দিচ্ছি।
    const finalPrice = validPrice <= 0 ? 1 : validPrice; 

    const lineObj = {
      price_data: {
        currency: 'usd', // এখানে 'bdt' এর পরিবর্তে 'usd' ব্যবহার করুন
        // Stripe সেন্টে হিসাব করে, তাই ডলারের অ্যামাউন্টকে ১০০ দিয়ে গুণ করা হলো
        unit_amount: Math.round(finalPrice * 100), 
        product_data: {
          name: title || "Ticket Booking",
        },
      },
      quantity: validQuantity,
    };

    const metaObj = {
      bookingId: bookingId || '',
      ticketTitle: title || '',
      amount: (finalPrice * validQuantity).toFixed(2),
      quantity: validQuantity.toString(),
    };

    const successUrl = `${origin}/dashboard/user/booked-tickets?success=true&bookingId=${bookingId}`;
    const cancelUrl = `${origin}/dashboard/user/booked-tickets?cancel=true`;

    const session = await stripe.checkout.sessions.create({
      line_items: [lineObj],
      metadata: metaObj,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Session Error: ", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}