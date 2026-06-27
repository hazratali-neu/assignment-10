'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

const AdvertisementSection = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdvertisedTickets = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}/api/tickets/advertised`
                );

                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdvertisedTickets();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-black">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Advertisement Tickets
                    </h2>

                    <p className="text-slate-400 mt-3">
                        Top 6 Tickets Selected by Admin
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {tickets.map((ticket) => (

                        <div
                            key={ticket._id}
                            className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500 transition duration-300 shadow-xl flex flex-col"
                        >

                            <img
                                src={ticket.image}
                                alt={ticket.title}
                                className="h-56 w-full object-cover"
                            />

                            <div className="p-6 flex flex-col flex-1">

                                <h3 className="text-2xl font-bold text-white mb-5">
                                    {ticket.title}
                                </h3>

                                <div className="space-y-3 mb-5">

                                    <div className="flex justify-between">
                                        <span className="text-slate-400">
                                            Price
                                        </span>

                                        <span className="font-bold text-emerald-400">
                                            ৳ {ticket.price}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-slate-400">
                                            Quantity
                                        </span>

                                        <span className="text-white">
                                            {ticket.quantity}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-slate-400">
                                            Transport
                                        </span>

                                        <span className="text-cyan-400 font-semibold">
                                            {ticket.transportType}
                                        </span>
                                    </div>

                                </div>

                                <div className="mb-6">

                                    <h4 className="text-sm font-semibold text-white mb-2">
                                        Perks
                                    </h4>

                                    <div className="flex flex-wrap gap-2">

                                        {ticket.perks?.map((perk, index) => (

                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-300"
                                            >
                                                {perk}
                                            </span>

                                        ))}

                                    </div>

                                </div>

                                <Link
                                    href={`/tickets/${ticket._id}`}
                                    className="mt-auto"
                                >
                                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-bold hover:opacity-90 transition">
                                        See Details
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

export default AdvertisementSection;