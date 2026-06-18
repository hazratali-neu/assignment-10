"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, Button } from "@heroui/react";

import { BsFillBusFrontFill } from "react-icons/bs";
import {
  Bars,
  Xmark,
  House,
  Ticket,
  LayoutCells,
  Person,
  ArrowRightFromSquare,
} from "@gravity-ui/icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // const user = null;
  const user = {
    name: "Hazrat Ali",
    image: "https://i.pravatar.cc/150?img=12",
  };

  const navLinks = [
    { href: "/", label: "Home", icon: <House className="h-4 w-4" /> },
    { href: "/tickets", label: "All Tickets", icon: <Ticket className="h-4 w-4" /> },
    ...(user
      ? [{ href: "/dashboard", label: "Dashboard", icon: <LayoutCells className="h-4 w-4" /> }]
      : []),
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      {/* TOP BAR */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-600">
            <BsFillBusFrontFill className="text-lg text-white" />
          </div>
          <div className="leading-tight">
            <h1 className="text-xl font-bold">
              <span className="text-cyan-600">Ticket</span>
              <span className="text-gray-800">Bari</span>
            </h1>
            <p className="hidden text-[11px] text-gray-400 sm:block">
              Easy Ticket Booking
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${pathname === href
                ? "bg-cyan-50 text-cyan-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-cyan-600"
                }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE — DESKTOP */}
        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Link href="/register">
                <Button
                  variant="bordered"
                  size="sm"
                  className="font-medium"
                >
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button

                  color="primary"
                  size="sm"
                  className="bg-cyan-600 font-medium hover:bg-cyan-700"
                >
                  Login
                </Button></Link>
            </>
          ) : (
            /* ── HOVER DROPDOWN (Mentora style) ───────────────────────── */
            <div className="relative group">
              {/* Trigger button */}
              <button className="flex items-center gap-3 rounded-full border border-transparent p-1 transition-colors hover:border-gray-200 hover:bg-gray-50">
                {/* <Avatar
                  src={user?.image}
                  name={user?.name}
                  size="sm"
                  isBordered
                  color="primary"
                  className="h-9 w-9 flex-shrink-0"
                /> */}
                <div className="hidden text-left lg:block">
                  <p className="max-w-[100px] truncate text-sm font-bold text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-gray-500">Passenger</p>
                </div>
              </button>

              {/* Dropdown panel — hidden by default, shown on group-hover */}
              <div className="absolute right-0 top-12 z-50 hidden w-56 animate-in fade-in slide-in-from-top-2 flex-col rounded-2xl border border-gray-100 bg-white py-2 shadow-2xl duration-200 group-hover:flex">

                {/* User info header */}
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-sm font-bold text-gray-800">{user.name}</p>
                  <p className="truncate text-xs text-gray-500">passenger@ticketbari.com</p>
                </div>

                {/* My Profile */}
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-cyan-600"
                >
                  <Person className="h-4 w-4" />
                  My Profile
                </Link>

                <div className="my-1 border-t border-gray-100" />

                {/* Logout */}
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50">
                  <ArrowRightFromSquare className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* HAMBURGER — MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t bg-white px-4 pb-4 pt-3 md:hidden">
          <div className="space-y-1">
            {navLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${pathname === href
                  ? "bg-cyan-50 text-cyan-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-cyan-600"
                  }`}
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-3 border-t pt-3">
            {!user ? (
              <div className="space-y-2">
                <Link href="/register">
                  <Button
                    variant="bordered"
                    className="w-full font-medium"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    color="primary"
                    className="w-full bg-cyan-600 font-medium hover:bg-cyan-700"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Mobile user info card */}
                <div className="mb-3 flex items-center gap-3 rounded-xl bg-cyan-50 px-4 py-3">
                  {/* <Avatar
                    src={user.image}
                    name={user.name}
                    size="sm"
                    isBordered
                    color="primary"
                  /> */}
                  <div>
                    <p className="text-sm font-bold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">Passenger Account</p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-cyan-600"
                >
                  <Person className="h-4 w-4" />
                  My Profile
                </Link>

                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50">
                  <ArrowRightFromSquare className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

