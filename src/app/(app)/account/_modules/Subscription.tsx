import { useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";
import useLoaderStore from "../../_modules/store";

function Subscription() {
  const { user } = useUser();

  const { data: userData } = api.users.getUserInfo.useQuery(
    { user_id: user?.id ?? "" },
    { enabled: user !== undefined },
  );

  const cancelMutation = api.users.cancelSubscription.useMutation();
  const resumeMutation = api.users.resumeSubscription.useMutation();

  const utils = api.useUtils();

  const { setIsLoading } = useLoaderStore();

  const { data: SubscriptionData, isFetched } =
    api.plans.getPlanByVariantId.useQuery(
      { variantId: userData?.user.variantId ?? 0 },
      { enabled: userData?.user.variantId !== null },
    );

  if (!isFetched || !SubscriptionData) {
    return <></>;
  }
  const subscription = SubscriptionData.plan;

  const date = new Date(userData?.user.active_until ?? "");

  async function HandleCancelSubscription() {
    if (!user) {
      return;
    }
    setIsLoading(true);

    await cancelMutation.mutateAsync();
    void utils.users.getUserInfo.refetch();
    setIsLoading(false);
  }
  async function HandleResumeSubscription() {
    if (!user) {
      return;
    }
    setIsLoading(true);

    await resumeMutation.mutateAsync();
    void utils.users.getUserInfo.refetch();
    setIsLoading(false);
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
        <Button>Change Plan</Button>
        {userData?.user.status === "active" ? (
          <Button variant="outline" onClick={HandleCancelSubscription}>
            Cancel Subscription
          </Button>
        ) : (
          <Button variant="outline" onClick={HandleResumeSubscription}>
            Resume Subscription
          </Button>
        )}
      </div>
    </div>
  );
}

export default Subscription;
