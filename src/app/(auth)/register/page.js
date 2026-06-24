'use client';

import Link from "next/link";
import { Button, Input } from '@heroui/react';
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { ArrowRight } from 'lucide-react';
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";


export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { data: signUpData, error: signUpError } = await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            image: data.image,
            role: data.role
        });
        if (signUpError) {
            toast.error("Registration failed");
        } else {
            toast.success("Registration successfully");  // ← error থেকে success
            redirect("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950  py-8 px-4">
            <div className="w-full max-w-lg">
                <div className="bg-slate-200 border border-white/5 backdrop-blur-xl rounded-3xl shadow-2xl px-10 py-8">

                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            Join <span className="text-blue-600">Ticketo</span>
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Create your account to book or host events
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                        {/* Full Name */}
                        <div>
                            <label className="text-xs font-bold text-slate-600 ml-1 block mb-1">Full Name</label>
                            <Input
                                {...register("name", { required: "Name is required" })}
                                placeholder="Enter your name"
                                startContent={<FaUser className="text-slate-400 text-sm" />}
                                className="border-2 border-slate-200 hover:border-blue-500/50 focus-within:border-blue-600 transition-all h-12 bg-white w-full rounded-xl"
                            />
                            {errors.name && <p className="text-red-500 text-xs ml-1 mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-xs font-bold text-slate-600 ml-1 block mb-1">Email Address</label>
                            <Input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                placeholder="Enter your email"
                                startContent={<FaEnvelope className="text-slate-400 text-sm" />}
                                className="border-2 border-slate-200 hover:border-blue-500/50 focus-within:border-blue-600 transition-all h-12 bg-white w-full rounded-xl"
                            />
                            {errors.email && <p className="text-red-500 text-xs ml-1 mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Profile Image URL */}
                        <div>
                            <label className="text-xs font-bold text-slate-600 ml-1 block mb-1">Profile Image URL</label>
                            <Input
                                {...register("image", { required: "Image URL is required" })}
                                type="url"
                                placeholder="https://example.com/avatar.jpg"
                                startContent={<FaImage className="text-slate-400 text-sm" />}
                                className="border-2 border-slate-200 hover:border-blue-500/50 focus-within:border-blue-600 transition-all h-12 bg-white w-full rounded-xl"
                            />
                            {errors.image && <p className="text-red-500 text-xs ml-1 mt-1">{errors.image.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs font-bold text-slate-600 ml-1 block mb-1">Password</label>
                            <Input
                                {...register("password", { required: "Password is required" })}
                                type="password"
                                placeholder="••••••••"
                                startContent={<FaLock className="text-slate-400 text-sm" />}
                                className="border-2 border-slate-200 hover:border-blue-500/50 focus-within:border-blue-600 transition-all h-12 bg-white w-full rounded-xl"
                            />
                            {errors.password && <p className="text-red-500 text-xs ml-1 mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Role Select */}
                        <div>
                            <label className="text-xs font-bold text-slate-600 ml-1 block mb-1">Sign Up As</label>
                            <div className="relative">
                                <select
                                    {...register("role", { required: "Role is required" })}
                                    defaultValue=""
                                    className="w-full h-12 px-4 pr-10 rounded-xl border-2 border-slate-200 hover:border-blue-500/50 focus:border-blue-600 focus:outline-none transition-all bg-white text-slate-700 appearance-none cursor-pointer text-sm"
                                >
                                    <option value="" disabled>Select your role</option>
                                    <option value="user">User</option>
                                    <option value="vender">Vender</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                            {errors.role && <p className="text-red-500 text-xs ml-1 mt-1">{errors.role.message}</p>}
                        </div>

                        <Button
                            color="primary"
                            type="submit"
                            className="w-full h-12 text-base font-black rounded-xl shadow-lg shadow-blue-600/20 group mt-2"
                        >
                            Create Account
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="text-center mt-5">
                        <p className="text-sm text-slate-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 font-black hover:underline underline-offset-4 transition-all">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}