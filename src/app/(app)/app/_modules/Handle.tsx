import React from "react";
import { ResizableHandle } from "~/app/_components/ui/resizable";

function Handle() {
  return (
    <ResizableHandle className="box-border w-2 rounded-lg border-transparent bg-transparent transition-colors duration-300 hover:border-2 hover:border-background hover:bg-muted-foreground active:bg-muted-foreground" />
  );
}

export default Handle;
