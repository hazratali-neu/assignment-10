"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  const user = session?.user;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 rounded-2xl bg-slate-900 border border-slate-800">

      <div className="flex flex-col items-center">

        <Avatar className="w-28 h-28">
          <Avatar.Image src={user?.image} />
          <Avatar.Fallback>
            {user?.name?.charAt(0)}
          </Avatar.Fallback>
        </Avatar>

        <h1 className="mt-5 text-3xl font-bold">
          {user?.name}
        </h1>

        <p className="text-slate-400 mt-1">
          {user?.email}
        </p>

      </div>

      <div className="mt-8 space-y-4">

        <div className="p-4 rounded-xl bg-slate-800">
          <h3 className="text-slate-400">Name</h3>
          <p>{user?.name}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800">
          <h3 className="text-slate-400">Email</h3>
          <p>{user?.email}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800">
          <h3 className="text-slate-400">User ID</h3>
          <p>{user?.id}</p>
        </div>

      </div>

    </div>
  );
}