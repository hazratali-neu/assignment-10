'use client'
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to load users!", { theme: "dark" });
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleUpdateRole = async (userId, newRole) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${userId}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });

            if (response.ok) {
                toast.success(`User role updated to ${newRole} successfully!`, { theme: "dark" });
               
                setUsers(prevUsers =>
                    prevUsers.map(user => user._id === userId ? { ...user, role: newRole } : user)
                );
            } else {
                toast.error("Failed to update role.", { theme: "dark" });
            }
        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("Connection error!", { theme: "dark" });
        }
    };

    const handleMarkAsFraud = async (userId, vendorEmail) => {
        const confirmFraud = window.confirm(`Are you sure you want to mark "${vendorEmail}" as a FRAUD? This will hide all their tickets permanently!`);
        
        if (!confirmFraud) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${userId}/fraud`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: vendorEmail })
            });

            if (response.ok) {
                toast.error("Vendor marked as FRAUD! All matching tickets are now hidden.", { theme: "dark" });
              
                setUsers(prevUsers =>
                    prevUsers.map(user => user._id === userId ? { ...user, role: 'fraud', isFraud: true } : user)
                );
            } else {
                toast.error("Failed to execute fraud restriction.", { theme: "dark" });
            }
        } catch (error) {
            console.error("Error marking fraud:", error);
            toast.error("Connection error!", { theme: "dark" });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-start items-center">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="max-w-6xl w-full mb-6 text-left">
                <h2 className="text-2xl font-black uppercase tracking-wider text-teal-400">Manage Users Dashboard</h2>
                <p className="text-xs text-slate-400 mt-1">Admin Panel: Control user hierarchy, promote statuses, and restrict fraudulent vendors.</p>
            </div>

            <div className="max-w-6xl w-full overflow-x-auto bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-950/80 text-slate-400 text-xs uppercase font-bold border-b border-slate-800">
                            <th className="p-4">User Identity</th>
                            <th className="p-4">Email Address</th>
                            <th className="p-4">Current Authorization</th>
                            <th className="p-4 text-center">Administrative Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-sm">
                        {users.map((user) => {
                         
                            const isVendor = user.role === 'vendor' || user.role === 'vender';
                            const isAdmin = user.role === 'admin';
                            const isFraud = user.role === 'fraud' || user.isFraud === true;

                            return (
                                <tr key={user._id} className="hover:bg-slate-800/20 transition-colors">
                                    {/* ইউজার নেম ও ইমেজ */}
                                    <td className="p-4 flex items-center space-x-3">
                                        <img 
                                            src={user.image && user.image.startsWith('http') ? user.image : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} 
                                            alt={user.name} 
                                            className="w-10 h-10 rounded-full object-cover border border-slate-700 shadow-md"
                                        />
                                        <span className="font-bold text-white capitalize tracking-wide">{user.name || 'Anonymous'}</span>
                                    </td>

                                    {/* ইমেইল */}
                                    <td className="p-4 text-slate-300 font-medium">{user.email}</td>

                                    {/* রোল ব্যাজ */}
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full tracking-widest border ${
                                            isAdmin ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                            isVendor ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                            isFraud ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 font-extrabold animate-pulse' :
                                            'bg-slate-800 text-slate-400 border-slate-700'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* অ্যাকশন বাটন বা লেবেল */}
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            {/* Make Admin Button */}
                                            <button
                                                onClick={() => handleUpdateRole(user._id, 'admin')}
                                                disabled={isAdmin || isFraud}
                                                className="px-3 py-1.5 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-800 disabled:opacity-20 disabled:hover:bg-slate-950 disabled:hover:text-slate-400 text-slate-300"
                                            >
                                                Make Admin
                                            </button>

                                            {/* Make Vendor Button */}
                                            <button
                                                onClick={() => handleUpdateRole(user._id, 'vendor')}
                                                disabled={isVendor || isFraud}
                                                className="px-3 py-1.5 bg-slate-950 hover:bg-indigo-500 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-800 disabled:opacity-20 disabled:hover:bg-slate-950 text-slate-300"
                                            >
                                                Make Vendor
                                            </button>

                                            {/* Mark as Fraud Button (শুধুমাত্র ভেন্ডরদের জন্যই মাউন্ট হবে) */}
                                            {isVendor && !isFraud && (
                                                <button
                                                    onClick={() => handleMarkAsFraud(user?._id, user?.email)}
                                                    className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-600 border border-rose-500/30 text-rose-400 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
                                                >
                                                    Mark as Fraud
                                                </button>
                                            )}

                                           
                                            {isFraud && (
                                                <span className="text-xs font-black text-rose-500 uppercase tracking-widest px-2 bg-rose-500/10 py-1 rounded-lg border border-rose-500/20">Banned Vendor</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;