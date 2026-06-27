'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authClient } from "@/lib/auth-client";

const BookingCard = ({ booking, onPayNow }) => {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

    useEffect(() => {
        if (!booking?.departureDateTime) return;

        const timer = setInterval(() => {
            const departureTime = new Date(booking.departureDateTime).getTime();
            const now = new Date().getTime();
            const difference = departureTime - now;

            if (difference <= 0) {
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
                clearInterval(timer);
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setCountdown({ days, hours, minutes, seconds, isExpired: false });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [booking]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'paid': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
            case 'accepted': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
            case 'rejected': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
            default: return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
        }
    };

    return (
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden flex flex-col justify-between transition-all hover:scale-[1.01]">
            <div>
                <div className="relative h-48 w-full bg-slate-950">
                    <img src={booking.image} alt={booking.title} className="w-full h-full object-cover brightness-90" />
                    <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                    </span>
                </div>

                <div className="p-5">
                    <h3 className="text-xl font-black text-white uppercase tracking-wide mb-3">{booking.title}</h3>
                    
                    <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-xl mb-4 flex justify-between items-center text-xs font-bold">
                        <div>
                            <p className="text-[9px] text-slate-500 uppercase">From</p>
                            <span className="text-teal-400 capitalize">{booking.fromLocation}</span>
                        </div>
                        <div className="text-slate-600">➔</div>
                        <div className="text-right">
                            <p className="text-[9px] text-slate-500 uppercase">To</p>
                            <span className="text-emerald-400 capitalize">{booking.toLocation}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div className="bg-slate-950/30 p-2.5 rounded-lg border border-slate-800/60">
                            <p className="text-slate-500 mb-0.5">Quantity</p>
                            <span className="text-sm font-bold text-white">{booking.bookingQuantity} Seats</span>
                        </div>
                        <div className="bg-slate-950/30 p-2.5 rounded-lg border border-slate-800/60">
                            <p className="text-slate-500 mb-0.5">Total Price</p>
                            <span className="text-sm font-black text-emerald-400">৳{booking.totalPrice}</span>
                        </div>
                    </div>

                    <div className="text-[11px] text-slate-400 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 mb-4">
                        <span className="text-slate-500 font-medium block uppercase tracking-wider mb-0.5">Departure Time</span>
                        {new Date(booking.departureDateTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                </div>
            </div>

            <div className="p-5 pt-0">
                <div className="mb-4 border-t border-slate-800/60 pt-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 text-center">Time Remaining</p>
                    {countdown.isExpired ? (
                        <span className="text-xs font-bold text-rose-400 block text-center bg-rose-500/5 py-1.5 rounded-lg border border-rose-500/10">
                            DEPARTED
                        </span>
                    ) : (
                        <div className="grid grid-cols-4 gap-1 text-center bg-slate-950 p-2 rounded-xl border border-slate-800">
                            <div><span className="text-sm font-black text-white block">{countdown.days}</span><span className="text-[8px] text-slate-500 uppercase">Days</span></div>
                            <div><span className="text-sm font-black text-white block">{countdown.hours}</span><span className="text-[8px] text-slate-500 uppercase">Hrs</span></div>
                            <div><span className="text-sm font-black text-white block">{countdown.minutes}</span><span className="text-[8px] text-slate-500 uppercase">Min</span></div>
                            <div><span className="text-sm font-black text-white block">{countdown.seconds}</span><span className="text-[8px] text-slate-500 uppercase">Sec</span></div>
                        </div>
                    )}
                </div>

                {booking.status === 'accepted' && !countdown.isExpired && (
                    <button
                        onClick={() => onPayNow(booking)}
                        className="w-full py-3 bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 rounded-xl font-black text-xs tracking-wider uppercase shadow-lg hover:opacity-95 transition-all"
                    >
                        Pay Now (৳{booking.totalPrice})
                    </button>
                )}
                {booking.status === 'pending' && (
                    <button disabled className="w-full py-3 bg-slate-800 border border-slate-700/60 text-slate-500 rounded-xl font-bold text-xs tracking-wider uppercase cursor-not-allowed italic">
                        Waiting for Approval
                    </button>
                )}
                {booking.status === 'paid' && (
                    <button disabled className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-bold text-xs tracking-wider uppercase cursor-not-allowed">
                        Paid & Booked ✓
                    </button>
                )}
                {booking.status === 'rejected' && (
                    <button disabled className="w-full py-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl font-bold text-xs tracking-wider uppercase cursor-not-allowed">
                        Request Rejected
                    </button>
                )}
            </div>
        </div>
    );
};

const MyBookedTickets = () => {
    const { data: session } = authClient.useSession();
    const searchParams = useSearchParams();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        if (!session?.user?.email) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookings?email=${session?.user?.email}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setBookings(data);
            }
        } catch (error) {
            console.error("Error fetching user bookings:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (session?.user?.email) {
            fetchBookings();
        }
    }, [session]);

    useEffect(() => {
        const success = searchParams.get('success');
        const bookingId = searchParams.get('bookingId');

        if (success === 'true' && bookingId && bookings.length > 0) {
            const updateStatusAndSaveTransaction = async () => {
                try {
                 
                    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookings/update-status`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ bookingId, status: 'paid' })
                    });
                    
                   
                    const randomTxId = "tx_" + Math.random().toString(36).substr(2, 9).toUpperCase();
                    
              
                    const currentBooking = bookings.find(b => b._id === bookingId);

             
                    if (currentBooking && currentBooking.status !== 'paid') {
                        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/transactions`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                transactionId: randomTxId,
                                amount: currentBooking?.totalPrice || 0, 
                                ticketTitle: currentBooking?.title || "Ticket Booking",
                                userEmail: session?.user?.email
                            })
                        });

                        toast.success("Payment successful! Transaction History Created.", { theme: "dark" });
                        fetchBookings(); 
                    }
                } catch (err) {
                    console.error("Failed to process success redirection", err);
                }
            };
            updateStatusAndSaveTransaction();
        }
    }, [searchParams, session, bookings]);

    const handlePayNowFromCard = async (booking) => {
        try {
            const paymentPayload = {
                bookingId: booking._id,
                title: booking.title,
                price: booking.unitPrice, 
                quantity: booking.bookingQuantity
            };

            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentPayload)
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error(data.error || "Failed to create payment session.");
            }
        } catch (error) {
            console.error("Payment error from card:", error);
            toast.error("Stripe Connection Error!");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 py-10 px-4 md:px-8 text-slate-100">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-black uppercase tracking-wider text-white mb-2">My Booked Tickets</h1>
                <p className="text-slate-400 text-xs mb-8">Manage and review all your fleet ticket booking sessions</p>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-500 font-medium">
                        You havent booked any tickets yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <BookingCard 
                                key={booking._id} 
                                booking={booking} 
                                onPayNow={handlePayNowFromCard} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookedTickets;