"use client";

import { addTicket } from "@/lib/api/addTicket/actions";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import {
    Button,
    Card,
    CardHeader,
    Input,
    Form,
} from "@heroui/react";
import { useRouter } from "next/navigation"; // redirect এর বদলে useRouter ইম্পোর্ট করা হয়েছে
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";

const AddTicketPage = () => {
    const { data: session } = useSession();
    const router = useRouter(); // রাউটার ইনিশিয়ালাইজ করা হলো

    const TRANSPORT_TYPES = ["Bus", "Train", "Launch", "Flight", "Car"];
    const PERKS = ["AC", "WiFi", "Food", "TV", "Charging Port", "Breakfast"];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const imageFile = data.image?.[0];
        const imageUrl = imageFile ? await uploadImage(imageFile) : null;

        delete data?.image;

        const ticketData = {
            ...data,
            price: Number(data.price),
            quantity: Number(data.quantity),
            image: imageUrl,
            vendorName: session?.user?.name,
            vendorEmail: session?.user?.email,
            verificationStatus: "pending",
        };

        const result = await addTicket(ticketData);

        if (result?.insertedId) {
            toast.success("Ticket added successfully...");
            router.push("/dashboard/vender/my-tickets"); 
        } else {
            toast.error(result?.message || "Ticket not created...");
        }
    };

    return (
        <div>
            <div className="mt-6 max-w-3xl">
                <Card
                    className="border border-white/5 backdrop-blur-xl shadow-2xl rounded-2xl"
                    radius="lg"
                >
                    <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
                        <h3 className="text-xl font-bold text-white">
                            Add New Ticket
                        </h3>
                        <p className="text-slate-400 text-xs">
                            Fill in the ticket details below. It will stay in
                            status until an admin verifies it.
                        </p>
                    </CardHeader>

                    <div className="p-6">
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4 w-full"
                        >
                            {/* Ticket title */}
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
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* From + To location */}
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
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.fromLocation.message}
                                        </p>
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
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.toLocation.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Transport type */}
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="transportType" className="text-sm font-medium text-slate-200">
                                    Transport Type
                                </label>
                                <select
                                    id="transportType"
                                    defaultValue=""
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
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.transportType.message}
                                    </p>
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
                                            min: {
                                                value: 0,
                                                message: "Price cannot be negative",
                                            },
                                        })}
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.price.message}
                                        </p>
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
                                            min: {
                                                value: 1,
                                                message: "Quantity must be at least 1",
                                            },
                                        })}
                                    />
                                    {errors.quantity && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.quantity.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Departure date & time */}
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
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.departureDateTime.message}
                                    </p>
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

                            {/* Image upload */}
                            <div className="w-full">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    label="Ticket Image"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    startContent={
                                        <FaImage className="text-slate-400 text-sm" />
                                    }
                                    className="w-full"
                                    classNames={{
                                        inputWrapper: "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                    }}
                                    {...register("image", {
                                        required: "Ticket image is required",
                                    })}
                                />
                                {errors.image && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.image.message}
                                    </p>
                                )}
                            </div>

                            {/* Vendor name + email (read only) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="w-full">
                                    <Input
                                        type="text"
                                        label="Vendor Name"
                                        labelPlacement="outside"
                                        readOnly
                                        value={session?.user?.name || ""}
                                        variant="bordered"
                                        className="w-full"
                                        classNames={{
                                            inputWrapper: "bg-slate-900/50 border-white/10 text-slate-400 cursor-not-allowed"
                                        }}
                                    />
                                </div>

                                <div className="w-full">
                                    <Input
                                        type="text"
                                        label="Vendor Email"
                                        labelPlacement="outside"
                                        readOnly
                                        value={session?.user?.email || ""}
                                        variant="bordered"
                                        className="w-full"
                                        classNames={{
                                            inputWrapper: "bg-slate-900/50 border-white/10 text-slate-400 cursor-not-allowed"
                                        }}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10 mt-4"
                                radius="lg"
                            >
                                Add Ticket
                            </Button>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AddTicketPage;