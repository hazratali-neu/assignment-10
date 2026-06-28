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

    const finalPrice = validPrice <= 0 ? 1 : validPrice; 

    const lineObj = {
      price_data: {
        currency: 'usd', 
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