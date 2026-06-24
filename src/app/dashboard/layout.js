
import DashboardSidebar from "@/components/DashboardSidebar";
export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row p-0 lg:p-4 gap-0 lg:gap-4">
            {/* সাইডবার */}
            <DashboardSidebar />
            
            {/* মেইন কনটেন্ট এরিয়া */}
            <main className="flex-1 bg-gray-950/40 lg:bg-gray-950 border-0 lg:border border-white/5 rounded-none lg:rounded-2xl min-h-screen lg:min-h-auto pt-24 pb-12 lg:py-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}