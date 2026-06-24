// src/app/dashboard/layout.jsx (অথবা আপনার মেইন লেআউট ফাইল)
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
    return (
        // ১. items-stretch নিশ্চিত করে যে সাইডবার এবং মেইন কনটেন্ট দুটির হাইট সমান হবে
        <div className="flex min-h-screen bg-slate-50 p-4 md:p-6 gap-6 items-stretch">
            
            {/* সাইডবার */}
            <DashboardSidebar />
            
            {/* ডানের মেইন কার্ড বা পেজ কন্টেন্ট */}
            <main className="flex-1 w-full">
                {children}
            </main>
            
        </div>
    );
}