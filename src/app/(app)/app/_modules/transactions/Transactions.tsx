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

function Transactions(props: React.ComponentProps<typeof Card>) {
  const { className } = props;
  return (
    <Card className={`flex h-fit flex-col ${className}`} {...props}>
      <CardHeader className="items-center pb-4">
        <CardTitle>Your Transactions</CardTitle>
        <CardDescription>Current Data</CardDescription>
      </CardHeader>
      <CardContent className="mb-4 flex h-[80%] flex-grow gap-4">
        <TransactionList />
        <TransactionChart />
      </CardContent>
    </Card>
  );
}

export default Transactions;
