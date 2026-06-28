'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function DashboardPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        
        if (!isPending && session?.user?.role) {
            
            if(session?.user?.role==='fraud')
            {
                 router.push(`/dashboard/vender/profile`);
                 return;
            }
            router.push(`/dashboard/${session.user.role}/profile`);
        }
    }, [session, isPending, router]);

    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <span className="loading loading-spinner text-green-500"></span>
        </div>
    );
}