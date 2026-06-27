// ============================================================
// LatestTickets.jsx  (frontend / Next.js component)
// ------------------------------------------------------------
// EI FILE TA KOTHAY RAKHBE:
//   src/components/LatestTickets.jsx
//
// TARPOR KIVABE USE KORBE (e.g. app/page.jsx ba Home page e):
//
//   import LatestTickets from '@/components/LatestTickets';
//
//   export default function Home() {
//     return (
//       <div>
//         {/* tomar existing banner/hero section */}
//         <LatestTickets />
//       </div>
//     );
//   }
//
// NICHE "API_URL" change kore tomar actual backend link dao
// ============================================================

"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API_URL = 'http://localhost:8000'; // EKHANE TOMAR BACKEND PORT/URL DAO

const LatestTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/tickets/latest`)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load latest tickets:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-2">Just Added</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
            Latest Tickets
          </h2>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
            <p className="text-slate-400 text-xs tracking-widest animate-pulse">LOADING TICKETS...</p>
          </div>
        ) : !tickets.length ? (
          <div className="text-center text-slate-400 py-16 bg-white/5 backdrop-blur-md rounded-3xl border border-dashed border-slate-700/60 shadow-xl">
            <p className="text-lg font-medium">No tickets available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="group bg-slate-900/80 rounded-3xl shadow-xl hover:shadow-2xl border border-slate-800 hover:border-emerald-500/40 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 relative"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                {/* Image + title overlay */}
                <div className="relative h-52 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.9]"
                  />
                  <span className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md text-teal-400 text-[11px] font-bold px-3 py-1 rounded-full border border-teal-500/30 uppercase tracking-widest">
                    {ticket.transportType}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-5">
                    <h3 className="text-white font-extrabold text-xl truncate uppercase tracking-wide drop-shadow-md">
                      {ticket.title}
                    </h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex-1 flex flex-col justify-between relative z-10">

                  {/* Route */}
                  <div className="flex items-center justify-between font-bold text-white text-sm tracking-wider bg-slate-950/40 border border-slate-800/80 px-4 py-2.5 rounded-2xl mb-4 shadow-inner">
                    <span className="capitalize text-teal-300">{ticket.fromLocation}</span>
                    <div className="flex-1 flex justify-center items-center px-2">
                      <div className="h-[2px] w-full bg-slate-700 relative">
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] text-emerald-400">✈</span>
                      </div>
                    </div>
                    <span className="capitalize text-emerald-300">{ticket.toLocation}</span>
                  </div>

                  {/* Price + availability */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div>
                      <span className="text-2xl font-black text-white">৳{ticket.price}</span>
                      <span className="text-[10px] text-slate-500 block">PER UNIT PRICE</span>
                    </div>
                    <span
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold border ${
                        ticket.quantity > 0
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}
                    >
                      {ticket.quantity > 0 ? `${ticket.quantity} Available` : 'Sold Out'}
                    </span>
                  </div>

                  {/* Departure time */}
                  <div className="bg-slate-950/30 border border-slate-800/50 rounded-2xl p-3 space-y-2 mb-4 text-xs text-slate-400">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Departure Time</span>
                      <span className="font-semibold text-slate-200 bg-slate-800 px-2.5 py-1 rounded-xl text-[11px] border border-slate-700/50">
                        {new Date(ticket.departureDateTime).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Perks */}
                  {ticket.perks?.length > 0 && (
                    <div className="mb-6 px-1">
                      <div className="flex flex-wrap gap-1.5">
                        {ticket.perks.map((perk, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/60 uppercase tracking-wide"
                          >
                            ✦ {perk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* See details */}
                  <Link href={`/tickets/${ticket._id}`}>
                    <button className="w-full text-center bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 font-extrabold py-3 rounded-2xl shadow-[0_4px_20px_rgba(52,211,153,0.15)] hover:shadow-[0_4px_25px_rgba(52,211,153,0.3)] transition-all duration-300 text-sm tracking-wider uppercase">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTickets;