"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import OverTimeChart from "./components/OverTimeChart";

export function TransactionsOverTime() {
  const [timeRange, setTimeRange] = React.useState("7d");
  let showingForTimeString = "last 3 month";
  if (timeRange === "7d") {
    showingForTimeString = "last 7 days";
  }
  if (timeRange === "30d") {
    showingForTimeString = "last 30 days";
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Transactions Over Time</CardTitle>
          <CardDescription>
            Showing total income/expense for the {showingForTimeString}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <OverTimeChart timeRange={timeRange as "90d" | "30d" | "7d"} />
      </CardContent>
    </Card>
  );
}
