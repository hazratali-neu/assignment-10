'use client';
import React, { useState, useEffect } from 'react';
import { authClient } from "@/lib/auth-client"; // Better-Auth সেশন
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function RevenueOverview() {
    const { data: session, isPending } = authClient.useSession();
    const [stats, setStats] = useState({ totalTicketsAdded: 0, totalTicketsSold: 0, totalRevenue: 0, chartData: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverviewData = async () => {
            if (!session?.user?.email) return;
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/vendor/revenue-overview?email=${session.user.email}`);
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error("Error loading revenue data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!isPending && session?.user?.email) {
            fetchOverviewData();
        }
    }, [session, isPending]);

    if (isPending || (session && loading)) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-10 text-slate-100">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-black uppercase tracking-wider mb-2 text-white">Revenue Overview</h2>
                <p className="text-slate-400 text-xs mb-8">Visual analytics of your ticket sells and total earnings.</p>

               
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Tickets Added</p>
                        <h3 className="text-3xl font-black text-white">{stats.totalTicketsAdded} <span className="text-xs font-normal text-slate-500">Items</span></h3>
                    </div>

                  
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Tickets Sold</p>
                        <h3 className="text-3xl font-black text-cyan-400">{stats.totalTicketsSold} <span className="text-xs font-normal text-slate-500">Pcs</span></h3>
                    </div>

                  
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Revenue</p>
                        <h3 className="text-3xl font-black text-emerald-400">৳{stats.totalRevenue}</h3>
                    </div>
                </div>

              
                {stats?.chartData?.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl text-red-500 text-5xl font-medium">
                        No sales data available yet to generate charts.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                    
                        <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl shadow-lg">
                            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-slate-300">Revenue Analytics (৳)</h4>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                        <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
                                        <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                                        <Legend />
                                        <Area type="monotone" dataKey="Revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* চার্ট ২: টিকিট বিক্রির পরিমাণ (Bar Chart) */}
                        <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl shadow-lg">
                            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-slate-300">Ticket Sales Quantity</h4>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                        <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
                                        <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                                        <Legend />
                                        <Bar dataKey="Quantity" fill="#22d3ee" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}