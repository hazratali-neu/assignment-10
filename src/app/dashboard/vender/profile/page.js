'use client';

import { useSession } from "@/lib/auth-client";
import { User, Mail, Shield, Calendar } from "lucide-react";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <span className="loading loading-spinner loading-lg text-emerald-500"></span>
            </div>
        );
    }
    if (!session?.user) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] px-4">
                <div className="text-center p-8 bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full shadow-xl">
                    <p className="text-zinc-400 font-medium">Please log in to view your profile.</p>
                </div>
            </div>
        );
    }

    const { name, email, role, image } = session?.user;

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full text-zinc-100 relative">
            
            {/* প্রোফাইল হেডার কার্ড */}
            <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl mb-6">
                
                {/* সফট ব্যাকগ্রাউন্ড গ্লো */}
                <div className="absolute -top-10 -right-10 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl -z-10" />

                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative z-10 w-full">
                    
                    {/* প্রোফাইল পিকচার সেকশন */}
                    <div className="relative group flex-shrink-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500 p-1 bg-zinc-900 shadow-xl shadow-emerald-950/50">
                            {image ? (
                                <img 
                                    src={image} 
                                    alt={name} 
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center rounded-xl">
                                    <User className="w-10 h-10 text-emerald-400" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* নাম ও রোল */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                                    {name || "TicketBari User"}
                                </h1>
                                <span className="capitalize px-3 py-1 text-xs font-bold tracking-wide bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full w-fit mx-auto sm:mx-0 shadow-inner">
                                    {role === 'vender' ? 'Vendor' : role}
                                </span>
                            </div>
                            <p className="text-zinc-400 text-sm sm:text-base mt-1.5 font-medium">{email}</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* ডিটেইলস ইনফরমেশন গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* অ্যাকাউন্ট ইনফরমেশন কার্ড */}
                <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">
                        Account Information
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4 bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-800/80">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Full Name</p>
                                <p className="text-sm font-semibold text-zinc-200 mt-0.5">{name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-800/80">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div className="break-all">
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Email Address</p>
                                <p className="text-sm font-semibold text-zinc-200 mt-0.5">{email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* সিকিউরিটি ও রোল কার্ড */}
                <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">
                        Security & Permissions
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4 bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-800/80">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                                <Shield className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Account Role</p>
                                <p className="text-sm font-bold text-emerald-400 mt-0.5 capitalize">
                                    {role === 'vender' ? 'Vendor (Seller)' : role}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-800/80">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Status</p>
                                <p className="text-sm font-semibold text-teal-400 mt-0.5 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" /> 
                                    Active Account
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}