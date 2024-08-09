"use client";

import { useUser } from "@clerk/nextjs";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { Button } from "~/app/_components/ui/button";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

function Account() {
  const { user } = useUser();

  const { data: userData, isFetched } = api.users.getUserInfo.useQuery(
    { user_id: user?.id ?? "" },
    { enabled: user !== undefined },
  );

  if (!isFetched) {
    return <div>Loading...</div>;
  }
  let statusColor = "text-positive";
  if (userData?.user.status === "inactive") {
    statusColor = "text-destructive";
  }
  return (
    <div className="flex justify-center px-2">
      <div className="h-[100dvh] w-full border-x p-2 sm:w-[500px] lg:w-1/2">
        <Button className="w-full gap-2" variant="outline" asChild>
          <Link href="/app">
            <Undo2 /> Back
          </Link>
        </Button>
        <div className="mt-10 flex justify-center gap-4">
          <Avatar className="aspect-square h-40 w-40">
            <AvatarImage src={userData?.user.profile_img ?? ""} />
            <AvatarFallback>
              {userData?.user.username?.slice(0, 2)[0]}
            </AvatarFallback>
          </Avatar>
          <div className="text-xl">
            <div className="mb-4">
              <div className="text-3xl">{userData?.user.username}</div>
              <div>
                Status:{" "}
                <span className={cn(statusColor, "")}>
                  {userData?.user.status}
                </span>
              </div>
            </div>
            <div className="text-muted-foreground">
              {userData?.user.active_until ? (
                <>
                  <p>
                    Account is active until{" "}
                    {userData.user.active_until.toLocaleDateString()}
                  </p>
                  <p>You can cancell anytime</p>
                </>
              ) : (
                <>You have lifetime acces for this service.</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
