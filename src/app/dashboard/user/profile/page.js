'use client';

import { useSession } from "@/lib/auth-client";
import { User, Mail, Shield, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner loading-lg text-emerald-500"></span>
                    <p className="text-sm text-zinc-300 animate-pulse font-medium">Loading your profile...</p>
                </div>
            </div>
        );
    }


    if (!session?.user) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] px-4">
                <div className="text-center p-8 bg-zinc-900 border border-zinc-700/60 rounded-2xl max-w-sm w-full shadow-2xl backdrop-blur-sm">
                    <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">Access Denied</h3>
                    <p className="text-zinc-300 text-sm mb-6">Please log in to view your profile dashboard.</p>
                    <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl transition duration-200 shadow-lg shadow-emerald-900/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-zinc-900">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const { name, email, role, image } = session?.user;

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full text-zinc-100 relative min-h-screen">

            {/* প্রোফাইল হেডার কার্ড */}
            <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-950 border border-zinc-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl mb-6">

                {/* সফট ব্যাকগ্রাউন্ড গ্লো */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl -z-10" />

                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative z-10 w-full">

                    {/* প্রোফাইল পিকচার সেকশন */}
                    <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500/50 p-1 bg-zinc-950 shadow-xl shadow-emerald-950/40">
                            {image ? (
                                <img
                                    src={image}
                                    alt={name || "User"}
                                    className="w-full h-full object-cover rounded-xl"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center rounded-xl">
                                    <User className="w-12 h-12 text-emerald-500/80" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* নাম ও রোল */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                                    {name || "TicketBari User"}
                                </h1>
                                <span className="capitalize px-3 py-0.5 text-xs font-semibold tracking-wide bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full w-fit mx-auto sm:mx-0">
                                    {role === 'vender' ? 'Vendor' : role || 'User'}
                                </span>
                            </div>
                            <p className="text-zinc-300 text-sm sm:text-base mt-1 font-medium">{email}</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* ডিটেইলস ইনফরমেশন গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* অ্যাকাউন্ট ইনফরমেশন কার্ড */}
                <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-700/60 rounded-2xl p-5 sm:p-6 shadow-xl">
                    <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest mb-4 border-b border-zinc-700/60 pb-2">
                        Account Information
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4 bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-700/50">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 flex-shrink-0">
                                <User className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Full Name</p>
                                <p className="text-sm font-medium text-zinc-100 mt-0.5 truncate">{name || "N/A"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-700/50">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 flex-shrink-0">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Email Address</p>
                                <p className="text-sm font-medium text-zinc-100 mt-0.5 break-all truncate">{email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* সিকিউরিটি ও রোল কার্ড */}
                <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-700/60 rounded-2xl p-5 sm:p-6 shadow-xl">
                    <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest mb-4 border-b border-zinc-700/60 pb-2">
                        Security & Permissions
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4 bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-700/50">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 flex-shrink-0">
                                <Shield className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Account Role</p>
                                <p className="text-sm font-semibold text-emerald-300 mt-0.5 capitalize truncate">
                                    {role === 'vender' ? 'Vendor (Seller)' : role || 'User'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-700/50">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 flex-shrink-0">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Status</p>
                                <p className="text-sm font-medium text-emerald-300 mt-0.5 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Verified Active Account
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}