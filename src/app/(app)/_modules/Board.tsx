"use-client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/app/_components/ui/resizable";
import MoneyAccounts from "./moneyAccounts/MoneyAccounts";
import Transactions from "./transactions/Transactions";
import { TransactionsOverTime } from "./transactionsOverTime/TransactionsOverTime";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { TransactionsByCategories } from "./transactionsByCategories/TransactionsByCategories";

function Board() {
  return (
    <ResizablePanel className="h-full">
      <ScrollArea className="h-full">
        <div className="flex h-full flex-col items-center justify-center gap-4 p-4 text-2xl [&>*]:h-full">
          <ResizablePanelGroup direction="horizontal" className="gap-3">
            <ResizablePanel minSize={30} maxSize={70} defaultSize={40}>
              <MoneyAccounts className="h-full" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <TransactionsOverTime />
            </ResizablePanel>
          </ResizablePanelGroup>
          <ResizablePanelGroup
            direction="horizontal"
            className="items-stretch gap-3"
          >
            <ResizablePanel>
              <TransactionsByCategories />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={30} maxSize={70} defaultSize={40}>
              <Transactions className="h-full" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ScrollArea>
    </ResizablePanel>
  );
}
export default Board;
