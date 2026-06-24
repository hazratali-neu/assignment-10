"use client";
import { useState, useEffect } from "react";
import {
    Button,
    Card,
    Chip,
    Modal,
    Input,
    Form,
} from "@heroui/react";
import { FaBus, FaTrain, FaShip, FaPlane, FaCar, FaCheckCircle, FaTrash, FaEdit } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { getFetchAddticketData } from "@/lib/api/data";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function MyTicketsClient() {
    const [addTicket, setAddTicket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const TRANSPORT_TYPES = ["Bus", "Train", "Launch", "Flight", "Car"];
    const PERKS = ["AC", "WiFi", "Food", "TV", "Charging Port", "Breakfast"];

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const fetchTickets = () => {
        getFetchAddticketData()
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
        fetchTickets();
    }, []);

    const handleEditClick = (ticket) => {
        setSelectedTicket(ticket);
        reset({
            title: ticket.title,
            fromLocation: ticket.fromLocation,
            toLocation: ticket.toLocation,
            transportType: ticket.transportType,
            price: ticket.price,
            quantity: ticket.quantity,
            departureDateTime: ticket.departureDateTime,
            perks: ticket.perks || []
        });
        setIsEditOpen(true);
    };

    const onUpdateSubmit = async (data) => {
        try {
            const updatedTicket = {
                ...data,
                price: Number(data.price),
                quantity: Number(data.quantity),
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/addticket/${selectedTicket._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTicket)
            });

            const result = await response.json();

            if (result.modifiedCount > 0 || result.matchedCount > 0) {
                toast.success("Ticket updated successfully!");
                setIsEditOpen(false);
                fetchTickets();
            } else {
                toast.info("No changes made.");
                setIsEditOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update ticket.");
        }
    };

    const handleDeleteClick = (ticket) => {
        setSelectedTicket(ticket);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedTicket) return;
        try {
            const response = await fetch(`http://localhost:8000/api/addticket/${selectedTicket._id}`, {
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
                <p className="text-slate-500 text-center mt-10">No tickets found in your database!</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {addTicket.map((ticket) => {
                    const isRejected = ticket.verificationStatus === "rejected";

                    return (
                        <Card
                            key={ticket._id}
                            className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between w-full"
                        >
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
                                        size="sm"
                                        variant="bordered"
                                        className={`font-black text-[10px] rounded px-2 py-0 h-5 ${
                                            ticket.verificationStatus === "approved"
                                                ? "text-emerald-600 border-emerald-300 bg-emerald-50/50"
                                                : isRejected
                                                    ? "text-red-600 border-red-300 bg-red-50/50"
                                                    : "text-slate-700 border-slate-300 bg-slate-50"
                                        }`}
                                    >
                                        {ticket.verificationStatus || "pending"}
                                    </Chip>
                                </div>

                                <div className="flex gap-3 w-full items-center">
                                    <button
                                        onClick={() => !isRejected && handleEditClick(ticket)}
                                        className={`flex-1 font-bold text-white h-9 rounded-lg shadow-sm text-sm ${
                                            isRejected
                                                ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                                                : "bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:opacity-90 cursor-pointer"
                                        }`}
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => !isRejected && handleDeleteClick(ticket)}
                                        className={`font-bold h-9 rounded-lg border bg-white border-slate-800 text-slate-900 px-4 text-sm ${
                                            isRejected
                                                ? "border-slate-200 text-slate-400 cursor-not-allowed"
                                                : "hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-colors cursor-pointer"
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

            {/* ✏️ Update Modal — Add Ticket form এর exact same structure */}
            <Modal isOpen={isEditOpen} onOpenChange={setIsEditOpen} size="3xl">
                <Modal.Backdrop className="backdrop-blur-sm">
                    <Modal.Container>
                        <Modal.Dialog className="w-[95%] md:w-[800px] max-h-[90vh] overflow-y-auto bg-slate-950 border border-white/10 rounded-2xl text-white">
                            <Modal.CloseTrigger />

                            {/* Header */}
                            <Modal.Header className="flex flex-col gap-1 border-b border-white/5 p-6">
                                <Modal.Heading className="text-xl font-bold">
                                    Update Ticket Details
                                </Modal.Heading>
                                <p className="text-xs text-slate-400">
                                    Modify your ticket information below.
                                </p>
                            </Modal.Header>

                            {/* Body */}
                            <Modal.Body className="p-6">
                                <Form
                                    onSubmit={handleSubmit(onUpdateSubmit)}
                                    className="space-y-4 w-full"
                                >
                                    {/* Title */}
                                    <div className="w-full">
                                        <Input
                                            type="text"
                                            label="Ticket Title"
                                            labelPlacement="outside"
                                            placeholder="e.g. Dhaka to Cox's Bazar Express"
                                            variant="bordered"
                                            className="w-full"
                                            classNames={{
                                                inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                            }}
                                            {...register("title", {
                                                required: "Ticket title is required",
                                            })}
                                        />
                                        {errors.title && (
                                            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                                        )}
                                    </div>

                                    {/* From + To */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        <div className="w-full">
                                            <Input
                                                type="text"
                                                label="From (Location)"
                                                labelPlacement="outside"
                                                placeholder="e.g. Dhaka"
                                                variant="bordered"
                                                className="w-full"
                                                classNames={{
                                                    inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                                }}
                                                {...register("fromLocation", {
                                                    required: "Starting location is required",
                                                })}
                                            />
                                            {errors.fromLocation && (
                                                <p className="text-red-500 text-xs mt-1">{errors.fromLocation.message}</p>
                                            )}
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                type="text"
                                                label="To (Location)"
                                                labelPlacement="outside"
                                                placeholder="e.g. Cox's Bazar"
                                                variant="bordered"
                                                className="w-full"
                                                classNames={{
                                                    inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                                }}
                                                {...register("toLocation", {
                                                    required: "Destination is required",
                                                })}
                                            />
                                            {errors.toLocation && (
                                                <p className="text-red-500 text-xs mt-1">{errors.toLocation.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Transport Type */}
                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-200">
                                            Transport Type
                                        </label>
                                        <select
                                            {...register("transportType", {
                                                required: "Transport type is required",
                                            })}
                                            className="w-full bg-slate-900/50 border border-white/10 hover:border-pink-500/50 focus:border-pink-500 p-3 rounded-xl text-slate-200 outline-none h-[44px] text-sm"
                                        >
                                            <option value="" disabled className="bg-slate-900">
                                                Select Transport Type
                                            </option>
                                            {TRANSPORT_TYPES.map((type) => (
                                                <option key={type} value={type} className="bg-slate-900">
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.transportType && (
                                            <p className="text-red-500 text-xs mt-1">{errors.transportType.message}</p>
                                        )}
                                    </div>

                                    {/* Price + Quantity */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        <div className="w-full">
                                            <Input
                                                type="number"
                                                label="Price (per unit)"
                                                labelPlacement="outside"
                                                placeholder="0.00"
                                                variant="bordered"
                                                className="w-full"
                                                classNames={{
                                                    inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                                }}
                                                {...register("price", {
                                                    required: "Price is required",
                                                    valueAsNumber: true,
                                                    min: { value: 0, message: "Price cannot be negative" },
                                                })}
                                            />
                                            {errors.price && (
                                                <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                                            )}
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                type="number"
                                                label="Ticket Quantity"
                                                labelPlacement="outside"
                                                placeholder="100"
                                                variant="bordered"
                                                className="w-full"
                                                classNames={{
                                                    inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                                }}
                                                {...register("quantity", {
                                                    required: "Ticket quantity is required",
                                                    valueAsNumber: true,
                                                    min: { value: 1, message: "Quantity must be at least 1" },
                                                })}
                                            />
                                            {errors.quantity && (
                                                <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Departure Date & Time */}
                                    <div className="w-full">
                                        <Input
                                            type="datetime-local"
                                            label="Departure Date & Time"
                                            labelPlacement="outside"
                                            variant="bordered"
                                            className="w-full"
                                            classNames={{
                                                inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                            }}
                                            {...register("departureDateTime", {
                                                required: "Departure date & time is required",
                                            })}
                                        />
                                        {errors.departureDateTime && (
                                            <p className="text-red-500 text-xs mt-1">{errors.departureDateTime.message}</p>
                                        )}
                                    </div>

                                    {/* Perks */}
                                    <div className="w-full">
                                        <span className="text-sm font-medium text-slate-200">Perks</span>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            {PERKS.map((perk) => (
                                                <label
                                                    key={perk}
                                                    htmlFor={`perk-${perk}`}
                                                    className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer"
                                                >
                                                    <input
                                                        id={`perk-${perk}`}
                                                        type="checkbox"
                                                        value={perk}
                                                        {...register("perks")}
                                                        className="accent-pink-500 w-4 h-4"
                                                    />
                                                    {perk}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer Buttons */}
                                    <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
                                        <Button
                                            variant="flat"
                                            color="danger"
                                            onPress={() => setIsEditOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10"
                                            radius="lg"
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

            {/* 🗑️ Delete Modal */}
            <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen} size="sm">
                <Modal.Backdrop className="backdrop-blur-sm">
                    <Modal.Container>
                        <Modal.Dialog className="w-[95%] sm:max-w-[400px] bg-slate-950 border border-white/10 rounded-2xl text-white">
                            <Modal.CloseTrigger />

                            <Modal.Header className="flex flex-col gap-1 border-b border-white/5 p-6">
                                <div className="flex items-center gap-2 text-red-400">
                                    <FaTrash />
                                    <Modal.Heading className="text-xl font-bold text-white">
                                        Delete Ticket
                                    </Modal.Heading>
                                </div>
                                <p className="text-xs text-slate-400">
                                    This action cannot be undone.
                                </p>
                            </Modal.Header>

                            <Modal.Body className="p-6">
                                <p className="text-sm text-slate-300">
                                    Are you sure you want to delete{" "}
                                    <strong className="text-white">"{selectedTicket?.title}"</strong>?
                                </p>
                            </Modal.Body>

                            <Modal.Footer className="border-t border-white/5 p-6 flex justify-end gap-3">
                                <Button
                                    variant="flat"
                                    color="default"
                                    onPress={() => setIsDeleteOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold"
                                    onPress={handleConfirmDelete}
                                >
                                    Yes, Delete
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
}