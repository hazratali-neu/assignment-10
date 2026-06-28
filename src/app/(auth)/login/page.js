'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from '@heroui/react';
import { FaEnvelope, FaGoogle, FaLock } from "react-icons/fa";
import { ArrowRight } from 'lucide-react';
import { authClient, signIn } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log(data);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const loginData = Object.fromEntries(formData.entries());

        try {
            const { data, error } = await signIn.email({
                email: loginData.email,
                password: loginData.password,
                callbackURL:'/dashboard'
            });

            if (error || !data) {
                toast.error(error?.message || "Login failed! Please check your credentials.");
                setLoading(false);
                return;
            }

            if (data) {
                toast.success("Login successful!");
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
                            Welcome <span className="text-cyan-400">Back</span>
                        </h2>
                        <p className="text-slate-400 text-sm mt-2">
                            Sign in to your Ticket Bari account
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        {/* Email */}
                        <div className="w-full">
                            <label className="text-xs font-semibold text-slate-400 ml-1 block mb-1.5">Email Address</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                fullWidth
                                disabled={loading}
                                placeholder="name@example.com"
                                startContent={<FaEnvelope className="text-slate-500 text-sm mr-1" />}
                                classNames={{
                                    base: "w-full",
                                    inputWrapper: "w-full bg-slate-950 hover:bg-slate-900 border-2 border-slate-800 focus-within:!border-cyan-500/70 transition-all h-12 rounded-xl"
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div className="w-full">
                            <label className="text-xs font-semibold text-slate-400 ml-1 block mb-1.5">Password</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                fullWidth
                                disabled={loading}
                                placeholder="••••••••"
                                startContent={<FaLock className="text-slate-500 text-sm mr-1" />}
                                classNames={{
                                    base: "w-full",
                                    inputWrapper: "w-full bg-slate-950 hover:bg-slate-900 border-2 border-slate-800 focus-within:!border-cyan-500/70 transition-all h-12 rounded-xl"
                                }}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Link href="#" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-all">
                                Forgot password?
                            </Link>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={handleSignIn }
                                className="w-full flex justify-center items-center gap-2  rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-white font-semibold shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-95"
                            >
                                <FaGoogle className="text-lg" /> Continue with Google
                            </button>
                        </div>

                        <Button
                            type="submit"
                            isLoading={loading}
                            className="w-full h-12 text-base font-bold rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/10 group mt-2 transition-all"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                            {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-400">
                            Don t have an account?{' '}
                            <Link href="/register" className="text-cyan-400 font-bold hover:text-cyan-300 transition-all">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}