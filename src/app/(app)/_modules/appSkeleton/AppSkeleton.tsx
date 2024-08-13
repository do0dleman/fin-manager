import React from "react";
import { Skeleton } from "~/app/_components/ui/skeleton";

function AppSkeleton() {
  return (
    <div className="flex h-[100dvh] gap-2">
      <div className="flex w-[12%] flex-col gap-4 border-r p-2 pr-6 pt-10">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
      <div className="m-4 grid w-[88%] grid-cols-5 grid-rows-2 gap-4 rounded-3xl">
        <Skeleton className="col-span-2" />
        <Skeleton className="col-span-3" />
        <Skeleton className="col-span-3" />
        <Skeleton className="col-span-2" />
      </div>
    </div>
  );
}

export default AppSkeleton;
