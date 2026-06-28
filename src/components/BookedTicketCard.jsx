'use client'
import React, { useState, useEffect } from 'react';

const BookedTicketCard = ({ ticket, onPayNow }) => {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

    useEffect(() => {
  
        if (!ticket?.departureDateTime || ticket.status === 'rejected') return;

        const timer = setInterval(() => {
            const departureTime = new Date(ticket.departureDateTime).getTime();
            const now = new Date().getTime();
            const difference = departureTime - now;

            if (difference <= 0) {
                setCountdown(prev => ({ ...prev, isExpired: true }));
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
    }, [ticket]);

    // স্ট্যাটাস কালার কোড
    const statusStyles = {
        pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        accepted: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    };

    // রিকোয়ারমেন্ট: টাইম পার হয়ে গেলে পেমেন্ট করা যাবে না
    const isPaymentDisabled = countdown.isExpired;

    return (
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 hover:border-indigo-500/30 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl relative group">
            
            {/* ইমেজ ও স্ট্যাটাস ব্যাজ */}
            <div className="relative h-44 w-full bg-slate-950">
                <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover brightness-75" />
                <span className={`absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border backdrop-blur-md ${statusStyles[ticket.status]}`}>
                    {ticket.status}
                </span>
            </div>

            {/* কার্ড বডি */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-extrabold text-white tracking-wide uppercase truncate mb-3">{ticket.title}</h3>
                    
                    {/* রুট ট্র্যাকার */}
                    <div className="bg-slate-950/40 border border-slate-800/80 px-4 py-2 rounded-2xl mb-4 flex justify-between items-center text-xs font-bold">
                        <span className="text-teal-400 uppercase">{ticket.fromLocation}</span>
                        <span className="text-slate-600">➔</span>
                        <span className="text-emerald-400 uppercase">{ticket.toLocation}</span>
                    </div>

                    {/* ডিপার্চার টাইম */}
                    <div className="text-[11px] text-slate-400 space-y-1.5 mb-4 px-1">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Departure:</span>
                            <span className="font-semibold text-slate-300">
                                {new Date(ticket.departureDateTime).toLocaleString([], {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Booking Qty:</span>
                            <span className="font-black text-slate-200">{ticket.bookingQuantity} Tickets</span>
                        </div>
                    </div>

                    {/* কাউন্টডাউন সেকশন */}
                    {ticket.status !== 'rejected' && (
                        <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl text-center mb-4">
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Time to Departure</p>
                            {countdown.isExpired ? (
                                <span className="text-rose-400 text-xs font-bold uppercase tracking-wide">Departed / Passed</span>
                            ) : (
                                <div className="flex justify-center gap-3 text-white font-mono font-bold text-sm">
                                    <div>{countdown.days}d</div>
                                    <div>{countdown.hours}h</div>
                                    <div>{countdown.minutes}m</div>
                                    <div>{countdown.seconds}s</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* প্রাইস এবং অ্যাকশন বাটন */}
                <div className="mt-2 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <div>
                        <span className="text-[9px] text-slate-500 block font-bold uppercase">Total Price</span>
                        <span className="text-lg font-black text-emerald-400">৳{ticket.totalPrice}</span>
                    </div>

                    {/* রিকোয়ারমেন্ট: vendor accept করলে 'accepted' স্ট্যাটাস হবে এবং 'Pay Now' বাটন আসবে */}
                    {ticket.status === 'accepted' && (
                        <button
                            onClick={() => onPayNow(ticket)}
                            disabled={isPaymentDisabled}
                            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 ${
                                isPaymentDisabled
                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                                    : 'bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                            }`}
                        >
                            {isPaymentDisabled ? 'Expired' : 'Pay Now'}
                        </button>
                    )}

                    {ticket.status === 'paid' && (
                        <span className="text-xs text-emerald-400 font-extrabold bg-emerald-500/5 px-3 py-1.5 rounded-xl border border-emerald-500/20 uppercase tracking-wider">
                            ✓ Secured
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookedTicketCard;