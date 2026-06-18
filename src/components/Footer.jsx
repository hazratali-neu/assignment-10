"use client";

import Link from "next/link";

import { BsFillBusFrontFill } from "react-icons/bs";
import {
  Envelope,
//   Phone,
  ArrowUpRightFromSquare,
} from "@gravity-ui/icons";

import { FaFacebook, FaCcStripe,FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-cyan-500"
            >
              <BsFillBusFrontFill className="text-3xl" />
              TicketBari
            </Link>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              Book bus, train, launch & flight tickets easily from anywhere.
              Fast, secure and hassle-free ticket booking platform.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link
                href="/"
                className="block transition hover:text-cyan-400"
              >
                Home
              </Link>

              <Link
                href="/tickets"
                className="block transition hover:text-cyan-400"
              >
                All Tickets
              </Link>

              <Link
                href="/contact"
                className="block transition hover:text-cyan-400"
              >
                Contact Us
              </Link>

              <Link
                href="/about"
                className="block transition hover:text-cyan-400"
              >
                About
              </Link>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact Info
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Envelope className="h-5 w-5 text-cyan-500" />
                <span>support@ticketbari.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="h-5 w-5 text-cyan-500" />
                <span>+880 1785-474189</span>
              </div>

              <a
                href="https://facebook.com"
                target="_blank"
                className="flex items-center gap-3 transition hover:text-cyan-400"
              >
                <FaFacebook className="text-lg text-cyan-500" />
                <span>Facebook Page</span>
                <ArrowUpRightFromSquare className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Payment Methods
            </h3>

            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
              <FaCcStripe className="text-4xl text-violet-500" />

              <div>
                <h4 className="font-medium text-white">Stripe</h4>
                <p className="text-sm text-slate-400">
                  Secure online payments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-sm text-slate-400 md:flex-row">
          <p>© 2025 TicketBari. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cyan-400">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-cyan-400">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}