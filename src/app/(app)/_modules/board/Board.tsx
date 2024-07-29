"use-client";

import { ResizablePanel } from "~/app/_components/ui/resizable";
import Transactions from "../transactions/Transactions";
import MoneyAccounts from "../moneyAccounts/MoneyAccounts";

function Board() {
  return (
    <ResizablePanel className="flex gap-4 p-4 text-xl">
      <MoneyAccounts />
      <Transactions />
    </ResizablePanel>
  );
}
export default Board;
