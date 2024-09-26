import { useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

function Subscription() {
  const { user } = useUser();

  const { data: userData } = api.users.getUserInfo.useQuery(
    { user_id: user?.id ?? "" },
    { enabled: user !== undefined },
  );

  const { data: SubscriptionData, isFetched } =
    api.plans.getPlanByVariantId.useQuery(
      { variantId: userData?.user.variantId ?? 0 },
      { enabled: userData?.user.variantId !== null },
    );

  if (!isFetched || !SubscriptionData) {
    return <></>;
  }
  const subscription = SubscriptionData.plan;

  const date = new Date();

  return (
    <div className="mt-4 flex flex-col text-right">
      <div>
        <h2 className="text-2xl">{subscription?.productName}</h2>
        <p className="leading-none text-muted-foreground">
          Next payment: {date.toLocaleDateString()}
        </p>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button>Change Plan</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  );
}

export default Subscription;
