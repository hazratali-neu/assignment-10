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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
    FaImage,
    FaTicketAlt,
    FaMapMarkerAlt,
    FaTag,
    FaLayerGroup,
    FaCalendarAlt,
    FaUser,
    FaEnvelope
} from "react-icons/fa";
import { toast } from "react-toastify";

const AddTicketPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const TRANSPORT_TYPES = ["Bus", "Train", "Launch", "Flight", "Car"];
    const PERKS = ["AC", "WiFi", "Food", "TV", "Charging Port", "Breakfast"];
    const isFraudUser = session?.user?.isFraud === true || session?.user?.role === 'fraud';
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
    // ১. ক্লায়েন্ট সাইডে ফ্রড চেক (UI লেভেল)
    if (isFraudUser) {
        toast.error("Access Denied: Your account is restricted.");
        return;
    }

    // ২. ইমেজ প্রসেসিং
    const imageFile = data.image?.[0];
    const imageUrl = imageFile ? await uploadImage(imageFile) : null;

    // ৩. ডাটা ফরম্যাটিং
    const ticketData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        image: imageUrl,
        vendorName: session?.user?.name,
        vendorEmail: session?.user?.email,
        verificationStatus: "pending",
    };

    // ৪. API কল
    const result = await addTicket(ticketData);

    // ৫. রেসপন্স হ্যান্ডলিং
    if (result && !result.message) { // যদি রেজাল্ট পাওয়া যায় এবং কোনো এরর মেসেজ না থাকে
        toast.success("Ticket added successfully!");
        router.push("/dashboard/vender/my-tickets");
    } else {
        toast.error(result?.message || "Something went wrong!");
    }
};
  

    return (
        <div className="p-6 sm:p-10 max-w-5xl mx-auto w-full text-zinc-200 relative min-h-screen font-sans">
            <div className="max-w-3xl mx-auto relative">

                {/* ব্যাকগ্রাউন্ড গ্লো */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <Card
                    className="border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[24px] overflow-hidden"
                    radius="none"
                >
                    {/* হেডার */}
                    <CardHeader className="flex flex-col items-start gap-1.5 p-8 border-b border-zinc-800/60 bg-zinc-950/20">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-2xl text-emerald-400 border border-emerald-500/20 shadow-inner">
                                <FaTicketAlt className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold tracking-tight text-white">
                                    Create New Ticket
                                </h3>
                                <p className="text-zinc-400 text-xs mt-0.5 font-medium tracking-wide">
                                    Fill up the parameters to listing a new transport asset.
                                </p>
                            </div>
                        </div>
                    </CardHeader>

                    {/* ফর্ম কন্টেন্ট */}
                    <div className="p-8">
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6 w-full"
                        >
                            {/* Ticket title */}
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                    Ticket Title
                                </label>
                                <Input
                                    type="text"
                                    placeholder="e.g. Silk City Express (Dhaka - Rajshahi)"
                                    variant="bordered"
                                    startContent={<FaTicketAlt className="text-zinc-500 text-sm mr-1.5 flex-shrink-0" />}
                                    className="w-full"
                                    classNames={{
                                        inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl transition-all h-12 text-zinc-100"
                                    }}
                                    {...register("title", {
                                        required: "Ticket title is required",
                                    })}
                                />
                                {errors.title && (
                                    <p className="text-rose-400 text-xs font-medium mt-0.5 flex items-center gap-1">
                                        • {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* From + To location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                {/* From Location */}
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                        From (Location)
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. Dhaka"
                                        variant="bordered"
                                        startContent={<FaMapMarkerAlt className="text-zinc-500 text-sm mr-1.5 flex-shrink-0" />}
                                        className="w-full"
                                        classNames={{
                                            inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl transition-all h-12 text-zinc-100"
                                        }}
                                        {...register("fromLocation", {
                                            required: "Starting location is required",
                                        })}
                                    />
                                    {errors.fromLocation && (
                                        <p className="text-rose-400 text-xs font-medium mt-0.5">
                                            • {errors.fromLocation.message}
                                        </p>
                                    )}
                                </div>

                                {/* To Location */}
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                        To (Location)
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. Cox's Bazar"
                                        variant="bordered"
                                        startContent={<FaMapMarkerAlt className="text-zinc-500 text-sm mr-1.5 flex-shrink-0" />}
                                        className="w-full"
                                        classNames={{
                                            inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl transition-all h-12 text-zinc-100"
                                        }}
                                        {...register("toLocation", {
                                            required: "Destination is required",
                                        })}
                                    />
                                    {errors.toLocation && (
                                        <p className="text-rose-400 text-xs font-medium mt-0.5">
                                            • {errors.toLocation.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Transport type */}
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="transportType" className="text-zinc-300 font-medium text-xs tracking-wide">
                                    Transport Type
                                </label>
                                <select
                                    id="transportType"
                                    defaultValue=""
                                    {...register("transportType", {
                                        required: "Transport type is required",
                                    })}
                                    className="w-full bg-zinc-950/30 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500/80 p-3 rounded-xl text-zinc-300 outline-none h-12 text-sm font-medium transition-all cursor-pointer px-4"
                                >
                                    <option value="" disabled className="bg-zinc-900 text-zinc-500">
                                        Choose transport segment...
                                    </option>
                                    {TRANSPORT_TYPES.map((type) => (
                                        <option key={type} value={type} className="bg-zinc-900 text-zinc-300 py-3">
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {errors.transportType && (
                                    <p className="text-rose-400 text-xs font-medium mt-0.5">
                                        • {errors.transportType.message}
                                    </p>
                                )}
                            </div>

                            {/* Price + Quantity */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                {/* Price */}
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                        Price (per unit)
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        variant="bordered"
                                        startContent={<FaTag className="text-zinc-500 text-xs mr-1.5 flex-shrink-0" />}
                                        className="w-full"
                                        classNames={{
                                            inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl transition-all h-12 text-zinc-100"
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
                                        <p className="text-rose-400 text-xs font-medium mt-0.5">
                                            • {errors.price.message}
                                        </p>
                                    )}
                                </div>

                                {/* Quantity */}
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                        Ticket Quantity
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="100"
                                        variant="bordered"
                                        startContent={<FaLayerGroup className="text-zinc-500 text-xs mr-1.5 flex-shrink-0" />}
                                        className="w-full"
                                        classNames={{
                                            inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl transition-all h-12 text-zinc-100"
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
                                        <p className="text-rose-400 text-xs font-medium mt-0.5">
                                            • {errors.quantity.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Departure date & time */}
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                    Departure Date & Time
                                </label>
                                <Input
                                    type="datetime-local"
                                    variant="bordered"
                                    startContent={<FaCalendarAlt className="text-zinc-500 text-sm mr-1.5 flex-shrink-0" />}
                                    className="w-full"
                                    classNames={{
                                        inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl transition-all h-12 text-zinc-100 cursor-pointer"
                                    }}
                                    {...register("departureDateTime", {
                                        required: "Departure date & time is required",
                                    })}
                                />
                                {errors.departureDateTime && (
                                    <p className="text-rose-400 text-xs font-medium mt-0.5">
                                        • {errors.departureDateTime.message}
                                    </p>
                                )}
                            </div>

                            {/* Perks */}
                            <div className="w-full bg-zinc-950/20 p-5 rounded-2xl border border-zinc-800/60 shadow-sm">
                                <span className="text-zinc-300 font-medium text-xs tracking-wide block mb-3 border-b border-zinc-800/80 pb-2">
                                    Available Perks & Amenities
                                </span>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {PERKS.map((perk) => (
                                        <label
                                            key={perk}
                                            htmlFor={`perk-${perk}`}
                                            className="flex items-center gap-3 text-zinc-400 text-sm cursor-pointer hover:text-zinc-200 transition-colors py-1.5 px-2 rounded-lg hover:bg-zinc-800/30 select-none"
                                        >
                                            <input
                                                id={`perk-${perk}`}
                                                type="checkbox"
                                                value={perk}
                                                {...register("perks")}
                                                className="accent-emerald-500 w-4 h-4 rounded border-zinc-800 bg-zinc-950/50 cursor-pointer"
                                            />
                                            {perk}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Image upload */}
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-zinc-300 font-medium text-xs tracking-wide">
                                    Ticket Thumbnail Image
                                </label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    variant="bordered"
                                    startContent={
                                        <FaImage className="text-zinc-500 text-base flex-shrink-0 mr-1.5" />
                                    }
                                    className="w-full"
                                    classNames={{
                                        inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl transition-all h-12 text-zinc-400 cursor-pointer py-1"
                                    }}
                                    {...register("image", {
                                        required: "Ticket image is required",
                                    })}
                                />
                                {errors.image && (
                                    <p className="text-rose-400 text-xs font-medium mt-0.5">
                                        • {errors.image.message}
                                    </p>
                                )}
                            </div>

                            {/* Vendor info (Readonly) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-2 border-t border-zinc-800/40">
                                {/* Vendor Profile */}
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-zinc-500 font-medium text-xs tracking-wide">
                                        Vendor Profile
                                    </label>
                                    <Input
                                        type="text"
                                        readOnly
                                        value={session?.user?.name || "Unauthorized Vendor"}
                                        variant="bordered"
                                        startContent={<FaUser className="text-zinc-600 text-xs mr-1.5 flex-shrink-0" />}
                                        className="w-full"
                                        classNames={{
                                            inputWrapper: "bg-zinc-950/10 border-zinc-900 text-zinc-400 cursor-not-allowed rounded-xl h-12"
                                        }}
                                    />
                                </div>

                                {/* Vendor Email */}
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-zinc-500 font-medium text-xs tracking-wide">
                                        Vendor Email Address
                                    </label>
                                    <Input
                                        type="text"
                                        readOnly
                                        value={session?.user?.email || "No session attached"}
                                        variant="bordered"
                                        startContent={<FaEnvelope className="text-zinc-600 text-xs mr-1.5 flex-shrink-0" />}
                                        className="w-full"
                                        classNames={{
                                            inputWrapper: "bg-zinc-950/10 border-zinc-900 text-zinc-400 cursor-not-allowed rounded-xl h-12"
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 flex justify-end w-full">
                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    // বাটন ডিজেবল হবে যদি সাবমিটিং হয় অথবা ইউজার ফ্রড হয়
                                    disabled={isSubmitting || isFraudUser}
                                    className={`w-full sm:w-auto h-12 px-10 rounded-xl transition-all duration-300 font-semibold text-sm ${isFraudUser
                                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" // ফ্রড হলে গ্রে কালার
                                            : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950"
                                        }`}
                                >
                                    {isFraudUser
                                        ? "Account Restricted" // বাটন টেক্সট বদলে যাবে
                                        : isSubmitting ? "Publishing..." : "Publish Asset Ticket"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AddTicketPage;

