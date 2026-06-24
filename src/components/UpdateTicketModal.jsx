"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, Input, Form } from "@heroui/react";

export default function UpdateTicketModal({ isOpen, setIsOpen, selectedTicket, onUpdateSubmit, TRANSPORT_TYPES, PERKS }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // যখনই selectedTicket পরিবর্তন হবে, ফর্মের ডিফল্ট ভ্যালু আপডেট হবে
    useEffect(() => {
        if (selectedTicket) {
            reset({
                title: selectedTicket.title,
                fromLocation: selectedTicket.fromLocation,
                toLocation: selectedTicket.toLocation,
                transportType: selectedTicket.transportType,
                price: selectedTicket.price,
                quantity: selectedTicket.quantity,
                departureDateTime: selectedTicket.departureDateTime,
                perks: selectedTicket.perks || []
            });
        }
    }, [selectedTicket, reset]);

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="3xl">
            <Modal.Backdrop className="backdrop-blur-sm">
                <Modal.Container>
                    <Modal.Dialog className="w-[95%] md:w-[800px] max-h-[90vh] overflow-y-auto bg-slate-950 border border-white/10 rounded-2xl text-white">
                        <Modal.CloseTrigger />

                        <Modal.Header className="flex flex-col gap-1 border-b border-white/5 p-6">
                            <Modal.Heading className="text-xl font-bold">
                                Update Ticket Details
                            </Modal.Heading>
                            <p className="text-xs text-slate-400">
                                Modify your ticket information below.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4 w-full">
                                {/* Title */}
                                <div className="w-full">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                        Ticket Title
                                    </label>
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
                                        {...register("title", { required: "Ticket title is required" })}
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                                </div>

                                {/* From + To */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="w-full">
                                        <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                            From (Location)
                                        </label>
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
                                            {...register("fromLocation", { required: "Starting location is required" })}
                                        />
                                        {errors.fromLocation && <p className="text-red-500 text-xs mt-1">{errors.fromLocation.message}</p>}
                                    </div>

                                    <div className="w-full">
                                        <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                            To (Location)
                                        </label>
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
                                            {...register("toLocation", { required: "Destination is required" })}
                                        />
                                        {errors.toLocation && <p className="text-red-500 text-xs mt-1">{errors.toLocation.message}</p>}
                                    </div>
                                </div>

                                {/* Transport Type */}
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-200">Transport Type</label>
                                    <select
                                        {...register("transportType", { required: "Transport type is required" })}
                                        className="w-full bg-slate-900/50 border border-white/10 hover:border-pink-500/50 focus:border-pink-500 p-3 rounded-xl text-slate-200 outline-none h-[44px] text-sm"
                                    >
                                        <option value="" disabled className="bg-slate-900">Select Transport Type</option>
                                        {TRANSPORT_TYPES.map((type) => (
                                            <option key={type} value={type} className="bg-slate-900">{type}</option>
                                        ))}
                                    </select>
                                    {errors.transportType && <p className="text-red-500 text-xs mt-1">{errors.transportType.message}</p>}
                                </div>

                                {/* Price + Quantity */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="w-full">
                                        <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                            Price (per unit)
                                        </label>
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
                                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                                    </div>

                                    <div className="w-full">
                                        <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                            Ticket Quantity
                                        </label>
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
                                        {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
                                    </div>
                                </div>

                                {/* Departure Date & Time */}
                                <div className="w-full">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                        Departure Date & Time
                                    </label>
                                    <Input
                                        type="datetime-local"
                                        label="Departure Date & Time"
                                        labelPlacement="outside"
                                        variant="bordered"
                                        className="w-full"
                                        classNames={{
                                            inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                        }}
                                        {...register("departureDateTime", { required: "Departure date & time is required" })}
                                    />
                                    {errors.departureDateTime && <p className="text-red-500 text-xs mt-1">{errors.departureDateTime.message}</p>}
                                </div>

                                {/* Perks */}
                                <div className="w-full">
                                    <span className="text-sm font-medium text-slate-200">Perks</span>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {PERKS.map((perk) => (
                                            <label key={perk} htmlFor={`perk-${perk}`} className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
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
                                    <Button variant="flat" color="danger" onPress={() => setIsOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10" radius="lg">
                                        Save Changes
                                    </Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}