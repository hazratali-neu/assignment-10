'use client'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Check, X, Loader2 } from "lucide-react";

const ManageTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); 

    const backendUrl = process.env.NEXT_PUBLIC_URL;

    const fetchAllTickets = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${backendUrl}/api/addticket`);
            if (!response.ok) throw new Error("Failed to fetch tickets");
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error("Error loading tickets:", error);
            toast.error("Failed to load tickets from database.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllTickets();
    }, []);

  
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            setActionLoading(id);
            
            const response = await fetch(`${backendUrl}/api/addticket/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ verificationStatus: newStatus })
            });

            if (!response.ok) throw new Error("Update failed");

            toast.success(`Ticket successfully ${newStatus}!`);
            
            setTickets(prevTickets => 
                prevTickets.map(ticket => 
                    ticket._id === id ? { ...ticket, verificationStatus: newStatus } : ticket
                )
            );
        } catch (error) {
            console.error("Status update error:", error);
            toast.error(`Failed to ${newStatus} ticket.`);
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'approved': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20'; // pending
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-slate-950 space-y-4">
                <Loader2 className="animate-spin h-12 w-12 text-indigo-400" />
                <p className="text-slate-500 text-[10px] tracking-widest uppercase animate-pulse">Loading Vendor Tickets...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 py-12 px-4 md:px-10 text-slate-100">
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />

            <div className="max-w-7xl mx-auto">
                {/* হেডার সেকশন */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent uppercase tracking-wider">
                        Manage Tickets
                    </h1>
                    <p className="text-slate-400 text-xs md:text-sm mt-1">Review, Approve, or Reject tickets submitted by vendors.</p>
                </div>

                {/* টিকিট টেবিল কন্টেইনার */}
                {tickets.length === 0 ? (
                    <div className="text-center text-slate-400 py-16 bg-white/5 backdrop-blur-md rounded-3xl border border-dashed border-slate-800 shadow-xl">
                        <p className="text-base font-semibold">No tickets found in database.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-slate-900/80 border border-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800/60 bg-slate-950/40 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                                    <th className="p-4">Image & Title</th>
                                    <th className="p-4">Route (From → To)</th>
                                    <th className="p-4">Type & Price</th>
                                    <th className="p-4">Vendor Info</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40 text-xs text-slate-300">
                                {tickets.map((ticket) => (
                                    <tr key={ticket._id} className="hover:bg-white/[0.02] transition duration-150">
                                        
                                        {/* ইমেজ ও টাইটেল */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={ticket.image} 
                                                    alt={ticket.title} 
                                                    className="w-12 h-12 object-cover rounded-xl bg-slate-950 border border-slate-800"
                                                />
                                                <div>
                                                    <p className="font-bold text-white text-sm max-w-[150px] truncate">{ticket.title}</p>
                                                    <p className="text-[10px] text-slate-500 font-mono">Qty: {ticket.quantity}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* রুট */}
                                        <td className="p-4 capitalize">
                                            <div className="font-medium text-slate-200">
                                                {ticket.fromLocation} <span className="text-indigo-400 mx-1">→</span> {ticket.toLocation}
                                            </div>
                                            <p className="text-[10px] text-slate-500 mt-0.5">
                                                {new Date(ticket.departureDateTime).toLocaleString([], {dateStyle: 'medium', timeStyle: 'short'})}
                                            </p>
                                        </td>

                                        {/* ট্রান্সপোর্ট ও প্রাইস */}
                                        <td className="p-4">
                                            <span className="bg-slate-950 px-2 py-0.5 rounded text-[10px] text-indigo-300 font-semibold border border-indigo-950">
                                                {ticket.transportType}
                                            </span>
                                            <p className="text-emerald-400 font-bold mt-1.5 text-sm">৳{ticket.price}</p>
                                        </td>

                                        {/* ভেন্ডর ইনফো */}
                                        <td className="p-4">
                                            <p className="font-semibold text-slate-200 capitalize">{ticket.vendorName || "Unknown"}</p>
                                            <p className="text-[10px] text-slate-500 truncate max-w-[160px]">{ticket.vendorEmail}</p>
                                        </td>

                                        {/* স্ট্যাটাস ব্যাজ */}
                                        <td className="p-4 text-center">
                                            <span className={`capitalize px-2.5 py-1 text-[10px] font-bold border rounded-full shadow-sm ${getStatusStyles(ticket.verificationStatus)}`}>
                                                {ticket.verificationStatus || 'pending'}
                                            </span>
                                        </td>

                                        {/* অ্যাকশন বাটনসমূহ */}
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                {actionLoading === ticket._id ? (
                                                    <Loader2 className="animate-spin h-5 w-5 text-indigo-400" />
                                                ) : (
                                                    <>
                                                        {/* Approve Button */}
                                                        <button
                                                            onClick={() => handleStatusUpdate(ticket._id, 'approved')}
                                                            disabled={ticket.verificationStatus === 'approved'}
                                                            className={`flex items-center gap-1 font-bold py-1.5 px-3 rounded-xl text-[11px] transition duration-200 ${
                                                                ticket.verificationStatus === 'approved' 
                                                                ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700/20' 
                                                                : 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30'
                                                            }`}
                                                            title="Approve Ticket"
                                                        >
                                                            <Check className="w-3.5 h-3.5" />
                                                            Approve
                                                        </button>

                                                        {/* Reject Button */}
                                                        <button
                                                            onClick={() => handleStatusUpdate(ticket._id, 'rejected')}
                                                            disabled={ticket.verificationStatus === 'rejected'}
                                                            className={`flex items-center gap-1 font-bold py-1.5 px-3 rounded-xl text-[11px] transition duration-200 ${
                                                                ticket.verificationStatus === 'rejected' 
                                                                ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700/20' 
                                                                : 'bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30'
                                                            }`}
                                                            title="Reject Ticket"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageTickets;