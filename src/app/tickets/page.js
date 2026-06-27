'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [searchFrom, setSearchFrom] = useState('');
    const [searchTo, setSearchTo] = useState('');
    const [transportType, setTransportType] = useState('All');
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}/api/tickets/approved?from=${searchFrom}&to=${searchTo}&transportType=${transportType}`
                );
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error("Error loading tickets:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, [searchFrom, searchTo, transportType]);

    return (
        
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 py-12 px-4 md:px-10 text-slate-100">
            <div className="max-w-7xl mx-auto">

                
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                        Explore Available Tickets
                    </h1>
                    <p className="text-slate-400 mt-3 text-sm md:text-base font-light">Secure your journey with the premium experience</p>
                </div>

               
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl mb-12">
                    <div>
                        <label className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-2.5">Search From</label>
                        <input
                            type="text"
                            placeholder="e.g. Dhaka"
                            value={searchFrom}
                            onChange={(e) => setSearchFrom(e.target.value)}
                            className="w-full bg-slate-900/60 border border-slate-700/60 text-white placeholder-slate-500 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-sm shadow-inner"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-2.5">Search To</label>
                        <input
                            type="text"
                            placeholder="e.g. Rangpur"
                            value={searchTo}
                            onChange={(e) => setSearchTo(e.target.value)}
                            className="w-full bg-slate-900/60 border border-slate-700/60 text-white placeholder-slate-500 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-sm shadow-inner"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-2.5">Transport Type</label>
                        <select
                            value={transportType}
                            onChange={(e) => setTransportType(e.target.value)}
                            className="w-full bg-slate-900/60 border border-slate-700/60 text-white px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-sm cursor-pointer shadow-inner"
                        >
                            <option value="All" className="bg-slate-900 text-white">All Transports</option>
                            <option value="Bus" className="bg-slate-900 text-white">Bus</option>
                            <option value="Train" className="bg-slate-900 text-white">Train</option>
                            <option value="Air" className="bg-slate-900 text-white">Air</option>
                        </select>
                    </div>
                </div>

                {/* --- লোডিং স্পিনার --- */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-64 space-y-4">
                        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
                        <p className="text-slate-400 text-xs tracking-widest animate-pulse">SEARCHING FLEETS...</p>
                    </div>
                ) : tickets.length === 0 ? (
                    <div className="text-center text-slate-400 py-16 bg-white/5 backdrop-blur-md rounded-3xl border border-dashed border-slate-700/60 shadow-xl">
                        <p className="text-lg font-medium">No active tickets found matching your route.</p>
                        <p className="text-sm text-slate-500 mt-1">Try changing locations or transport filters.</p>
                    </div>
                ) : (
                    /* --- আল্ট্রা-মডার্ন টিকিট গ্রিড লেআউট --- */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {tickets.map((ticket) => (
                            <div
                                key={ticket._id}
                                className="group bg-slate-900/80 rounded-3xl shadow-xl hover:shadow-2xl border border-slate-800 hover:border-emerald-500/40 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 relative"
                            >
                                {/* গ্লো ইফেক্ট অন হোভার */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                                {/* ইমেজ ও ইন্টেলিজেন্ট ট্যাগ */}
                                <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                                    <img
                                        src={ticket.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"}
                                        alt={ticket.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.9]"
                                    />
                                    {/* ট্রাভেল টাইপ ব্যাজ অন ইমেজ */}
                                    <span className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md text-teal-400 text-[11px] font-bold px-3 py-1 rounded-full border border-teal-500/30 uppercase tracking-widest">
                                        {ticket.transportType}
                                    </span>

                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-5">
                                        <h3 className="text-white font-extrabold text-xl truncate uppercase tracking-wide drop-shadow-md">
                                            {ticket.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* কার্ড বডি */}
                                <div className="p-5 flex-1 flex flex-col justify-between relative z-10">

                                    {/* রুট লেআউট (Premium Timeline look) */}
                                    <div className="flex items-center justify-between font-bold text-white text-sm tracking-wider bg-slate-950/40 border border-slate-800/80 px-4 py-2.5 rounded-2xl mb-4 shadow-inner">
                                        <span className="capitalize text-teal-300">{ticket.fromLocation}</span>
                                        <div className="flex-1 flex justify-center items-center px-2">
                                            <div className="h-[2px] w-full bg-dashed bg-slate-700 relative">
                                                <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] text-emerald-400">✈</span>
                                            </div>
                                        </div>
                                        <span className="capitalize text-emerald-300">{ticket.toLocation}</span>
                                    </div>

                                    {/* প্রাইস এবং সীটস */}
                                    <div className="flex items-center justify-between mb-4 px-1">
                                        <div>
                                            <span className="text-2xl font-black text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text">৳{ticket.price}</span>
                                            <span className="text-[10px] text-slate-500 block">PER UNIT PRICE</span>
                                        </div>
                                        <span className={`text-xs px-3 py-1.5 rounded-xl font-bold border ${ticket.quantity > 0
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                            }`}>
                                            {ticket.quantity > 0 ? `${ticket.quantity} Available` : 'Sold Out'}
                                        </span>
                                    </div>

                                    {/* ডিপার্চার টাইম ম্যাট্রিক্স */}
                                    <div className="bg-slate-950/30 border border-slate-800/50 rounded-2xl p-3 space-y-2 mb-4 text-xs text-slate-400">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 font-medium">Departure Time</span>
                                            <span className="font-semibold text-slate-200 bg-slate-800 px-2.5 py-1 rounded-xl text-[11px] border border-slate-700/50">
                                                {new Date(ticket.departureDateTime).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* পার্কস রেকারেন্স */}
                                    {ticket.perks && ticket.perks.length > 0 && (
                                        <div className="mb-6 px-1">
                                            <div className="flex flex-wrap gap-1.5">
                                                {ticket.perks.map((perk, index) => (
                                                    <span key={index} className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/60 uppercase tracking-wide">
                                                        ✦ {perk}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* ফ্ল্যাশ অ্যাকশন বাটন */}
                                    <Link href={`/tickets/${ticket._id}`}>
                                        <button
                                            className="w-full text-center bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 font-extrabold py-3 rounded-2xl shadow-[0_4px_20px_rgba(52,211,153,0.15)] hover:shadow-[0_4px_25px_rgba(52,211,153,0.3)] transition-all duration-300 text-sm tracking-wider uppercase"
                                        >
                                            See Details
                                        </button>
                                    </Link>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTickets;