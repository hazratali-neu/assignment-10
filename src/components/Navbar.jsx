"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { Avatar, Button, Spinner } from "@heroui/react";

import { BsFillBusFrontFill } from "react-icons/bs";
import {
  Bars,
  Xmark,
  Person,
  ArrowRightFromSquare,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const user = session?.user;

  const isLoading = isPending;
  const isLoggedIn = !!user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          setOpen(false);
        },
      },
    });
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tickets", label: "All Tickets" },
    ...(user ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  const ThemeToggleButton = () => (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/60 text-slate-300 transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-700/80 hover:text-cyan-400"
    >
      {theme === "dark" ? (
        /* Sun icon */
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      ) : (
        /* Moon icon */
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      )}
    </button>
  );

  return (
    // স্টিকি ডার্ক গ্লাস-মরফিজম ইফেক্ট (Sticky Premium Dark Background)
    <nav className="sticky top-0 z-50 border-b border-slate-900/60 bg-slate-950 backdrop-blur-md text-slate-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/20">
            <BsFillBusFrontFill className="text-xl text-white" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              <span className="text-cyan-400">Ticket</span>
              <span className="text-slate-100">Bari</span>
            </h1>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-3 md:flex">

          {/* DARK/LIGHT TOGGLE — desktop */}
          {mounted && <ThemeToggleButton />}

          {/* LOADING */}
          {isLoading ? (
            <div className="flex items-center gap-2 rounded-xl bg-slate-800/40 px-3 py-1.5 border border-slate-800">
              <Spinner size="sm" color="current" className="text-cyan-400" />
              <span className="text-xs font-medium text-slate-400">Loading...</span>
            </div>

          ) : !isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link href="/register">
                <Button variant="light" size="sm" className="font-semibold text-slate-300 hover:bg-slate-800/60">
                  Register
                </Button>
              </Link>

              <Link href="/login">
                <Button size="sm" className="bg-cyan-500 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-all">
                  Login
                </Button>
              </Link>
            </div>

          ) : (
            /* USER DROPDOWN */
            <div className="relative group">
              <button className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/50 p-1.5 pr-4 shadow-sm transition-all hover:bg-slate-800/80">
                <Avatar size="sm" className="h-8 w-8 ring-2 ring-cyan-500/30">
                  <Avatar.Image src={user?.image} alt={user?.name} />
                  <Avatar.Fallback className="bg-cyan-950 font-bold text-cyan-400">{user?.name?.[0]}</Avatar.Fallback>
                </Avatar>

                <div className="hidden text-left lg:block">
                  <p className="text-xs font-bold text-slate-200">{user?.name}</p>
                  <p className="text-[10px] font-medium text-slate-400">Passenger</p>
                </div>
              </button>

              {/* DROPDOWN MENU */}
              <div className="absolute right-0 top-12 hidden w-56 flex-col rounded-xl border border-slate-800 bg-slate-900 p-1.5 shadow-2xl group-hover:flex">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-medium text-slate-500">Signed in as</p>
                  <p className="text-sm font-bold text-slate-200 truncate">{user?.name}</p>
                </div>

                <Link
                  href={`/dashboard/${session?.user?.role}/profile`}
                  className="flex items-center gap-2 mt-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                >
                  <Person className="h-4 w-4 text-slate-500" />
                  My Profile
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300"
                >
                  <ArrowRightFromSquare className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE: Toggle + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && <ThemeToggleButton />}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl p-2 text-slate-300 hover:bg-slate-800/60"
          >
            {open ? <Xmark className="h-5 w-5" /> : <Bars className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur-md md:hidden animate-in fade-in slide-in-from-top-2 duration-200">

          {/* NAV LINKS */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-cyan-400 border border-slate-800"
                      : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 border-t border-slate-800 pt-4">

            {/* LOADING */}
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 py-2">
                <Spinner size="sm" className="text-cyan-400" />
                <span className="text-xs text-slate-500">Loading...</span>
              </div>

            ) : !isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full font-semibold text-slate-300 border-slate-800 hover:bg-slate-900" variant="bordered">
                    Register
                  </Button>
                </Link>

                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-cyan-500 font-bold text-slate-950 shadow-lg shadow-cyan-500/10">
                    Login
                  </Button>
                </Link>
              </div>

            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                  <Avatar size="sm">
                    <Avatar.Image src={user?.image} />
                    <Avatar.Fallback className="bg-cyan-950 text-cyan-400">{user?.name?.[0]}</Avatar.Fallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-bold text-slate-200">{user?.name}</p>
                    <p className="text-xs font-medium text-slate-500">Passenger</p>
                  </div>
                </div>

                <Link
                  href={`/dashboard/${session?.user?.role}/profile`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-400 hover:bg-slate-900"
                >
                 My Profile
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-red-400 hover:bg-red-950/30"
                >
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