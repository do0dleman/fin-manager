"use client";

import { useUser } from "@clerk/nextjs";
import {
  House,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { ResizablePanel } from "~/app/_components/ui/resizable";
import { api } from "~/trpc/react";
import { useClerk } from "@clerk/nextjs";

function Toolbar() {
  const userAuthData = useUser();

  const { data: userData, isFetched } = api.users.getUserInfo.useQuery(
    { user_id: userAuthData.user?.id ?? "" },
    { enabled: userAuthData.user !== undefined },
  );

  const { signOut } = useClerk();

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
      {isFetched && userData?.user.role === "admin" ? (
        <Button
          variant="ghost"
          className="flex w-full justify-start gap-2 text-2xl"
          asChild
        >
          <Link href="/admin">
            <LockKeyhole />
            <span>Admin</span>
          </Link>
        </Button>
      ) : (
        <></>
      )}
      <Button
        variant="ghost"
        className="flex w-full justify-start gap-2 text-2xl"
        onClick={() => signOut({ redirectUrl: "/" })}
      >
        <LogOut />
        <span>Sign Out</span>
      </Button>
    </ResizablePanel>
  );
}
export default Toolbar;
