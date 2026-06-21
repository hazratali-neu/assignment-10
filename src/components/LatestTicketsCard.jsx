// src/components/LatestTickets.jsx
import Link from "next/link";
import { FaBus, FaTrain, FaShip, FaCar } from "react-icons/fa";
import { MdConfirmationNumber } from "react-icons/md";

const transportIcon = {
  Bus: <FaBus />,
  Train: <FaTrain />,
  Boat: <FaShip />,
  Jeep: <FaCar />,
};

export default function LatestTickets({ tickets }) {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-blue-50 py-10 px-4">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-semibold text-gray-800">Latest Tickets</h2>
        
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-44 object-cover"
            />

            {/* Body */}
            <div className="p-4 flex flex-col gap-3 flex-1">
              <h3 className="font-medium text-base text-gray-800">
                {ticket.title}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-semibold text-blue-600">
                  ৳{ticket.price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400">/ per unit</span>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MdConfirmationNumber /> {ticket.quantity} tickets
                </span>

                <span className="flex items-center gap-2 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
                  {transportIcon[ticket.transportType]} {ticket.transportType}
                </span>
              </div>

              {/* Perks */}
              <div className="flex flex-wrap gap-1">
                {ticket.perks.map((perk, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md border border-gray-200"
                  >
                    ✓ {perk}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-3 bg-gray-50">
              <Link href={`/tickets/${ticket._id}`}>
                <button className="w-full py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center gap-2">
                   See details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}