'use client';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authClient } from "@/lib/auth-client"; // Better-Auth সেশন ক্লায়েন্ট

export default function RequestedBookings() {
    const { data: session, isPending } = authClient.useSession();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const loadRequests = async () => {
        if (!session?.user?.email) return;
        try {
           
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/vendor/bookings?email=${session.user.email}`);
            const data = await res.json();
            setRequests(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error loading requested bookings:", err);
            toast.error("Failed to load requests!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isPending && session?.user?.email) {
            loadRequests();
        }
    }, [session, isPending]);


    const handleAction = async (bookingId, actionName) => {
        setActionLoading(bookingId);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookings/vendor-update`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId, action: actionName }),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(`Request ${actionName === 'accepted' ? 'Accepted' : 'Rejected'} Successfully!`, { theme: "dark" });
              
                setRequests(prev => prev.map(req => req._id === bookingId ? { ...req, status: actionName } : req));
            } else {
                toast.error(data.message || "Failed to update status");
            }
        } catch (err) {
            console.error(err);
            toast.error("Connection error!");
        } finally {
            setActionLoading(null);
        }
    };

    if (isPending || (session && loading)) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-10 text-slate-100">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-black uppercase tracking-wider mb-2 text-white">Requested Bookings</h2>
                <p className="text-slate-400 text-xs mb-8">Manage all ticket booking requests from customers.</p>

                {requests.length === 0 ? (
                    <p className="text-center text-slate-500 py-12">No booking requests found.</p>
                ) : (
                    <div className="overflow-x-auto bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-950/80 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-teal-400">
                                    <th className="p-4">User Info</th>
                                    <th className="p-4">Ticket Title</th>
                                    <th className="p-4">Quantity</th>
                                    <th className="p-4">Total Price</th>
                                    <th className="p-4">Current Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {requests.map((req) => (
                                    <tr key={req._id} className="hover:bg-slate-800/40 transition-colors">
                                        {/* User Info */}
                                        <td className="p-4">
                                            <div className="font-bold text-white capitalize">{req.userName || "Sagar User"}</div>
                                            <div className="text-xs text-slate-400">{req.userEmail}</div>
                                        </td>
                                        {/* Ticket Title */}
                                        <td className="p-4 font-semibold text-slate-200 capitalize">{req.title}</td>
                                        {/* Booking Quantity */}
                                        <td className="p-4 font-mono text-slate-300">{req.bookingQuantity} Pcs</td>
                                        {/* Total Price */}
                                        <td className="p-4 font-bold text-emerald-400">৳{req.totalPrice}</td>
                                        {/* Status Badge */}
                                        <td className="p-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                                                ${req.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : ''}
                                                ${req.status === 'accepted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : ''}
                                                ${req.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : ''}
                                                ${req.status === 'rejected' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : ''}
                                            `}>
                                                {req.status}
                                            </span>
                                        </td>
                                        {/* Actions */}
                                        <td className="p-4 text-center">
                                            {req.status === 'pending' ? (
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleAction(req._id, 'accepted')}
                                                        disabled={actionLoading !== null}
                                                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black px-3 py-1.5 rounded-lg hover:from-emerald-600 transition-all uppercase tracking-wider disabled:opacity-50"
                                                    >
                                                        {actionLoading === req._id ? '...' : 'Accept'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(req._id, 'rejected')}
                                                        disabled={actionLoading !== null}
                                                        className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-rose-500/20 transition-all uppercase tracking-wider disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-500 italic">Action Taken ({req.status})</span>
                                            )}
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
}