"use client";

import { House, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { ResizablePanel } from "~/app/_components/ui/resizable";

function Toolbar() {
  return (
    <ResizablePanel
      defaultSize={10}
      minSize={5}
      maxSize={12}
      className="p-2 pt-10 text-2xl"
    >
      <Button
        variant="ghost"
        className="flex w-full justify-start gap-2 text-2xl"
        asChild
      >
        <Link href="/app">
          <LayoutDashboard className="" />
          <span>Dashboard</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex w-full justify-start gap-2 text-2xl"
        asChild
      >
        <Link href="/">
          <House />
          <span>Home</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex w-full justify-start gap-2 text-2xl"
        asChild
      >
        <Link href="/account">
          <User />
          <span>Account</span>
        </Link>
      </Button>
    </ResizablePanel>
  );
}
export default Toolbar;
