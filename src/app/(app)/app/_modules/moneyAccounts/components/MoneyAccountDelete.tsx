import { Trash2 } from "lucide-react";
import { Button } from "~/app/_components/ui/button";
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
import { api } from "~/trpc/react";

function MoneyAccountDelete(props: { accountId: number }) {
  const { accountId } = props;
  const utils = api.useUtils();
  const deleteMutation = api.moneyAccounts.deleteMoneyAccount.useMutation({
    onSuccess: () => {
      void utils.moneyAccounts.invalidate();
      void utils.transactions.invalidate();
    },
  });

  async function HandleDialogAction() {
    await deleteMutation.mutateAsync({ accountId: accountId });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="icon" className="h-fit p-0 hover:text-destructive">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            money account and transactions associated with it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={HandleDialogAction}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default MoneyAccountDelete;
