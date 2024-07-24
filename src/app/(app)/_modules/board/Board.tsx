"use-client";

import { ResizablePanel } from "~/app/_components/ui/resizable";
import Transactions from "./_components/transactions/Transactions";
import MoneyAccounts from "./_components/moneyAccounts/MoneyAccounts";

function Board() {
  return (
    <ResizablePanel className="flex gap-4 p-4 text-2xl">
      <MoneyAccounts />
      <Transactions />
    </ResizablePanel>
  );
}
export default Board;
