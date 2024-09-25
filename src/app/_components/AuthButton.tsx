"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LockKeyhole, LogOut, User } from "lucide-react";
import { api } from "~/trpc/react";

function AuthButton(props: { style: "avatar" | "fullButton" }) {
  const { style } = props;

  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const { data: userData, isFetched } = api.users.getUserInfo.useQuery(
    { user_id: user?.id ?? "" },
    { enabled: user !== undefined },
  );

  const AvatarComponent = (
    <Avatar className={`text-lg`}>
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>{user?.username?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );

  if (isSignedIn) {
    return (
      <Popover>
        <PopoverTrigger className="w-full">
          {style === "avatar" ? (
            <div className="flex items-center justify-center">
              {AvatarComponent}
            </div>
          ) : (
            <Button
              variant="ghost"
              className="flex h-full w-full justify-start gap-2 text-xl"
            >
              {AvatarComponent}
              <span>{user?.username}</span>
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-fit min-w-48 -translate-x-2 translate-y-2 p-2">
          <Button
            variant="ghost"
            className="flex w-full justify-start gap-2"
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
              className="flex w-full justify-start gap-2"
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
            className="text flex w-full justify-start gap-2"
            onClick={() => signOut({ redirectUrl: "/" })}
          >
            <LogOut />
            <span>Sign Out</span>
          </Button>
        </PopoverContent>
      </Popover>
    );
  }
}
export default AuthButton;
