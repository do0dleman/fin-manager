"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import AuthButton from "./AuthButton";

function AuthHeader() {
  const { user, isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/app">To App</Link>
        </Button>
        <AuthButton style="avatar" />
      </div>
    );
  }
  return (
    <div>
      <Button asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}
export default AuthHeader;
