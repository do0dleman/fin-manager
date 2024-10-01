"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

function Main() {
  const { user } = useUser();

  const { data: userData } = api.users.getUserInfo.useQuery(
    { user_id: user?.id ?? "" },
    { enabled: user !== undefined },
  );

  let statusColor = "text-positive";
  if (userData?.user.status === "inactive") {
    statusColor = "text-destructive";
  }
  if (userData?.user.status === "canceled") {
    statusColor = "text-primary";
  }
  return (
    <div className="flex gap-4">
      <Avatar className="aspect-square h-28 w-28">
        <AvatarImage src={userData?.user.profile_img ?? ""} />
        <AvatarFallback>
          {userData?.user.username?.slice(0, 2)[0]}
        </AvatarFallback>
      </Avatar>
      <div className="mt-4 text-lg">
        <div className="mb-4">
          <h2 className="text-2xl">{userData?.user.username}</h2>
          <p className="leading-none">
            Status:{" "}
            <span className={cn(statusColor, "")}>{userData?.user.status}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
