"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LogOut } from "lucide-react";

function AuthHeader() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  if (isSignedIn) {
    return (
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/app">To App</Link>
        </Button>
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>UR</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-fit min-w-48 -translate-x-2 translate-y-2 p-2">
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
      </div>
    );
  }
  return (
    <div>
      <Button asChild>
        <Link href="/app">Sign In</Link>
      </Button>
    </div>
  );
}
export default AuthHeader;
