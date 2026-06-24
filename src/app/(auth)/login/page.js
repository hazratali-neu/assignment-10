'use client';

import Link from "next/link";
import { Button, Input } from '@heroui/react';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ArrowRight } from 'lucide-react';
import { signIn } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { redirect } from "next/navigation";

export default function LoginPage() {
    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const loginData = Object.fromEntries(formData.entries());

        const { data, error } = await signIn.email({
            ...loginData,
            callbackURL: "/"
        });

        if (error) {
            toast.error("Login failed");
            return;
        }

        toast.success("Login successfully");
        redirect("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 py-2 px-4">
            <div className="w-full max-w-lg">
                <div className="bg-slate-200 border border-white/5 backdrop-blur-xl rounded-3xl shadow-2xl px-10 py-15">

                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            Welcome <span className="text-blue-600">Back</span>
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Sign in to your Ticketo account
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleLogin}>

                        {/* Email */}
                        <div>
                            <label className="text-xs font-bold text-slate-600 ml-1 block mb-1">Email Address</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                startContent={<FaEnvelope className="text-slate-400 text-sm" />}
                                className="border-2 border-slate-200 hover:border-blue-500/50 focus-within:border-blue-600 transition-all h-12 bg-white w-full rounded-xl"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs font-bold text-slate-600 ml-1 block mb-1">Password</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                startContent={<FaLock className="text-slate-400 text-sm" />}
                                className="border-2 border-slate-200 hover:border-blue-500/50 focus-within:border-blue-600 transition-all h-12 bg-white w-full rounded-xl"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Link href="#" className="text-xs font-bold text-blue-600 hover:underline underline-offset-4 transition-all">
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            color="primary"
                            type="submit"
                            className="w-full h-12 text-base font-black rounded-xl shadow-lg shadow-blue-600/20 group mt-2"
                        >
                            Sign In
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="text-center mt-5">
                        <p className="text-sm text-slate-400">
                            Don t have an account?{' '}
                            <Link href="/register" className="text-blue-600 font-black hover:underline underline-offset-4 transition-all">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}