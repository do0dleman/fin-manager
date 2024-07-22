"use-client";

import { useUser } from "@clerk/nextjs";
import { ResizablePanel } from "~/app/_components/ui/resizable";
import BankAccounts from "./_components/BankAccounts";

function Board() {
  return (
    <ResizablePanel className="p-2 text-2xl">
      <BankAccounts />
    </ResizablePanel>
  );
}
export default Board;
