"use-client";

import { ResizablePanel } from "~/app/_components/ui/resizable";
import Transactions from "./_components/transactions/Transactions";
import MoneyAccounts from "./_components/moneyAccounts/MoneyAccounts";
import { MoneyAccountChart } from "./_components/moneyAccounts/MoneyAccountChart";

function Board() {
  return (
    <ResizablePanel className="flex gap-4 p-4 text-xl">
      <MoneyAccountChart />
      <MoneyAccounts />
      <Transactions />
    </ResizablePanel>
  );
}
export default Board;
