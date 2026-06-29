'use client'
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

  
    const handleUpdateRole = async (userId, newRole) => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${userId}/role`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: newRole })
        });
        toast.success(`User is now ${newRole}`);
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
    };

    const openFraudModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    // মোডাল ক্লোজ করার ফাংশন
    const closeFraudModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    const handleMarkAsFraud = async (userId, email) => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${userId}/fraud`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        toast.error("Vendor marked as FRAUD and restricted.");
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: 'fraud' } : u));
        closeFraudModal();
    };

    return (
        <div className="p-6 bg-slate-950 text-white min-h-screen">
            <ToastContainer />
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-slate-700 text-left">
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Role</th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="border-b border-slate-800">
                            <td className="p-4">{user.name}</td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4 uppercase">{user.role}</td>
                            <td className="p-4 flex gap-2 justify-center">
                                {/* Make Admin & Vendor Buttons */}
                                <button className="bg-amber-600 px-3 py-1 rounded text-xs" onClick={() => handleUpdateRole(user._id, 'admin')}>Make Admin</button>
                                <button className="bg-indigo-600 px-3 py-1 rounded text-xs" onClick={() => handleUpdateRole(user._id, 'vendor')}>Make Vendor</button>

                                {/* Mark as Fraud Button (Only for Vendors) */}
                                {(user.role === 'vender' || user.role === 'vender') && (
                                    <button className="bg-rose-600 px-3 py-1 rounded text-xs" onClick={() => openFraudModal(user)}>Mark as Fraud</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ── Fraud Confirmation Modal ── */}
            {showModal && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
                        <h2 className="text-lg font-bold text-rose-400">Mark as Fraud?</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                            Are you sure you want to mark <span className="font-semibold text-white">{selectedUser.name}</span>{" "}
                            (<span className="text-slate-400">{selectedUser.email}</span>) as fraud? This will hide all their tickets and ban the vendor.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={closeFraudModal}
                                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleMarkAsFraud(selectedUser._id, selectedUser.email)}
                                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                            >
                                Yes, Mark as Fraud
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ManageUsers;