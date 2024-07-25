"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/app/_components/ui/chart";
import { api } from "~/trpc/react";
import { useMemo } from "react";
import MoneyAccounts from "./MoneyAccounts";

export function MoneyAccountChart() {
  const { data: chartData } =
    api.moneyAccounts.getUsersMoneyAccounts.useQuery();

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    if (!chartData) return {};

    chartData.moneyAccounts.forEach((acc) => {
      config[acc.name] = {
        label: acc.name,
        color: `var(--${acc.color})`,
      };
    });
    return config;
  }, [chartData]);

  const totalMoney = useMemo(() => {
    if (!chartData) {
      return 0;
    }
    return chartData?.moneyAccounts
      .map((acc) => +acc.amount)
      .reduce((acc, v) => acc + v);
  }, [chartData]);

  return (
    <Card className="flex h-fit flex-col">
      <CardHeader className="items-center pb-4">
        <CardTitle>Your Money Accounts</CardTitle>
        <CardDescription>Current Data</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-12 pb-4">
        <MoneyAccounts />
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-w-60"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData?.moneyAccounts.map((acc) => ({
                ...acc,
                amount: +acc.amount,
                fill: `var(--${acc.color})`,
              }))}
              dataKey="amount"
              nameKey="name"
              innerRadius={80}
              outerRadius={120}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                    return <></>;
                  }
                  // @ts-ignore-start
                  // Due to weird viewBox types ts is off here
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-xl font-bold"
                      >
                        {Math.floor(totalMoney).toLocaleString() + "$"}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Total
                      </tspan>
                    </text>
                  );
                  // @ts-ignore-end
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
