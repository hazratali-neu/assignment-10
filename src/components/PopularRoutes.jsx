"use client";

import Link from "next/link";

const routes = [
  {
    id: 1,
    from: "Dhaka",
    to: "Chattogram",
    price: 850,
    trips: "20+ Daily Trips",
    icon: "🚌",
  },
  {
    id: 2,
    from: "Dhaka",
    to: "Rajshahi",
    price: 650,
    trips: "15+ Daily Trips",
    icon: "🚆",
  },
  {
    id: 3,
    from: "Dhaka",
    to: "Sylhet",
    price: 700,
    trips: "18+ Daily Trips",
    icon: "🚌",
  },
  {
    id: 4,
    from: "Chattogram",
    to: "Cox's Bazar",
    price: 550,
    trips: "25+ Daily Trips",
    icon: "🚌",
  },
  {
    id: 5,
    from: "Khulna",
    to: "Dhaka",
    price: 900,
    trips: "12+ Daily Trips",
    icon: "🚆",
  },
  {
    id: 6,
    from: "Barishal",
    to: "Dhaka",
    price: 750,
    trips: "10+ Daily Trips",
    icon: "⛴️",
  },
];

const PopularRoutes = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-[6px] text-emerald-400 text-sm font-bold">
            Popular Destinations
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Popular Routes
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Discover the most booked travel routes across Bangladesh and book
            your next journey in just a few clicks.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {routes.map((route) => (

            <div
              key={route.id}
              className="group bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-emerald-500 hover:-translate-y-2 duration-300"
            >

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 duration-300">
                {route.icon}
              </div>

              {/* Route */}
              <h3 className="text-2xl font-bold text-white">
                {route.from}
                <span className="text-emerald-400 mx-2">→</span>
                {route.to}
              </h3>

              {/* Price */}
              <div className="mt-6">
                <p className="text-slate-400 text-sm">
                  Starting From
                </p>

                <h4 className="text-4xl font-extrabold text-emerald-400 mt-1">
                  ৳{route.price}
                </h4>
              </div>

              {/* Trips */}
              <div className="mt-5 flex justify-between items-center">

                <span className="text-slate-300 text-sm">
                  {route.trips}
                </span>

                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full">
                  Available
                </span>

              </div>

              {/* Button */}
             
                <button className="w-full mt-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-bold hover:scale-105 duration-300 shadow-lg cursor-pointer">
                  Explore Tickets →
                </button>
              

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default PopularRoutes;