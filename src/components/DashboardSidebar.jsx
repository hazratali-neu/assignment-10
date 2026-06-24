// src/components/dashboard/DashboardSidebar.jsx
'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    Home, 
    Ticket, 
    CreditCard, 
    LogOut, 
    Menu, 
    X, 
    PlusCircle, 
    ClipboardList, 
    Settings, 
    Users, 
    Megaphone,
    TrendingUp 
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

const navItems = {
    user: [
        { label: "Profile", href: "/dashboard/user/profile", icon: Home },
        { label: "My Booked Tickets", href: "/dashboard/user/booked-tickets", icon: Ticket },
        { label: "Transaction History", href: "/dashboard/user/transactions", icon: CreditCard },
    ],
    vender: [
        { label: "Vendor Profile", href: "/dashboard/vender/profile", icon: Home },
        { label: "Add Ticket", href: "/dashboard/vender/add-ticket", icon: PlusCircle },
        { label: "My Added Tickets", href: "/dashboard/vender/my-tickets", icon: Ticket },
        { label: "Requested Bookings", href: "/dashboard/vender/bookings", icon: ClipboardList },
        { label: "Revenue Overview", href: "/dashboard/vender/revenue", icon: TrendingUp }, // টাইপো ফিক্স করা হয়েছে (vendor -> vender)
    ],
    admin: [
        { label: "Admin Profile", href: "/dashboard/admin/profile", icon: Home }, // রাউট ফিক্স করা হয়েছে যাতে ডাইনামিক থাকে
        { label: "Manage Tickets", href: "/dashboard/admin/manage-tickets", icon: Settings },
        { label: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
        { label: "Advertise Tickets", href: "/dashboard/admin/advertise", icon: Megaphone },
    ],
};

export default function DashboardSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div className="p-4 text-xs text-gray-400">Loading...</div>;
    }

    const role = session?.user?.role;
    // যদি রোল 'vender' বা 'user' বা 'admin' এর বাইরে কিছু আসে, ব্যাকআপ হিসেবে খালি অ্যারে
    const items = role ? navItems[role] : [];

    return (
        <>
            {/* মোবাইল ও ট্যাবলেট মেনু বাটন */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2.5 bg-gray-950 text-white rounded-xl border border-white/10 shadow-xl focus:outline-none"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* মোবাইল ব্যাকড্রপ ও ওভারলে */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* মেইন সাইডবার */}
            <aside className={`
                fixed left-0 z-45 w-60 bg-gray-950 text-white flex flex-col py-5 px-4 border border-white/5 rounded-r-2xl lg:rounded-2xl
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0 inset-y-0 h-screen" : "-translate-x-full"} 
                lg:translate-x-0 lg:static lg:h-auto lg:self-stretch lg:w-60
            `}>

                {/* Logo */}
                <div className="flex items-center gap-2 px-2 mb-8 mt-12 lg:mt-0">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-sm font-black text-black">T</div>
                    <span className="font-black text-lg tracking-tight">TicketBari</span>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 flex-1">
                    {items.map(({ label, href, icon: Icon }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? "text-green-400 bg-white/5 font-semibold"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all border-t border-white/5 pt-4 mt-auto">
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </aside>
        </>
    ); 
}