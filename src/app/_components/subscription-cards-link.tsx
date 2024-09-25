"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

interface LinkProps extends React.ComponentProps<typeof Button> {
  href: string;
}

function SubscriptionCardsLink(props: LinkProps) {
  const { children, href, ...rest } = props;

  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  function HandleLinkClick() {
    console.log(`${href}?checkout[custom][user_id]=${user?.id}/`);
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      router.push("/sign-up");
    }

    router.push(`${href}?checkout[custom][user_id]=${user?.id}`);
  }

  return (
    <Button onClick={HandleLinkClick} {...rest}>
      Subscribe Now
    </Button>
  );
}

export default SubscriptionCardsLink;
