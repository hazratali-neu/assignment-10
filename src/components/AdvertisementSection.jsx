'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const AdvertisementSection = () => {
    const [advertisedTickets, setAdvertisedTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/tickets/advertised`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setAdvertisedTickets(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center my-10 text-white">Loading Featured Tickets...</div>;
    if (advertisedTickets.length === 0) return null;

    return (
        <section className="my-20 max-w-7xl mx-auto px-6 py-16 bg-[#0f0f23]">
            {/* হেডলাইন */}
            <h2 className="text-4xl font-bold text-center text-white mb-12">
                📢 Featured & Advertised Tickets
            </h2>
            
            {/* গ্রিড লেআউট */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advertisedTickets.map((ticket) => (
                    <div key={ticket._id} className="bg-[#1a1c35] rounded-3xl p-5 border border-white/5 shadow-xl transition-all">
                        
                        {/* ইমেজ এরিয়া */}
                        <div className="relative mb-5">
                            <img 
                                src={ticket.image || "https://via.placeholder.com/400x200"} 
                                alt={ticket.title} 
                                className="w-full h-48 object-cover rounded-2xl" 
                            />
                            <span className="absolute top-3 left-3 bg-cyan-500/20 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-cyan-500/20">
                                🚌 {ticket.transportType || "Coach"}
                            </span>
                        </div>
                        
                        {/* টাইটেল */}
                        <h3 className="text-xl font-bold text-white mb-4">{ticket.title}</h3>
                        
                        {/* রুট ইনফো */}
                        <div className="flex items-center justify-between text-zinc-400 mb-6 bg-[#0f0f23] p-4 rounded-xl border border-white/5">
                            <span className="text-sm font-medium">{ticket.fromLocation}</span>
                            <span className="text-indigo-400">✈️</span>
                            <span className="text-sm font-medium">{ticket.toLocation}</span>
                        </div>
                        
                        {/* প্রাইস ও সিট */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-2xl font-black text-white">৳{ticket.price}</p>
                                <p className="text-[10px] text-zinc-500 uppercase font-semibold">Per Unit Price</p>
                            </div>
                            <span className="bg-[#10b981]/10 text-[#10b981] text-xs font-bold px-4 py-2 rounded-lg">
                                {ticket.quantity || 0} Available
                            </span>
                        </div>

                        {/* বাটন */}
                        <Link 
                            href={`/tickets/${ticket._id}`} 
                            className="block w-full py-4 text-center font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:opacity-90 transition-all"
                        >
                            SEE DETAILS
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdvertisementSection;