"use client";

import { useUser } from "@clerk/nextjs";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/_components/ui/table";

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
            <h2 className="mb-2 ml-4 text-2xl text-muted-foreground">Plans</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>Interval</TableHead>
                  <TableHead>Trial Period</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plansData?.plans.map((plan) => (
                  <TableRow key={`plan-${plan.id}`}>
                    <TableCell>{plan.productName}</TableCell>
                    <TableCell>{plan.name}</TableCell>
                    <TableCell>{plan.interval}</TableCell>
                    <TableCell>
                      {plan.trialInterval
                        ? `${plan.trialIntervalCount} ${plan.trialInterval}`
                        : "none"}
                    </TableCell>
                    <TableCell>{`${+plan.price / 100}€`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center gap-2 px-8">
              <Button className="mt-2 text-xl" onClick={HandleSyncButtonClick}>
                Sync Plans
              </Button>
              <p className="text-muted-foreground">
                Performs a request to LemonSqueezy and sync internal plan db
                with theirs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
