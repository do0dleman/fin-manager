import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";
import MoneyAccountsForm from "./MoneyAccountsForm";
import { useState } from "react";

export function MoneyAccountModal(props: { OpenButton: JSX.Element }) {
  const { OpenButton } = props;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{OpenButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Money Account</DialogTitle>
        </DialogHeader>
        <MoneyAccountsForm onSuccessSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
