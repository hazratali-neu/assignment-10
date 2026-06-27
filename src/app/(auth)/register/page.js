'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from '@heroui/react';
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { ArrowRight } from 'lucide-react';
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const { data: signUpData, error: signUpError } = await authClient.signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
                image: data.image,
                role: data.role
            });

            if (signUpError || !signUpData) {
                toast.error(signUpError?.message || "Registration failed! Please try again.");
                setLoading(false);
                return;
            }

            if (signUpData) {
                toast.success("Registration successfully!");
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 px-4">
            <div className="w-full max-w-md">
                
               
                <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl shadow-cyan-500/5 px-8 py-10">

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
                            Join <span className="text-cyan-400">Ticket Bari</span>
                        </h2>
                        <p className="text-slate-400 text-sm mt-2">
                            Create your account to book or host events
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                        {/* Full Name */}
                        <div className="w-full">
                            <label className="text-xs font-semibold text-slate-400 ml-1 block mb-1.5">Full Name</label>
                            <Input
                                {...register("name", { required: "Name is required" })}
                                fullWidth
                                disabled={loading}
                                placeholder="Enter your name"
                                startContent={<FaUser className="text-slate-500 text-sm mr-1" />}
                                classNames={{
                                    base: "w-full",
                                    inputWrapper: "w-full bg-slate-950 hover:bg-slate-900 border-2 border-slate-800 focus-within:!border-cyan-500/70 transition-all h-12 rounded-xl"
                                }}
                            />
                            {errors.name && <p className="text-red-500 text-xs ml-1 mt-1">{errors.name.message }</p>}
                        </div>

                        {/* Email */}
                        <div className="w-full">
                            <label className="text-xs font-semibold text-slate-400 ml-1 block mb-1.5">Email Address</label>
                            <Input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                fullWidth
                                disabled={loading}
                                placeholder="name@example.com"
                                startContent={<FaEnvelope className="text-slate-500 text-sm mr-1" />}
                                classNames={{
                                    base: "w-full",
                                    inputWrapper: "w-full bg-slate-950 hover:bg-slate-900 border-2 border-slate-800 focus-within:!border-cyan-500/70 transition-all h-12 rounded-xl"
                                }}
                            />
                            {errors.email && <p className="text-red-500 text-xs ml-1 mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Profile Image URL */}
                        <div className="w-full">
                            <label className="text-xs font-semibold text-slate-400 ml-1 block mb-1.5">Profile Image URL</label>
                            <Input
                                {...register("image", { required: "Image URL is required" })}
                                type="url"
                                fullWidth
                                disabled={loading}
                                placeholder="https://example.com/avatar.jpg"
                                startContent={<FaImage className="text-slate-500 text-sm mr-1" />}
                                classNames={{
                                    base: "w-full",
                                    inputWrapper: "w-full bg-slate-950 hover:bg-slate-900 border-2 border-slate-800 focus-within:!border-cyan-500/70 transition-all h-12 rounded-xl"
                                }}
                            />
                            {errors.image && <p className="text-red-500 text-xs ml-1 mt-1">{errors.image.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="w-full">
                            <label className="text-xs font-semibold text-slate-400 ml-1 block mb-1.5">Password</label>
                            <Input
                                {...register("password", { required: "Password is required" })}
                                type="password"
                                fullWidth
                                disabled={loading}
                                placeholder="••••••••"
                                startContent={<FaLock className="text-slate-500 text-sm mr-1" />}
                                classNames={{
                                    base: "w-full",
                                    inputWrapper: "w-full bg-slate-950 hover:bg-slate-900 border-2 border-slate-800 focus-within:!border-cyan-500/70 transition-all h-12 rounded-xl"
                                }}
                            />
                            {errors.password && <p className="text-red-500 text-xs ml-1 mt-1">{errors.password.message }</p>}
                        </div>

                        {/* Role Select */}
                        <div className="w-full">
                            <label className="text-xs font-semibold text-slate-400 ml-1 block mb-1.5">Sign Up As</label>
                            <div className="relative w-full">
                                <select
                                    {...register("role", { required: "Role is required" })}
                                    defaultValue=""
                                    disabled={loading}
                                    className="w-full h-12 px-4 pr-10 rounded-xl border-2 border-slate-800 hover:border-slate-700 focus:border-cyan-500/70 focus:outline-none transition-all bg-slate-950 text-slate-300 appearance-none cursor-pointer text-sm"
                                >
                                    <option value="" disabled className="bg-slate-900 text-slate-500">Select your role</option>
                                    <option value="user" className="bg-slate-900 text-slate-300">User</option>
                                    <option value="vender" className="bg-slate-900 text-slate-300">Vender</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                            {errors.role && <p className="text-red-500 text-xs ml-1 mt-1">{errors.role.message }</p>}
                        </div>

                        {/* Button সায়ান থিমে প্রিমিয়াম লুক */}
                        <Button
                            type="submit"
                            isLoading={loading}
                            className="w-full h-12 text-base font-bold rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/10 group mt-4 transition-all"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                            {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-cyan-400 font-bold hover:text-cyan-300 transition-all">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}