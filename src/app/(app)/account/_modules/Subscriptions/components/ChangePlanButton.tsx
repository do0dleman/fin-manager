import { useUser } from "@clerk/nextjs";
import React from "react";
import AnnualCard from "~/app/_components/subscription-cards/annual-card";
import MonthlyCard from "~/app/_components/subscription-cards/monthly-card";
import { Button } from "~/app/_components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";
import { api } from "~/trpc/react";

function ChangePlanButton(props: {
  status: "active" | "canceled" | "inactive" | undefined;
}) {
  const { status } = props;

  const { user } = useUser();
  const { data: userData } = api.users.getUserInfo.useQuery(
    { user_id: user?.id ?? "" },
    { enabled: user !== undefined },
  );

  const { data: subscriptionData } =
    api.users.getUserInactiveSubscription.useQuery(
      { current_variant_id: userData?.user.variantId ?? undefined },
      { enabled: user !== undefined },
    );

  type CardMapType = Record<number, React.JSX.Element>;

  // TODO: subscription pland change logic
  const cardMap: CardMapType = {
    483325: (
      <MonthlyCard>
        <Button className="w-full">Select</Button>
      </MonthlyCard>
    ),
    483334: (
      <AnnualCard>
        <Button className="w-full">Select</Button>
      </AnnualCard>
    ),
  };

  const cardList = subscriptionData?.map((sub) => cardMap[sub.variantId]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={status === "active" ? "default" : "outline"}
          disabled={status !== "active"}
        >
          Change Plan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Your Plan</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
            <div className="flex flex-col items-stretch justify-center gap-6 bg-background p-4 md:flex-row">
              {cardList}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePlanButton;
