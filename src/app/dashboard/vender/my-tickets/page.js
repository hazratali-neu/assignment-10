"use client";
import { useState, useEffect } from "react";
import { Card, Chip } from "@heroui/react";
import { FaBus, FaTrain, FaShip, FaPlane, FaCar, FaCheckCircle } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { getFetchAddticketData } from "@/lib/api/data";
import { useSession } from "@/lib/auth-client"; // 
import { toast } from "react-toastify";
import DeleteTicketModal from "@/components/DeleteTicketModal";
import { useRouter } from "next/navigation";

export default function MyTicketsClient() {
    const { data: session } = useSession();
    const [addTicket, setAddTicket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const router = useRouter();

    const fetchTickets = () => {

        if (!session?.user?.email) return;


        getFetchAddticketData(session.user.email)
            .then((data) => {
                setAddTicket(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading tickets:", err);
                setLoading(false);
            });
    };


    useEffect(() => {
        if (session?.user?.email) {
            fetchTickets();
        }
    }, [session]);

    const handleDeleteClick = (ticket) => {
        setSelectedTicket(ticket);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedTicket) return;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/addticket/${selectedTicket._id}`, {
                method: "DELETE"
            });

            const result = await response.json();

            if (result.deletedCount > 0) {
                toast.success("Ticket deleted successfully!");
                setIsDeleteOpen(false);
                fetchTickets();
            } else {
                toast.error("Could not delete ticket.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while deleting.");
        }
    };

    const getTransportIcon = (type) => {
        switch (type?.toLowerCase()) {
            case "bus": return <FaBus className="text-emerald-500" />;
            case "train": return <FaTrain className="text-emerald-500" />;
            case "launch": return <FaShip className="text-emerald-500" />;
            case "flight": return <FaPlane className="text-emerald-500" />;
            default: return <FaCar className="text-emerald-500" />;
        }
    };

    if (loading) {
        return <div className="p-10 text-center font-bold text-slate-600">Loading your tickets...</div>;
    }

    return (
        <div className="w-full min-h-screen bg-slate-50 text-slate-800 p-6">
            <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    Total <span className="text-emerald-500">({addTicket.length})</span> Tickets Added
                </h2>
            </div>

            {addTicket.length === 0 && (
                <p className="text-red-500 text-5xl text-center mt-10">No tickets found!</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {addTicket.map((ticket) => {
                    const isRejected = ticket.verificationStatus === "rejected";

                    return (
                        <Card key={ticket._id} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between w-full">
                            <div>
                                <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center relative mb-4">
                                    {ticket.image ? (
                                        <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-slate-400 text-xs flex flex-col items-center gap-1">
                                            {getTransportIcon(ticket.transportType)}
                                            <span>No Banner Image</span>
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-base font-extrabold text-slate-900 mb-2 tracking-tight">{ticket.title}</h3>

                                <div className="flex justify-between items-center text-sm font-bold mb-3 px-0.5">
                                    <span className="text-amber-600 capitalize">{ticket.fromLocation}</span>
                                    <span className="text-emerald-500 font-black text-base">➔</span>
                                    <span className="text-amber-600 capitalize">{ticket.toLocation}</span>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-slate-700 font-medium mb-3">
                                    {getTransportIcon(ticket.transportType)}
                                    <span className="capitalize">{ticket.transportType}</span>
                                </div>

                                <div className="flex justify-between items-center text-xs mb-4">
                                    <div>
                                        <span className="text-emerald-600 font-bold text-base">৳ {ticket.price}</span>
                                        <span className="text-slate-500 font-medium"> / ticket</span>
                                    </div>
                                    <div className="text-slate-900 font-bold">
                                        Available: <span className="text-slate-700 font-black">{ticket.quantity}</span>
                                    </div>
                                </div>

                                {ticket.perks && ticket.perks.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-slate-500 text-[11px] font-bold mb-1.5 uppercase tracking-wide">Included Perks:</p>
                                        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                                            {ticket.perks.map((perk, idx) => (
                                                <div key={idx} className="flex items-center gap-1 text-xs text-slate-700 font-medium">
                                                    <FaCheckCircle className="text-emerald-500 text-[10px]" />
                                                    <span>{perk}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2 pt-1.5 border-t border-slate-100 text-xs">
                                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                                        <AiOutlineClockCircle className="text-emerald-500 text-sm" />
                                        <span>Departure: {new Date(ticket.departureDateTime).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-3">
                                <div className="flex justify-end">
                                    <Chip
                                        size="md"
                                        variant="solid"
                                        className={`font-bold text-xs rounded-full px-3 py-1 ${ticket.verificationStatus === "approved"
                                                ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                                                : isRejected
                                                    ? "bg-red-100 text-red-700 border border-red-300"
                                                    : "bg-amber-100 text-amber-700 border border-amber-300"
                                            }`}
                                    >
                                        {ticket.verificationStatus || "Pending"}
                                    </Chip>
                                </div>

                                <div className="flex justify-between gap-3 w-full items-center">

                                    <button
                                        disabled={isRejected}
                                        onClick={() => router.push(`/dashboard/vender/my-tickets/${ticket._id}`)}
                                        className={`w-23 font-bold text-white  h-9 rounded-lg shadow-sm text-sm transition-all ${isRejected
                                                ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                                                : "bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:opacity-90 cursor-pointer"
                                            }`}
                                    >
                                        Update
                                    </button>


                                    <button
                                        disabled={isRejected}
                                        onClick={() => handleDeleteClick(ticket)}
                                        className={`font-bold h-9 w-23 rounded-lg border text-sm transition-colors ${isRejected
                                                ? "border-slate-200 text-slate-400 bg-slate-100 cursor-not-allowed"
                                                : "bg-white border-slate-800 text-slate-900 hover:bg-red-50 hover:text-red-600 hover:border-red-600 cursor-pointer"
                                            }`}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <DeleteTicketModal
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
                selectedTicket={selectedTicket}
                handleConfirmDelete={handleConfirmDelete}
            />
        </div>
    );
}