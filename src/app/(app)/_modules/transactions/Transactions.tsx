import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import TransactionList from "./components/TransactionList";
import { TransactionChart } from "./components/TransactionChart";

function Transactions() {
  return (
    <Card className="flex h-fit flex-col">
      <CardHeader className="items-center pb-4">
        <CardTitle>Your Transactions</CardTitle>
        <CardDescription>Current Data</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-12 pb-4">
        <TransactionList />
        <TransactionChart />
      </CardContent>
    </Card>
  );
}

export default Transactions;
