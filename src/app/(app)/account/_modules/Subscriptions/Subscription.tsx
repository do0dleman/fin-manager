import { useUser } from "@clerk/nextjs";
import React from "react";
import { api } from "~/trpc/react";
import CancelResumeButton from "./components/CancelResumeButton";
import ChangePlanButton from "./components/ChangePlanButton";

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

  const subscription = SubscriptionData?.plan;

  const date = new Date(userData?.user.active_until ?? "");

  if (!isFetched || !SubscriptionData) {
    return <></>;
  }

  return (
    <div className="mt-4 flex flex-col text-right">
      <div>
        <h2 className="text-2xl">{subscription?.productName}</h2>
        <p className="leading-none text-muted-foreground">
          Next payment: {date.toLocaleDateString()}
        </p>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <ChangePlanButton status={userData?.user.status} />
        <CancelResumeButton status={userData?.user.status} />
      </div>
    </div>
  );
}

export default Subscription;
