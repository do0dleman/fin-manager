"use client";

import { Undo2 } from "lucide-react";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";

import Main from "./_modules/Main";
import Subscription from "./_modules/Subscription";

function Account() {
  return (
    <div className="flex justify-center px-2">
      <div className="h-[100dvh] w-full border-x p-2 sm:w-[500px] lg:w-1/2">
        <Button className="w-full gap-2" variant="outline" asChild>
          <Link href="/app">
            <Undo2 /> Back
          </Link>
        </Button>
        <div className="mt-8 grid grid-cols-2 px-8">
          <Main />
          <Subscription />
        </div>
      </div>
    </div>
  );
}

export default Account;
