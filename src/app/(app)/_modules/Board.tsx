"use-client";

import { ResizablePanel } from "~/app/_components/ui/resizable";
import MoneyAccounts from "./moneyAccounts/MoneyAccounts";
import Transactions from "./transactions/Transactions";
import { TransactionsOverTime } from "./transactionsOverTime/TransactionsOverTime";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { TransactionsByCategories } from "./transactionsByCategories/TransactionsByCategories";

function Board() {
  return (
    <ResizablePanel className="h-full">
      <ScrollArea className="h-full">
        <div className="grid h-full grid-cols-2 grid-rows-2 items-center justify-center gap-4 p-4 text-2xl [&>*]:h-full">
          <MoneyAccounts />
          <Transactions />
          <TransactionsOverTime />
          <TransactionsByCategories />
        </div>
      </ScrollArea>
    </ResizablePanel>
  );
}
export default Board;
