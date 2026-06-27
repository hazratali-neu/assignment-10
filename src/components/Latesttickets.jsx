"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LatestTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestTickets = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}/api/tickets/latest`
                );

                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error("Failed to load latest tickets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestTickets();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
                <div className="flex justify-center items-center py-20">
                    <div className="h-14 w-14 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                </div>
            </section>
        );
    }

    if (!tickets.length) {
        return (
            <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
                <h2 className="text-center text-white text-2xl">
                    No Latest Tickets Found
                </h2>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
            <div className="max-w-7xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-14">

                    <span className="text-emerald-400 uppercase tracking-[6px] text-sm font-bold">
                        Just Added
                    </span>

                    <h2 className="text-4xl md:text-5xl font-extrabold mt-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Latest Tickets
                    </h2>

                    <p className="text-slate-400 mt-3">
                        Recently added premium transport tickets
                    </p>

                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {tickets.map((ticket) => (

                        <div
                            key={ticket._id}
                            className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-emerald-500 hover:-translate-y-2 duration-500 flex flex-col"
                        >

                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">

                                <img
                                    src={ticket.image}
                                    alt={ticket.title}
                                    className="w-full h-full object-cover group-hover:scale-110 duration-700"
                                />

                                <span className="absolute top-4 left-4 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                                    {ticket.transportType}
                                </span>

                                <span className="absolute top-4 right-4 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                                    NEW
                                </span>

                            </div>

                            {/* Body */}
                            <div className="p-5 flex flex-col flex-1">

                                <h3 className="text-white text-2xl font-bold line-clamp-1">
                                    {ticket.title}
                                </h3>

                                <p className="text-slate-400 mt-2 mb-5">
                                    {ticket.fromLocation}
                                    <span className="mx-2 text-emerald-400">
                                        →
                                    </span>
                                    {ticket.toLocation}
                                </p>

                                {/* Price & Quantity */}
                                <div className="flex justify-between items-center mb-5">

                                    <div>

                                        <p className="text-slate-400 text-xs">
                                            Price
                                        </p>

                                        <h4 className="text-3xl font-extrabold text-emerald-400">
                                            ৳{ticket.price}
                                        </h4>

                                        <span className="text-xs text-slate-500">
                                            Per Unit
                                        </span>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-slate-400 text-xs">
                                            Quantity
                                        </p>

                                        <span
                                            className={`px-3 py-1 rounded-full font-bold text-sm ${
                                                ticket.quantity > 0
                                                    ? "bg-emerald-500/20 text-emerald-400"
                                                    : "bg-red-500/20 text-red-400"
                                            }`}
                                        >
                                            {ticket.quantity > 0
                                                ? `${ticket.quantity} Left`
                                                : "Sold Out"}
                                        </span>

                                    </div>

                                </div>

                                {/* Perks */}
                                {ticket.perks?.length > 0 && (

                                    <div className="flex flex-wrap gap-2 mb-6">

                                        {ticket.perks.map((perk, index) => (

                                            <span
                                                key={index}
                                                className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-full"
                                            >
                                                ✦ {perk}
                                            </span>

                                        ))}

                                    </div>

                                )}

                                {/* Button */}
                                <Link
                                    href={`/tickets/${ticket._id}`}
                                    className="mt-auto"
                                >
                                    <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-bold hover:scale-105 duration-300 shadow-lg">
                                        See Details →
                                    </button>
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
};

export default LatestTickets;