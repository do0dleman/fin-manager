import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import useLoaderStore from "~/app/(app)/_modules/store";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/app/_components/ui/alert-dialog";

function CancelButton(props: {
  status: "active" | "canceled" | "inactive" | undefined;
}) {
  const { status } = props;

  const { user } = useUser();

  const cancelMutation = api.users.cancelSubscription.useMutation();
  const resumeMutation = api.users.resumeSubscription.useMutation();

  const utils = api.useUtils();

  const { setIsLoading } = useLoaderStore();

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
    if (status === "inactive") {
      redirect("/");
    }

    setIsLoading(true);

    await resumeMutation.mutateAsync();
    void utils.users.getUserInfo.refetch();
    setIsLoading(false);
  }

  if (status === undefined) {
    return;
  }

  return (
    <>
      {status === "active" ? (
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="outline">Cancel Subscription</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You are cancelling your subscription. You will be able to resume
                your subscription until the next payment. After that you will
                have to apply for subscription separately once again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={HandleCancelSubscription}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button variant="default" onClick={HandleResumeSubscription}>
          Resume Subscription
        </Button>
      )}
    </>
  );
}

export default CancelButton;
