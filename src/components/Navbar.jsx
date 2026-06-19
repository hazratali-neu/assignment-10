"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
  const pathname = usePathname();
  const router = useRouter();

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
        },
      },
    });
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tickets", label: "All Tickets" },
    ...(user ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-600">
            <BsFillBusFrontFill className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              <span className="text-cyan-600">Ticket</span>
              <span className="text-gray-800">Bari</span>
            </h1>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === link.href
                  ? "bg-cyan-50 text-cyan-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-3 md:flex">

          {/* LOADING */}
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span className="text-xs text-gray-500">Loading...</span>
            </div>

          ) : !isLoggedIn ? (
            <>
              <Link href="/register">
                <Button variant="bordered" size="sm">
                  Register
                </Button>
              </Link>

              <Link href="/login">
                <Button size="sm" className="bg-cyan-600 text-white">
                  Login
                </Button>
              </Link>

            </>

          ) : (
            /* USER DROPDOWN */
            <div className="relative group">
              <button className="flex items-center gap-3 rounded-full p-1 hover:bg-gray-50">
                <Avatar>
                  <Avatar.Image src={user?.image} alt={user?.name} />
                  <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                </Avatar>

                <div className="hidden lg:block">
                  <p className="text-sm font-bold">{user?.name}</p>
                  <p className="text-xs text-gray-500">Passenger</p>
                </div>
              </button>

              <div className="absolute right-0 top-12 hidden w-56 flex-col rounded-xl border bg-white shadow-lg group-hover:flex">

                <div className="border-b px-4 py-3">
                  <p className="text-sm font-bold">{user?.name}</p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                >
                  <Person className="h-4 w-4" />
                  Profile
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                >
                  <ArrowRightFromSquare className="h-4 w-4" />
                  Logout
                </button>

              </div>
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
        >
          {open ? <Xmark /> : <Bars />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t px-4 py-3 md:hidden">

          {/* NAV LINKS */}
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 border-t pt-3">

            {/* LOADING */}
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span className="text-xs text-gray-500">Loading...</span>
              </div>

            ) : !isLoggedIn ? (
              <div className="space-y-2">
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full" variant="bordered">
                    Register
                  </Button>
                </Link>

                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-cyan-600 text-white">
                    Login
                  </Button>
                </Link>
              </div>

            ) : (
              <div className="space-y-2">

                <div className="flex items-center gap-3 rounded-lg bg-cyan-50 px-3 py-2">
                  <Avatar>
                    <Avatar.Image src={user?.image} />
                    <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-bold">{user?.name}</p>
                    <p className="text-xs text-gray-500">Passenger</p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
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