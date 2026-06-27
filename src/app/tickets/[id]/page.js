'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authClient } from "@/lib/auth-client"; 

const TicketDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = authClient.useSession(); 

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingQuantity, setBookingQuantity] = useState(1);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [existingBooking, setExistingBooking] = useState(null);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

    const userRole = session?.user?.role;
    const isAdminOrVendor = userRole === 'admin' || userRole === 'vendor' || userRole === 'vender';
    const isCustomer = session?.user && !isAdminOrVendor;

    const fetchTicketAndBookingData = async () => {
        try {
            const ticketRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tickets/${id}`);
            const ticketData = await ticketRes.json();
            setTicket(ticketData);

            if (session?.user?.email) {
                const bookingRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookings?email=${session.user.email}`);
                const bookings = await bookingRes.json();
                
                if (Array.isArray(bookings)) {
                    const userBooking = bookings.find(b => b.ticketId === id);
                    if (userBooking) {
                        setExistingBooking(userBooking);
                    } else {
                        setExistingBooking(null);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchTicketAndBookingData();
        }
    }, [id, session]);

    useEffect(() => {
        if (!ticket?.departureDateTime) return;

        const timer = setInterval(() => {
            const departureTime = new Date(ticket.departureDateTime).getTime();
            const now = new Date().getTime();
            const difference = departureTime - now;

            if (difference <= 0) {
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
                clearInterval(timer);
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setCountdown({ days, hours, minutes, seconds, isExpired: false });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [ticket]);

    // বুকিং হ্যান্ডলার
    const handleConfirmBooking = async () => {
        if (!session?.user) {
            toast.error("Please login first to book a ticket!", { theme: "dark" });
            return;
        }

        if (!isCustomer) {
            toast.error("Only logged-in customers can book tickets!", { theme: "dark" });
            return;
        }

        const quantityNum = parseInt(bookingQuantity);
        if (!quantityNum || quantityNum < 1 || quantityNum > ticket.quantity) {
            toast.error("Invalid ticket quantity!", { theme: "dark" });
            return;
        }

        try {
            setBookingLoading(true);

            const bookingPayload = {
                ticketId: ticket._id,
                title: ticket.title,
                image: ticket.image,
                fromLocation: ticket.fromLocation,
                toLocation: ticket.toLocation,
                departureDateTime: ticket.departureDateTime,
                unitPrice: ticket.price,
                bookingQuantity: quantityNum,
                totalPrice: ticket.price * quantityNum,
                userId: session.user.id,
                userEmail: session.user.email,
                userName: session.user.name,
                vendorEmail: ticket.vendorEmail || "vendor@gmail.com",
                status: "pending"
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload)
            });

            const result = await response.json();

            if (response.ok || result.insertedId) {
                toast.success(`"${ticket?.title}" Booking Request Sent!`, { theme: "dark" });
                setIsModalOpen(false);
                
               
                setTimeout(() => {
                    router.push('/dashboard/user/booked-tickets');
                }, 1500);

            } else {
                toast.error(result.message || "Booking failed on server!", { theme: "dark" });
            }
        } catch (error) {
            console.error("Booking submit error:", error);
            toast.error("Connection error!", { theme: "dark" });
        } finally {
            setBookingLoading(false);
        }
    };

    const handlePayment = async (bookingId) => {
        try {
            const paymentPayload = {
                bookingId: bookingId || existingBooking?._id,
                title: ticket?.title,
                price: ticket?.price,
                quantity: existingBooking ? existingBooking.bookingQuantity : parseInt(bookingQuantity)
            };

            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentPayload)
            });

            const data = await response.json();

            if (data.url) {
               
                window.location.href = data.url;
            } else {
                toast.error(data.error || "Could not initiate Stripe session.", { theme: "dark" });
            }
        } catch (error) {
            console.error("Stripe payment error:", error);
            toast.error("Stripe Connection Error!", { theme: "dark" });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center">
                <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-emerald-400"></div>
            </div>
        );
    }

    if (!ticket) {
        return <div className="min-h-screen bg-slate-950 text-white text-center py-20">Ticket not found!</div>;
    }

    const isBookNowDisabled = countdown.isExpired || ticket.quantity === 0;

    const getButtonText = () => {
        if (ticket.quantity === 0) return "Out Of Stock";
        if (countdown.isExpired) return "Booking Closed";
        return "Book Now";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 py-12 px-4 md:px-10 text-slate-100 flex items-center justify-center relative">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="max-w-4xl w-full bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* ইমেজ ও কাউন্টডাউন */}
                <div className="relative h-64 md:h-full min-h-[300px] bg-slate-950">
                    <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover brightness-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                        <p className="text-xs font-bold text-teal-400 tracking-widest uppercase mb-2">Departure Countdown</p>
                        {countdown.isExpired ? (
                            <span className="text-rose-400 font-extrabold text-2xl tracking-wide bg-rose-500/10 border border-rose-500/30 px-4 py-2 rounded-xl text-center">
                                EXPIRED / DEPARTED
                            </span>
                        ) : (
                            <div className="grid grid-cols-4 gap-2 text-center bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800">
                                <div>
                                    <span className="text-xl font-black text-white block">{countdown.days}</span>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase">Days</span>
                                </div>
                                <div>
                                    <span className="text-xl font-black text-white block">{countdown.hours}</span>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase">Hrs</span>
                                </div>
                                <div>
                                    <span className="text-xl font-black text-white block">{countdown.minutes}</span>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase">Min</span>
                                </div>
                                <div>
                                    <span className="text-xl font-black text-white block">{countdown.seconds}</span>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase">Sec</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* বিবরণ ও ডাইনামিক অ্যাকশন বাটন */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                            {ticket.transportType || "Bus"} Fleet
                        </span>
                        <h1 className="text-3xl font-black text-white uppercase tracking-wide mt-2 mb-4">{ticket.title}</h1>

                        <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-2xl mb-5 flex justify-between items-center text-sm font-bold">
                            <div>
                                <p className="text-[10px] text-slate-500 font-medium uppercase">From</p>
                                <span className="text-teal-300 capitalize text-base">{ticket.fromLocation}</span>
                            </div>
                            <div className="text-slate-600 font-light">➔</div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-500 font-medium uppercase">To</p>
                                <span className="text-emerald-300 capitalize text-base">{ticket.toLocation}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                            <div className="bg-slate-950/20 p-3 rounded-xl border border-slate-800/60">
                                <p className="text-slate-500 mb-0.5">Price Per Ticket</p>
                                <span className="text-lg font-black text-white">৳{ticket.price}</span>
                            </div>
                            <div className="bg-slate-950/20 p-3 rounded-xl border border-slate-800/60">
                                <p className="text-slate-500 mb-0.5">Available Seats</p>
                                <span className={`text-lg font-black ${ticket.quantity > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {ticket.quantity} Seats
                                </span>
                            </div>
                        </div>
                    </div>

                    {isCustomer && (
                        <div className="w-full">
                            {existingBooking ? (
                                <>
                                    {existingBooking.status === 'pending' && (
                                        <button disabled className="w-full py-3.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-2xl font-extrabold text-sm tracking-wider uppercase cursor-not-allowed italic">
                                            Pending Vendor Approval...
                                        </button>
                                    )}

                                    {existingBooking.status === 'accepted' && (
                                        <button 
                                            onClick={() => handlePayment(existingBooking._id)}
                                            className="w-full py-3.5 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-500 text-slate-950 rounded-2xl font-black text-sm tracking-wider uppercase shadow-xl hover:opacity-95 transition-all"
                                        >
                                            Pay Now (৳{existingBooking.totalPrice})
                                        </button>
                                    )}

                                    {existingBooking.status === 'paid' && (
                                        <button disabled className="w-full py-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl font-extrabold text-sm tracking-wider uppercase cursor-not-allowed">
                                            Already Paid & Booked ✓
                                        </button>
                                    )}

                                    {existingBooking.status === 'rejected' && (
                                        <button disabled className="w-full py-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl font-extrabold text-sm tracking-wider uppercase cursor-not-allowed">
                                            Booking Request Rejected
                                        </button>
                                    )}
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    disabled={isBookNowDisabled}
                                    className={`w-full py-3.5 rounded-2xl font-extrabold text-sm tracking-wider uppercase transition-all duration-300 ${isBookNowDisabled
                                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 shadow-lg hover:shadow-emerald-500/20'
                                        }`}
                                >
                                    {getButtonText()}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* --- মডাল --- */}
            {isModalOpen && isCustomer && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-white/10 p-6 rounded-3xl max-w-md w-full shadow-2xl relative">
                        <h3 className="text-xl font-black text-white uppercase tracking-wide mb-2">Confirm Your Booking</h3>
                        <p className="text-slate-400 text-xs mb-5">Enter how many tickets you want to purchase.</p>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">Ticket Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={ticket.quantity}
                                    value={bookingQuantity}
                                    onChange={(e) => setBookingQuantity(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-bold"
                                    required
                                />
                                <span className="text-[11px] text-slate-500 mt-1 block">Maximum available: {ticket.quantity} seats</span>
                            </div>

                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                                <span className="text-xs text-slate-400 font-medium">Estimated Total:</span>
                                <span className="text-xl font-black text-emerald-400">৳{ticket.price * (bookingQuantity || 0)}</span>
                            </div>

                            <div className="flex space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={bookingLoading}
                                    className="w-1/2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleConfirmBooking}
                                    disabled={bookingLoading}
                                    className="w-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider hover:from-emerald-600 transition-all flex justify-center items-center disabled:opacity-50"
                                >
                                    {bookingLoading ? "Processing..." : "Confirm Booking"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketDetails;