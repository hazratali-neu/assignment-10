"use client";
import { useState, useEffect } from "react";

import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { getApprovedTickets, toggleAdvertiseTicket } from "@/lib/api/addTicket/actions";

export default function AdvertiseTicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadTickets = async () => {
        try {
            const data = await getApprovedTickets();
            console.log("Backend Data Check:", data);
            if (Array.isArray(data)) {
                setTickets(data);
            } else {
                setTickets([]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error loading tickets:", error);
            setTickets([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTickets();
    }, []);

    const handleToggle = async (id, currentStatus) => {
        
        const isCurrentlyAdvertised = !!currentStatus; 
        const nextStatus = !isCurrentlyAdvertised; 
        
        try {
            const result = await toggleAdvertiseTicket(id, nextStatus);

            
            if (result && result.success === false) {
                toast.error(result.message || "Cannot advertise more than 6 tickets!");
                return;
            }
            toast.success(nextStatus ? "Added to advertisement!" : "Removed from advertisement.");
            
            await loadTickets(); 
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        }
    };

    if (loading) {
        return <div className="p-10 text-center font-bold text-slate-400">Loading approved assets...</div>;
    }

    return (
        <div className="p-6 md:p-10 max-w-6xl mx-auto w-full text-zinc-200 min-h-screen">
            <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-white uppercase">
                    Advertise Tickets Section
                </h2>
                <p className="text-zinc-400 text-xs mt-1">
                    Toggle to display tickets in the homepage advertisement carousel (Maximum 6 tickets limit).
                </p>
            </div>

            <div className="overflow-x-auto bg-zinc-900/60 border border-zinc-800 rounded-2xl shadow-xl">
                <table className="w-full text-left text-sm text-zinc-300">
                    <thead className="bg-zinc-950 text-zinc-400 uppercase text-[11px] font-bold border-b border-zinc-800">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Transport</th>
                            <th className="p-4">Route</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-center">Status / Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {Array.isArray(tickets) && tickets.length > 0 ? (
                            tickets.map((ticket) => (
                                <tr key={ticket._id} className="hover:bg-zinc-800/30 transition-colors">
                                    <td className="p-4 font-semibold text-white">{ticket.title}</td>
                                    <td className="p-4 text-xs text-zinc-400">{ticket.transportType}</td>
                                    <td className="p-4 text-xs capitalize text-zinc-400">
                                        {ticket.fromLocation} ➔ {ticket.toLocation}
                                    </td>
                                    <td className="p-4 font-bold text-emerald-400">৳{ticket.price}</td>
                                    <td className="p-4 text-center">
                                        <Button
                                            size="sm"
                                            onClick={() => handleToggle(ticket._id, ticket.isAdvertised)}
                                            className={`font-bold text-xs rounded-xl px-4 h-8 ${
                                                ticket.isAdvertised
                                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                                    : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700"
                                            }`}
                                        >
                                            {ticket.isAdvertised ? "Advertised" : "Advertise"}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-zinc-500 text-sm font-medium">
                                    No approved tickets found to advertise!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}