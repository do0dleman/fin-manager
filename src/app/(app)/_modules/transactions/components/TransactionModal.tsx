import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";
import TransactionForm from "./TransactionForm";
import { useState } from "react";

export function TransactionModal(props: { OpenButton: JSX.Element }) {
  const { OpenButton } = props;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{OpenButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm onSuccessSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
