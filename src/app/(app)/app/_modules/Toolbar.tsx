"use client";

import { House, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { type ImperativePanelHandle } from "react-resizable-panels";
import AuthButton from "~/app/_components/AuthButton";
import { Button } from "~/app/_components/ui/button";
import { ResizablePanel } from "~/app/_components/ui/resizable";
import { Separator } from "~/app/_components/ui/separator";
import WebsiteLogo from "~/app/_components/ui/website-logo";
import SettingsModal from "./settingsModal/SettingsModal";

function Toolbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const panelRef = useRef<ImperativePanelHandle>(null);

  const [windowWidth, setWindowWidth] = useState(innerWidth);

  const minSizePx = 60;
  const midSizePx = 190;
  const maxSizePx = 256;

  const minSize = (minSizePx / windowWidth) * 100; // make the size absolute (60px)
  const midSize = (midSizePx / windowWidth) * 100;
  const maxSize = (maxSizePx / windowWidth) * 100;

  useEffect(() => {
    const onResize = () => {
      panelRef.current!.resize(0);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [windowWidth]);

  function HandleResize(width: number) {
    if (width > minSize * 2 && width < midSize) {
      panelRef.current?.resize(midSize);
      setIsCollapsed(false);
    }
    if (width < minSize * 2) {
      panelRef.current?.resize(minSize);
      setIsCollapsed(true);
    }
  }

  console.log(midSize);
  return (
    <ResizablePanel
      defaultSize={isCollapsed ? minSize : midSize}
      minSize={minSize}
      maxSize={maxSize}
      onResize={HandleResize}
      ref={panelRef}
      className="flex flex-col border-r p-2 pb-4 pt-6 text-foreground"
    >
      <div className={`${isCollapsed ? "text-center" : ""}`}>
        <WebsiteLogo className="w-[1ch] px-3" showText={!isCollapsed} />
        <Separator className="my-2" />
        <Button
          variant="ghost"
          className={`flex w-full gap-2 text-xl ${isCollapsed ? "justify-center" : "justify-start"}`}
          asChild
        >
          <Link href="/app">
            <LayoutDashboard className="" />
            {isCollapsed ? <></> : <span>App</span>}
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`flex w-full justify-start gap-2 text-xl ${isCollapsed ? "justify-center" : "justify-start"}`}
          asChild
        >
          <Link href="/">
            <House />
            {isCollapsed ? <></> : <span>Home</span>}
          </Link>
        </Button>
        <SettingsModal
          OpenButton={
            <Button
              variant="ghost"
              className={`flex w-full justify-start gap-2 text-xl ${isCollapsed ? "justify-center" : "justify-start"}`}
            >
              <Settings />
              {isCollapsed ? <></> : <span>Settings</span>}
            </Button>
          }
        />
      </div>
      <div className="mt-auto">
        <AuthButton style={`${isCollapsed ? "avatar" : "fullButton"}`} />
      </div>
    </ResizablePanel>
  );
}
export default Toolbar;
