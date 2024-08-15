"use client";

import { useUser } from "@clerk/nextjs";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

function Account() {
  const { user } = useUser();

  const { data: userData, isFetched } = api.users.getUserInfo.useQuery(
    { user_id: user?.id ?? "" },
    { enabled: user !== undefined },
  );
  const { data: plansData } = api.plans.getPlans.useQuery(undefined, {
    enabled: userData?.user.role === "admin",
  });
  const syncMutation = api.plans.syncPlans.useMutation();
  const utils = api.useUtils();

  useEffect(() => {
    if (!userData) {
      return;
    }
    if (userData.user.role !== "admin") {
      redirect("/");
    }
  }, [userData]);

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  async function HandleSyncButtonClick() {
    const res = await syncMutation.mutateAsync();

    if (res?.message) {
      void utils.plans.getPlans.refetch();
    }
  }

  return (
    <div className="flex justify-center px-2">
      <div className="h-[100dvh] w-full border-x p-2 sm:w-[500px] lg:w-1/2">
        <Button className="w-full gap-2" variant="outline" asChild>
          <Link href="/app">
            <Undo2 /> Back
          </Link>
        </Button>
        <div className="mt-10 flex flex-col justify-center gap-4">
          <h1 className="text-center text-3xl">Admin Dashboard</h1>
          <div>
            <h2 className="text-2xl text-muted-foreground">Plans</h2>
            <Button className="text-xl" onClick={HandleSyncButtonClick}>
              Sync Plans
            </Button>
            <ul>
              {plansData?.plans.map((plan) => (
                <li key={`plan-${plan.id}`}>{plan.productName}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
