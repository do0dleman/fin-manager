"use-client";

import { ResizablePanel } from "~/app/_components/ui/resizable";
import MoneyAccounts from "../moneyAccounts/MoneyAccounts";
import Transactions from "../transactions/Transactions";

function Board() {
  return (
    <ResizablePanel className="grid grid-cols-2 grid-rows-2 gap-4 p-4 text-2xl [&>*]:h-full">
      <MoneyAccounts />
      <Transactions />
      <MoneyAccounts />
      <Transactions />
    </ResizablePanel>
  );
}
export default Board;
