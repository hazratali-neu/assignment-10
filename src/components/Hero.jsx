"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Tag, Headphones, Zap, Star, Users, MapPin, Sparkles } from "lucide-react";
import { FaBus, FaCcAmazonPay } from "react-icons/fa";

export default function Hero() {
  const features = [
    {
      icon: <ShieldCheck size={20} className="text-blue-600" />,
      title: "Secure Booking",
      desc: "100% Safe Payment",
      bg: "bg-blue-50 group-hover:bg-blue-100",
    },
    {
      icon: <Tag size={20} className="text-amber-500" />,
      title: "Best Price",
      desc: "Affordable Tickets",
      bg: "bg-amber-50 group-hover:bg-amber-100",
    },
    {
      icon: <Headphones size={20} className="text-rose-500" />,
      title: "24/7 Support",
      desc: "Always Here For You",
      bg: "bg-rose-50 group-hover:bg-rose-100",
    },
    {
      icon: <Zap size={20} className="text-emerald-500" />,
      title: "Easy Booking",
      desc: "Book Within Minutes",
      bg: "bg-emerald-50 group-hover:bg-emerald-100",
    },
  ];

  const stats = [
    { icon: <Users size={16} className="text-blue-600" />, value: "50K+", label: "Happy Passengers", bg: "bg-blue-50" },
    { icon: <MapPin size={16} className="text-amber-500" />, value: "500+", label: "Routes", bg: "bg-amber-50" },
    { icon: <Star size={16} className="text-rose-500" />, value: "4.9★", label: "Average Rating", bg: "bg-rose-50" },
  ];

  return (
    <section className="relative overflow-hidden flex items-center bg-gradient-to-br from-white via-blue-50 to-blue-100">

      {/* ── Decorative background shapes ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left blue arc */}
        <div className="absolute -top-40 -left-40 w-[580px] h-[580px] rounded-full bg-blue-100 opacity-70 blur-3xl" />
        {/* Bottom-right soft indigo */}
        <div className="absolute -bottom-28 -right-28 w-[440px] h-[440px] rounded-full bg-indigo-100 opacity-60 blur-3xl" />
        {/* Warm accent blob for a touch of warmth */}
        <div className="absolute top-1/3 right-10 w-[260px] h-[260px] rounded-full bg-amber-100 opacity-30 blur-3xl" />
        {/* Centre accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-sky-100 opacity-40 blur-3xl" />
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.3" fill="#3b82f6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-14 w-full">
        <div className="grid lg:grid-cols-2 items-center gap-10">

          {/* ══════════ LEFT ══════════ */}
          <div className="flex flex-col">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 self-start bg-white border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm mb-6 sm:mb-7">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
              </span>
              <FaBus /> Online Ticket Booking Platform
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
            </span>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold leading-[1.1] lg:leading-[1.08] tracking-tight text-gray-900 mb-5 sm:mb-6">
              Book Your Bus<br />
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-600">Ticket Online</span>
                {/* underline accent — two-tone hand-drawn squiggle */}
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 320 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12 C 60 5, 160 5, 318 12"
                    stroke="#fcd34d"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M2 9 C 60 2, 160 2, 318 9"
                    stroke="#93c5fd"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-[15px] sm:text-[17px] leading-relaxed max-w-[480px] mb-8 sm:mb-9">
              Book bus tickets quickly and securely from anywhere in Bangladesh.
              Compare routes, choose your seat, and enjoy a{" "}
              <span className="text-gray-700 font-medium">safe & comfortable</span> journey.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9 sm:mb-10">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group flex items-start gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${f.bg}`}>
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-800">{f.title}</p>
                    <p className="text-[12.5px] text-gray-400 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-9 sm:mb-10">
              <Link href="/tickets" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-7 py-4 rounded-2xl font-semibold text-[15px] shadow-lg shadow-blue-200 transition-all duration-200">
                  Book Now
                  <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-95 text-blue-600 border-2 border-blue-200 hover:border-blue-400 px-7 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-200">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-6 border-t border-blue-100">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2.5">
                  {i > 0 && <div className="hidden sm:block w-px h-8 bg-blue-100 mr-3.5" />}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s.bg}`}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-[17px] font-extrabold text-gray-800 leading-none">{s.value}</p>
                    <p className="text-[11.5px] text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════ RIGHT ══════════ */}
          <div className="relative flex items-center justify-center mt-4 lg:mt-0">

            {/* Soft glow behind image */}
            <div className="absolute inset-0 bg-blue-300 opacity-10 blur-3xl rounded-full scale-90" />

            {/* Floating badge — top left (tilted sticker) */}
            <div className="absolute top-3 left-1 sm:top-4 sm:-left-3 z-20 flex items-center gap-2 sm:gap-2.5 bg-white rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl border border-gray-100 -rotate-3 hover:rotate-0 transition-transform duration-300 animate-[float_3s_ease-in-out_infinite]">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-base sm:text-lg">✅</div>
              <div>
                <p className="text-[12px] sm:text-[13px] font-bold text-gray-800 leading-none">Instant Confirm</p>
                <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">Seat reserved instantly</p>
              </div>
            </div>

            {/* Floating badge — bottom right (tilted sticker) */}
            <div className="absolute bottom-20 right-1 sm:bottom-8 sm:-right-3 z-20 flex items-center gap-2 sm:gap-2.5 bg-white rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl border border-gray-100 rotate-3 hover:rotate-0 transition-transform duration-300 animate-[float_3.5s_ease-in-out_0.5s_infinite]">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 flex items-center justify-center text-base sm:text-lg"><FaCcAmazonPay /></div>
              <div>
                <p className="text-[12px] sm:text-[13px] font-bold text-gray-800 leading-none">Easy Payment</p>
                <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">bKash · Nagad · Card</p>
              </div>
            </div>

            {/* Main image card — organic blob-style frame for a softer, cuter feel */}
            <div className="relative z-10 w-full">

              <div className="relative overflow-hidden rounded-[2.5rem_1rem_2.5rem_1rem] sm:rounded-[3rem_1.25rem_3rem_1.25rem] shadow-2xl border-[3px] border-white ring-1 ring-blue-100">
                <Image
                  src="/baner.jpg"
                  alt="Bus Banner"
                  width={800}
                  height={500}
                  className="w-full h-[260px] sm:h-[320px] md:h-[400px] object-cover"
                  priority
                />
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Caption row */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow">
                    <span className="text-base">🚌</span>
                    <span className="text-[11px] sm:text-[12px] font-bold text-gray-700">AC Sleeper · Dhaka → Chittagong</span>
                  </div>
                  <div className="bg-blue-600 text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow">
                    From ৳ 800
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}