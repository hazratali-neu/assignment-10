"use client";

import {
  ShieldCheck,
  Clock3,
  CreditCard,
  Headphones,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: <ShieldCheck size={42} />,
    title: "Secure Booking",
    description:
      "Your bookings and payments are protected with advanced security for a safe ticket purchasing experience.",
  },
  {
    id: 2,
    icon: <Clock3 size={42} />,
    title: "Instant Confirmation",
    description:
      "Book your ticket in seconds and receive instant booking confirmation without any delay.",
  },
  {
    id: 3,
    icon: <CreditCard size={42} />,
    title: "Easy Payment",
    description:
      "Pay securely using Stripe with a fast and smooth checkout process.",
  },
  {
    id: 4,
    icon: <Headphones size={42} />,
    title: "24/7 Customer Support",
    description:
      "Our support team is always available to help you with ticket booking and travel issues.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-[5px] text-emerald-400 font-semibold text-sm">
            Why Choose Us
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Better Travel Starts Here
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            We provide a fast, secure, and hassle-free ticket booking
            experience for buses, trains, and flights across Bangladesh.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-emerald-500 transition-all duration-500 hover:-translate-y-2 shadow-xl"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-black mb-6 group-hover:rotate-12 transition duration-500">
                {feature.icon}
              </div>

              <h3 className="text-white text-xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-slate-400 text-sm leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;