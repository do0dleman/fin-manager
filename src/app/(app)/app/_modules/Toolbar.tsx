"use client";

import { House, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import AuthButton from "~/app/_components/AuthButton";
import { Button } from "~/app/_components/ui/button";
import { ResizablePanel } from "~/app/_components/ui/resizable";
import { Separator } from "~/app/_components/ui/separator";
import WebsiteLogo from "~/app/_components/ui/website-logo";

function Toolbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const panelRef = useRef<ImperativePanelHandle>(null);

  // useEffect(() => {}, [isCollapsed]);

  function HandleResize(width: number) {
    if (width > 8 && width < 12) {
      panelRef.current?.resize(12);
      setIsCollapsed(false);
    }
    if (width < 8) {
      panelRef.current?.resize(4);
      setIsCollapsed(true);
    }
  }

  return (
    <ResizablePanel
      defaultSize={isCollapsed ? 4 : 12}
      minSize={4}
      maxSize={15}
      onResize={HandleResize}
      ref={panelRef}
      className="flex flex-col border-r p-2 pb-4 pt-8"
    >
      <div className={`${isCollapsed ? "text-center" : ""}`}>
        <WebsiteLogo className="w-[1ch] px-4" showText={!isCollapsed} />
        <Separator className="my-2" />
        <Button
          variant="ghost"
          className="flex w-full justify-start gap-2 text-xl"
          asChild
        >
          <Link href="/app">
            <LayoutDashboard className="" />
            {isCollapsed ? <></> : <span>App</span>}
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`flex w-full justify-start text-xl ${isCollapsed ? "" : "gap-2"}`}
          asChild
        >
          <Link href="/">
            <House />
            {isCollapsed ? <></> : <span>Home</span>}
          </Link>
        </Button>
      </div>
      <div className="mt-auto">
        <AuthButton style={`${isCollapsed ? "avatar" : "fullButton"}`} />
      </div>
    </ResizablePanel>
  );
}
export default Toolbar;
