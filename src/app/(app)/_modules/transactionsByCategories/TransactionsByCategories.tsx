"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import { type ChartConfig } from "~/app/_components/ui/chart";
import { ByCategoryChart } from "./components/ByCategoryChart";
import { api } from "~/trpc/react";
import { useMemo, useState } from "react";

const chartConfig = {
  amount: {
    label: "Amount",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--destructive))",
  },
  income: {
    label: "Income",
    color: "hsl(var(--positive))",
  },
} satisfies ChartConfig;

type Dictionary<T = unknown> = Record<string, T>;

export function TransactionsByCategories() {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("expense");

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 90);

  const { data } = api.transactions.getPeriodTransactions.useQuery({
    endDate: endDate.toISOString().split("T")[0]!,
    stratDate: startDate.toISOString().split("T")[0]!,
  });

  const chartData = useMemo(() => {
    if (data === undefined) return [];
    const chartDataObj: Dictionary = {};
    const chartDataArr = [];

    const tranData = [
      ...data.transactions.filter((tran) => tran.type === activeChart),
    ];
    for (const tran of tranData) {
      chartDataObj[tran.category ?? "t"] =
        chartDataObj[tran.category ?? "t"] ?? 0 + +tran.amount;
    }
    for (const category in chartDataObj) {
      chartDataArr.push({
        category: category,
        amount: Number(chartDataObj[category]),
      });
    }
    chartDataArr.sort((a, b) => b.amount - a.amount);
    return chartDataArr;
  }, [data, activeChart]);

  const total = useMemo(() => {
    if (!data)
      return {
        expense: 0,
        income: 0,
      };
    return {
      expense: data.transactions
        .filter((tran) => tran.type === "expense")
        .reduce((acc, curr) => acc + +curr.amount, 0),
      income: data.transactions
        .filter((tran) => tran.type === "income")
        .reduce((acc, curr) => acc + +curr.amount, 0),
    };
  }, [data]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Transactions By Categories</CardTitle>
          <CardDescription>Showing data for the last 3 months</CardDescription>
        </div>
        <div className="flex">
          {["expense", "income"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ByCategoryChart
          activeChart={activeChart}
          chartConfig={chartConfig}
          chartData={chartData}
        />
      </CardContent>
    </Card>
  );
}
