"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import AuthButton from "./AuthButton";
import { api } from "~/trpc/react";

function AuthHeader() {
  const { user, isSignedIn } = useUser();
  const { data, isFetched } = api.users.getUserInfo.useQuery(
    { user_id: user?.id ?? "" },
    { enabled: user !== undefined },
  );

  if (isSignedIn) {
    return (
      <div className="flex gap-4">
        {data?.user.status !== "inactive" ? (
          <Button asChild>
            <Link href="/app">To App</Link>
          </Button>
        ) : (
          <></>
        )}
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
