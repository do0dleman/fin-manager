"use client";

import { House, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import AuthButton from "~/app/_components/AuthButton";
import { Button } from "~/app/_components/ui/button";
import { ResizablePanel } from "~/app/_components/ui/resizable";
import { Separator } from "~/app/_components/ui/separator";
import WebsiteLogo from "~/app/_components/ui/website-logo";

function Toolbar() {
  return (
    <ResizablePanel
      defaultSize={12}
      minSize={5}
      maxSize={12}
      className="flex flex-col border-r p-2 pb-4 pt-8"
    >
      <div>
        <WebsiteLogo className="px-4" />
        <Separator className="my-2" />
        <Button
          variant="ghost"
          className="flex w-full justify-start gap-2 text-xl"
          asChild
        >
          <Link href="/app">
            <LayoutDashboard className="" />
            <span>App</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="flex w-full justify-start gap-2 text-xl"
          asChild
        >
          <Link href="/">
            <House />
            <span>Home</span>
          </Link>
        </Button>
      </div>
      <div className="mt-auto">
        <AuthButton style="fullButton" />
      </div>
    </ResizablePanel>
  );
}
export default Toolbar;
