'use client';

import { authClient } from "@/lib/auth-client"; // Better-Auth ক্লায়েন্ট ইম্পোর্ট
import { User, Mail, Shield, Calendar, CheckCircle, Award } from "lucide-react";

export default function AdminProfilePage() {
    
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-3">
                <span className="loading loading-spinner loading-lg text-emerald-500"></span>
                <p className="text-zinc-500 text-xs tracking-widest uppercase animate-pulse">Loading Admin Profile...</p>
            </div>
        );
    }
    if (!session?.user) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] px-4">
                <div className="text-center p-8 bg-zinc-900 border border-zinc-800 rounded-3xl max-w-sm w-full shadow-2xl">
                    <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">Access Denied</h3>
                    <p className="text-zinc-400 text-sm mb-4">Please log in to your admin account to view this profile.</p>
                </div>
            </div>
        );
    }

    const { name, email, role, image } = session.user;

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full text-zinc-100 relative">
            
            
            <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-6">
                
          
                <div className="absolute -top-10 -right-10 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative z-10 w-full">
                    
                 
                    <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500 p-1 bg-zinc-950 shadow-xl shadow-emerald-950/40">
                            {image ? (
                                <img 
                                    src={image} 
                                    alt={name} 
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center rounded-xl">
                                    <User className="w-10 h-10 text-emerald-400" />
                                </div>
                            )}
                        </div>
                    </div>

              
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white">
                                    {name || "Admin User"}
                                </h1>
                                <span className="capitalize px-3 py-1 text-[10px] font-black tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full w-fit mx-auto sm:mx-0 shadow-md uppercase">
                                    {role === 'vender' ? 'Vendor' : role || 'Admin'}
                                </span>
                            </div>
                            <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-mono">{email}</p>
                        </div>
                    </div>

                </div>
            </div>

         
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
             
                <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl">
                    <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-800/60 pb-2 flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-emerald-400" /> Account Information
                    </h3>
                    
                    <div className="space-y-3">
                     
                        <div className="flex items-center gap-4 bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-800/50">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Full Name</p>
                                <p className="text-sm font-semibold text-zinc-200 mt-0.5">{name || "Not Provided"}</p>
                            </div>
                        </div>

                   
                        <div className="flex items-center gap-4 bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-800/50">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div className="break-all">
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Email Address</p>
                                <p className="text-sm font-semibold text-zinc-200 mt-0.5 font-mono">{email}</p>
                            </div>
                        </div>
                    </div>
                </div>

              
                <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl">
                    <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-800/60 pb-2 flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" /> Security & Permissions
                    </h3>
                    
                    <div className="space-y-3">
                    
                        <div className="flex items-center gap-4 bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-800/50">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                                <Award className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">System Role</p>
                                <p className="text-sm font-black text-emerald-400 mt-0.5 capitalize tracking-wide">
                                    {role === 'vender' ? 'Vendor (Seller)' : role || 'Super Admin'}
                                </p>
                            </div>
                        </div>

                   
                        <div className="flex items-center gap-4 bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-800/50">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                                <CheckCircle className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Account Status</p>
                                <p className="text-sm font-bold text-teal-400 mt-0.5 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" /> 
                                    Verified & Active
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}