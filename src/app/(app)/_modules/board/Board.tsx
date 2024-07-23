"use-client";

import { ResizablePanel } from "~/app/_components/ui/resizable";
import BankAccounts from "./_components/BankAccounts";
import Transactions from "./_components/transactions/Transactions";
// import { api } from "~/trpc/react";

function Board() {
  // api.moneyAccounts.getUsersMoneyAccounts.useQuery();
  // api.transactions.getUserLatestTransactions.useQuery();
  return (
    <ResizablePanel className="flex gap-4 p-4 text-2xl">
      <BankAccounts />
      <Transactions />
    </ResizablePanel>
  );
}
export default Board;
