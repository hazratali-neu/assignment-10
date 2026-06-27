'use client';
import React, { useState, useEffect } from 'react';
import { authClient } from "@/lib/auth-client"; // Better-Auth সেশন

export default function TransactionHistory() {
    const { data: session, isPending } = authClient.useSession();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!session?.user?.email) return;
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/transactions?email=${session?.user?.email}`);
                const data = await res.json();
                setTransactions(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error loading transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!isPending && session?.user?.email) {
            fetchTransactions();
        }
    }, [session, isPending]);

    if (isPending || (session && loading)) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-10 text-slate-100">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-black uppercase tracking-wider mb-2 text-white">Transaction History</h2>
                <p className="text-slate-400 text-xs mb-8">View all your completed Stripe payment transactions.</p>

                {transactions.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-500 font-medium">
                        No transactions recorded yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-950/80 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-teal-400">
                                    <th className="p-4">Transaction ID</th>
                                    <th className="p-4">Ticket Title</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Payment Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {transactions.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-slate-800/40 transition-colors">
                                        {/* Transaction ID */}
                                        <td className="p-4 font-mono font-bold text-teal-400 uppercase tracking-wide">
                                            {tx.transactionId}
                                        </td>
                                        {/* Ticket Title */}
                                        <td className="p-4 font-semibold text-slate-200 capitalize">
                                            {tx.ticketTitle}
                                        </td>
                                        {/* Amount */}
                                        <td className="p-4 font-black text-emerald-400">
                                            ৳{tx.amount}
                                        </td>
                                        {/* Payment Date */}
                                        <td className="p-4 text-slate-400 text-xs">
                                            {new Date(tx.paymentDate).toLocaleString('en-US', { 
                                                dateStyle: 'medium', 
                                                timeStyle: 'short' 
                                            })}
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