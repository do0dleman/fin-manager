import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import { MoneyAccountChart } from "./components/MoneyAccountChart";
import MoneyAccountList from "./components/MoneyAccountList";

function MoneyAccounts() {
  return (
    <Card className="flex h-fit flex-col">
      <CardHeader className="items-center pb-4">
        <CardTitle>Your Money Accounts</CardTitle>
        <CardDescription>Current Data</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-grow gap-4 pb-4">
        <MoneyAccountList />
        <MoneyAccountChart />
      </CardContent>
    </Card>
  );
}

export default MoneyAccounts;
