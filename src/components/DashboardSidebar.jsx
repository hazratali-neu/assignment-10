"use client";

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
  TrendingUp,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

const navItems = {
  user: [
    {
      label: "Profile",
      href: "/dashboard/user/profile",
      icon: Home,
    },
    {
      label: "My Booked Tickets",
      href: "/dashboard/user/booked-tickets",
      icon: Ticket,
    },
    {
      label: "Transaction History",
      href: "/dashboard/user/transactions",
      icon: CreditCard,
    },
  ],
    fraud: [
    {
      label: "Vendor Profile",
      href: "/dashboard/vender/profile",
      icon: Home,
    },
    {
      label: "Add Ticket",
      href: "/dashboard/vender/add-ticket",
      icon: PlusCircle,
    },
    {
      label: "My Added Tickets",
      href: "/dashboard/vender/my-tickets",
      icon: Ticket,
    },
    {
      label: "Requested Bookings",
      href: "/dashboard/vender/bookings",
      icon: ClipboardList,
    },
    {
      label: "Revenue Overview",
      href: "/dashboard/vender/revenue",
      icon: TrendingUp,
    },
  ],

  vender: [
    {
      label: "Vendor Profile",
      href: "/dashboard/vender/profile",
      icon: Home,
    },
    {
      label: "Add Ticket",
      href: "/dashboard/vender/add-ticket",
      icon: PlusCircle,
    },
    {
      label: "My Added Tickets",
      href: "/dashboard/vender/my-tickets",
      icon: Ticket,
    },
    {
      label: "Requested Bookings",
      href: "/dashboard/vender/bookings",
      icon: ClipboardList,
    },
    {
      label: "Revenue Overview",
      href: "/dashboard/vender/revenue",
      icon: TrendingUp,
    },
  ],

  admin: [
    {
      label: "Admin Profile",
      href: "/dashboard/admin/profile",
      icon: Home,
    },
    {
      label: "Manage Tickets",
      href: "/dashboard/admin/manage-tickets",
      icon: Settings,
    },
    {
      label: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: Users,
    },
    {
      label: "Advertise Tickets",
      href: "/dashboard/admin/advertise",
      icon: Megaphone,
    },
  ],
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="p-4 text-slate-400 text-sm">
        Loading...
      </div>
    );
  }

  const role = session?.user?.role;
  const items = role ? navItems[role] : [];

  return (
    <>
      {/* Mobile Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 bg-slate-900 text-white rounded-xl shadow-xl border border-white/10"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 z-50
          w-60
          bg-slate-900
          text-white
          flex flex-col
          py-5
          px-4
          border-r border-slate-700
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0 inset-y-0 h-screen"
              : "-translate-x-full"
          }
          lg:translate-x-0
          lg:static
          lg:h-auto
          lg:self-stretch
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 mt-12 lg:mt-0 px-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-900 font-black">
            T
          </div>

          <span className="text-xl font-extrabold tracking-wide">
            TicketBari
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {items?.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border-l-4 border-cyan-400 shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl border-t border-slate-700 text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-300"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>
    </>
  );
}