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
        <div className="grid grid-rows-2 gap-4 p-4 text-2xl [&>*]:h-full [@media(min-height:958px)]:h-[100dvh]">
          <ResizablePanelGroup direction="horizontal" className="">
            <ResizablePanel minSize={30} maxSize={70} defaultSize={40}>
              <MoneyAccounts className="h-full" />
            </ResizablePanel>
            <ResizableHandle className="mx-1 w-1 rounded-lg border-none bg-transparent transition-colors duration-300 hover:bg-muted-foreground" />
            <ResizablePanel>
              <TransactionsOverTime className="h-full" />
            </ResizablePanel>
          </ResizablePanelGroup>
          <ResizablePanelGroup direction="horizontal" className="items-stretch">
            <ResizablePanel>
              <TransactionsByCategories className="h-full" />
            </ResizablePanel>
            <ResizableHandle className="mx-1 w-1 rounded-lg border-none bg-transparent transition-colors duration-300 hover:bg-muted-foreground active:bg-muted-foreground" />
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
