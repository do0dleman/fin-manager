"use client";

import { ResizablePanel } from "~/app/_components/ui/resizable";
import { api } from "~/trpc/react";

function Toolbar() {
  const { data } = api.post.hello.useQuery({ text: "app" });
  return (
    <ResizablePanel
      defaultSize={10}
      minSize={5}
      maxSize={20}
      className="p-2 text-2xl"
    >
      Toolbar: {data?.greeting ?? ""}
    </ResizablePanel>
  );
}
export default Toolbar;
