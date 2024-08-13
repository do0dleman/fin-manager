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
    <ResizablePanel className="h-[100dvh]">
      <ScrollArea className="h-[100dvh]">
        <div className="grid h-[100dvh] grid-rows-2 gap-4 p-4 text-2xl [&>*]:h-full">
          <ResizablePanelGroup direction="horizontal" className="gap-3">
            <ResizablePanel minSize={30} maxSize={70} defaultSize={40}>
              <MoneyAccounts className="h-full" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <TransactionsOverTime className="h-full" />
            </ResizablePanel>
          </ResizablePanelGroup>
          <ResizablePanelGroup
            direction="horizontal"
            className="items-stretch gap-3"
          >
            <ResizablePanel>
              <TransactionsByCategories className="h-full" />
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
