"use client";

import { useEffect, useState, use } from "react"; 
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import { Button, Card, CardHeader, Input, Form } from "@heroui/react";
import { 
    FaImage, FaTicketAlt, FaMapMarkerAlt, FaTag, 
    FaLayerGroup, FaCalendarAlt, FaUser, FaEnvelope 
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function TicketDetailsUpdatePage({ params }) {
    const { id } = use(params); 
    const router = useRouter();
    const { data: session } = useSession();
    const [loadingTicket, setLoadingTicket] = useState(true);
    const [currentImageUrl, setCurrentImageUrl] = useState("");

    const TRANSPORT_TYPES = ["Bus", "Train", "Launch", "Flight", "Car"];
    const PERKS = ["AC", "WiFi", "Food", "TV", "Charging Port", "Breakfast"];

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            transportType: "",
            perks: [],
            vendorName: "",
            vendorEmail: ""
        }
    });

    const watchedTransportType = watch("transportType");
    const watchedPerks = watch("perks") || [];

    useEffect(() => {
        if (!id) return;
        
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/addticket/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    reset({
                        title: data.title || "",
                        fromLocation: data.fromLocation || "",
                        toLocation: data.toLocation || "",
                        transportType: data.transportType || "",
                        price: data.price || 0,
                        quantity: data.quantity || 0,
                        departureDateTime: data.departureDateTime || "",
                        perks: data.perks || [],
                       
                        vendorName: data.vendorName || session?.user?.name || "",
                        vendorEmail: data.vendorEmail || session?.user?.email || ""
                    });
                    setCurrentImageUrl(data.image || "");
                }
                setLoadingTicket(false);
            })
            .catch((err) => {
                console.error("Error fetching ticket details silently:", err);
                setLoadingTicket(false);
            });
    }, [id, reset, session]);

    const onSubmit = async (data) => {
        try {
            let imageUrl = currentImageUrl;
         
            if (data.image && data.image[0]) {
                imageUrl = await uploadImage(data.image[0]);
            }
            delete data.image;
            const updatedTicketData = {
                title: data.title,
                fromLocation: data.fromLocation,
                toLocation: data.toLocation,
                transportType: data.transportType,
                price: Number(data.price),
                quantity: Number(data.quantity),
                departureDateTime: data.departureDateTime,
                perks: data.perks,
                image: imageUrl,
                verificationStatus: "pending", 
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/addticket/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTicketData)
            });

            const result = await response.json();

            if (result.modifiedCount > 0 || result.matchedCount > 0) {
                toast.success("Ticket updated successfully!");
                router.push("/dashboard/vender/my-tickets"); 
                router.refresh();
            } else {
                toast.info("No changes were made.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating.");
        }
    };

    if (loadingTicket) {
        return <div className="p-10 text-center text-zinc-400 font-bold">Loading parameters...</div>;
    }

    return (
        <div className="p-6 sm:p-10 max-w-5xl mx-auto w-full text-zinc-200 relative min-h-screen font-sans">
            <div className="max-w-3xl mx-auto relative">
                
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <Card className="border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[24px] overflow-hidden" radius="none">
                    <CardHeader className="flex flex-col items-start gap-1.5 p-8 border-b border-zinc-800/60 bg-zinc-950/20">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-2xl text-emerald-400 border border-emerald-500/20 shadow-inner">
                                <FaTicketAlt className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold tracking-tight text-white">
                                    Ticket Management Details
                                </h3>
                                <p className="text-zinc-400 text-xs mt-0.5 font-medium tracking-wide">
                                    Updating asset ID: <span className="text-emerald-400 font-mono">{id}</span>
                                </p>
                            </div>
                        </div>
                    </CardHeader>

                    <div className="p-8">
                        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                            {/* Ticket title */}
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-zinc-300 font-medium text-xs tracking-wide">Ticket Title</label>
                                <Input
                                    type="text"
                                    placeholder="e.g. Silk City Express"
                                    variant="bordered"
                                    startContent={<FaTicketAlt className="text-zinc-500 text-sm mr-1.5 flex-shrink-0" />}
                                    className="w-full"
                                    classNames={{ inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl h-12 text-zinc-100" }}
                                    {...register("title", { required: "Ticket title is required" })}
                                />
                                {errors.title && <p className="text-rose-400 text-xs font-medium mt-0.5">• {errors.title.message}</p>}
                            </div>

                            {/* From + To locations */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">From (Location)</label>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        startContent={<FaMapMarkerAlt className="text-zinc-500 text-sm mr-1.5 flex-shrink-0" />}
                                        classNames={{ inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl h-12 text-zinc-100" }}
                                        {...register("fromLocation", { required: "Starting location is required" })}
                                    />
                                    {errors.fromLocation && <p className="text-rose-400 text-xs font-medium mt-0.5">• {errors.fromLocation.message}</p>}
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">To (Location)</label>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        startContent={<FaMapMarkerAlt className="text-zinc-500 text-sm mr-1.5 flex-shrink-0" />}
                                        classNames={{ inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl h-12 text-zinc-100" }}
                                        {...register("toLocation", { required: "Destination is required" })}
                                    />
                                    {errors.toLocation && <p className="text-rose-400 text-xs font-medium mt-0.5">• {errors.toLocation.message}</p>}
                                </div>
                            </div>

                            {/* Transport type */}
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="transportType" className="text-zinc-300 font-medium text-xs tracking-wide">Transport Type</label>
                                <select
                                    id="transportType"
                                    value={watchedTransportType}
                                    {...register("transportType", { required: "Transport type is required" })}
                                    className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500/80 p-3 rounded-xl text-zinc-300 outline-none h-12 text-sm font-medium transition-all px-4"
                                >
                                    <option value="" disabled className="text-zinc-500">Choose transport segment...</option>
                                    {TRANSPORT_TYPES.map((type) => (
                                        <option key={type} value={type} className="bg-zinc-900 text-zinc-300 py-3">{type}</option>
                                    ))}
                                </select>
                                {errors.transportType && <p className="text-rose-400 text-xs font-medium mt-0.5">• {errors.transportType.message}</p>}
                            </div>

                            {/* Price + Quantity */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">Price (per unit)</label>
                                    <Input
                                        type="number"
                                        variant="bordered"
                                        startContent={<FaTag className="text-zinc-500 text-xs mr-1.5 flex-shrink-0" />}
                                        classNames={{ inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl h-12 text-zinc-100" }}
                                        {...register("price", { required: "Price is required", valueAsNumber: true })}
                                    />
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">Ticket Quantity</label>
                                    <Input
                                        type="number"
                                        variant="bordered"
                                        startContent={<FaLayerGroup className="text-zinc-500 text-xs mr-1.5 flex-shrink-0" />}
                                        classNames={{ inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl h-12 text-zinc-100" }}
                                        {...register("quantity", { required: "Quantity is required", valueAsNumber: true })}
                                    />
                                </div>
                            </div>

                            {/* Departure Date Time */}
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-zinc-300 font-medium text-xs tracking-wide">Departure Date & Time</label>
                                <Input
                                    type="datetime-local"
                                    variant="bordered"
                                    startContent={<FaCalendarAlt className="text-zinc-500 text-sm mr-1.5 flex-shrink-0" />}
                                    classNames={{ inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl h-12 text-zinc-100 cursor-pointer" }}
                                    {...register("departureDateTime", { required: "Departure time is required" })}
                                />
                            </div>

                            {/* Perks Checklist */}
                            <div className="w-full bg-zinc-950/20 p-5 rounded-2xl border border-zinc-800/60 shadow-sm">
                                <span className="text-zinc-300 font-medium text-xs tracking-wide block mb-3 border-b border-zinc-800/80 pb-2">Available Perks & Amenities</span>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {PERKS.map((perk) => (
                                        <label key={perk} htmlFor={`perk-${perk}`} className="flex items-center gap-3 text-zinc-400 text-sm cursor-pointer hover:text-zinc-200 py-1.5 px-2 rounded-lg hover:bg-zinc-800/30 select-none">
                                            <input
                                                id={`perk-${perk}`}
                                                type="checkbox"
                                                value={perk}
                                                checked={watchedPerks.includes(perk)}
                                                {...register("perks")}
                                                className="accent-emerald-500 w-4 h-4 rounded border-zinc-800 bg-zinc-950/50 cursor-pointer"
                                            />
                                            {perk}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Image Attachment */}
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-zinc-300 font-medium text-xs tracking-wide">Ticket Thumbnail Image</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    variant="bordered"
                                    startContent={<FaImage className="text-zinc-500 text-base flex-shrink-0 mr-1.5" />}
                                    classNames={{ inputWrapper: "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700 focus-within:!border-emerald-500/80 rounded-xl h-12 text-zinc-400 py-1 cursor-pointer" }}
                                    {...register("image")}
                                />
                                {currentImageUrl && (
                                    <div className="mt-2 flex items-center gap-3 bg-zinc-950/40 p-2 rounded-xl border border-zinc-800/50 w-fit">
                                        <img src={currentImageUrl} alt="Current Preview" className="w-12 h-12 object-cover rounded-lg" />
                                        <span className="text-xs text-zinc-500">Current active banner</span>
                                    </div>
                                )}
                            </div>

                            {/* Vendor Readonly Info (🔒 এপিআই থেকে ডেটা রেন্ডার হবে, পরিবর্তনযোগ্য নয়) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="w-full flex flex-col gap-2 opacity-60">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">Vendor Name</label>
                                    <Input 
                                        type="text" 
                                        isReadOnly 
                                        variant="bordered" 
                                        startContent={<FaUser className="text-zinc-500 text-sm mr-1.5" />} 
                                        classNames={{ inputWrapper: "bg-zinc-950/10 border-zinc-800 h-12 cursor-not-allowed select-none text-zinc-400" }} 
                                        {...register("vendorName")} 
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-2 opacity-60">
                                    <label className="text-zinc-300 font-medium text-xs tracking-wide">Vendor Email</label>
                                    <Input 
                                        type="email" 
                                        isReadOnly 
                                        variant="bordered" 
                                        startContent={<FaEnvelope className="text-zinc-500 text-sm mr-1.5" />} 
                                        classNames={{ inputWrapper: "bg-zinc-950/10 border-zinc-800 h-12 cursor-not-allowed select-none text-zinc-400" }} 
                                        {...register("vendorEmail")} 
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800/60">
                                <Button 
                                    variant="flat" 
                                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold h-12 px-6 rounded-xl"
                                    onPress={() => router.push("/dashboard/vender/my-tickets")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold h-12 px-8 rounded-xl shadow-lg"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
}