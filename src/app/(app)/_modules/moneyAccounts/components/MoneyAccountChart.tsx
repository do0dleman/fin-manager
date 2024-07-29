"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/app/_components/ui/chart";
import { api } from "~/trpc/react";
import { useMemo } from "react";

export function MoneyAccountChart() {
  const { data: chartData } =
    api.moneyAccounts.getUsersMoneyAccounts.useQuery();

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    if (!chartData)
      return {
        amount: {
          label: "Amount",
        },
      };

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
    <ChartContainer
      config={chartConfig}
      // config={{}}
      className="mx-auto aspect-auto min-h-[300px] w-full"
    >
      <PieChart>
        <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
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
  );
}
