"use client";

import { ResizablePanelGroup } from "~/app/_components/ui/resizable";
import Toolbar from "./_modules/Toolbar";
import Board from "./_modules/Board";
import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import { redirect } from "next/navigation";
import AppSkeleton from "./_modules/appSkeleton/AppSkeleton";
import Handle from "./_modules/Handle";

function App() {
  const userAuthData = useUser();

  const {
    data: userData,
    isLoading,
    isFetched,
  } = api.users.getUserInfo.useQuery(
    { user_id: userAuthData.user?.id ?? "" },
    { enabled: userAuthData.user !== undefined },
  );

  if (isLoading || !isFetched) {
    return <AppSkeleton />;
  }

  if (userData?.user.status === "inactive") {
    redirect("/");
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="!h-[100dvh]"
    >
      <Toolbar />
      <Handle />
      <Board />
    </ResizablePanelGroup>
  );
}
export default App;
