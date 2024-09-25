"use-client";

import {
  ResizablePanel,
  ResizablePanelGroup,
} from "~/app/_components/ui/resizable";
import MoneyAccounts from "./moneyAccounts/MoneyAccounts";
import Transactions from "./transactions/Transactions";
import { TransactionsOverTime } from "./transactionsOverTime/TransactionsOverTime";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { TransactionsByCategories } from "./transactionsByCategories/TransactionsByCategories";
import Handle from "./Handle";

function Board() {
  return (
    <ResizablePanel className="h-[100dvh]">
      <ScrollArea className="h-[100dvh]">
        <div className="grid grid-rows-2 gap-4 py-4 pr-4 text-2xl [&>*]:h-full [@media(min-height:958px)]:h-[100dvh]">
          <ResizablePanelGroup direction="horizontal" className="">
            <ResizablePanel minSize={30} maxSize={70} defaultSize={55}>
              <MoneyAccounts className="h-full" />
            </ResizablePanel>
            <Handle />
            <ResizablePanel>
              <TransactionsOverTime className="h-full" />
            </ResizablePanel>
          </ResizablePanelGroup>
          <ResizablePanelGroup direction="horizontal" className="items-stretch">
            <ResizablePanel>
              <TransactionsByCategories className="h-full" />
            </ResizablePanel>
            <Handle />
            <ResizablePanel minSize={30} maxSize={70} defaultSize={50}>
              <Transactions className="h-full" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ScrollArea>
    </ResizablePanel>
  );
}
export default Board;
