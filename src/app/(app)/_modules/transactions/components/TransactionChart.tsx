"use client";

import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/app/_components/ui/chart";
import { api } from "~/trpc/react";
const chartConfig = {
  amount: {
    label: "Amount",
  },
  income: {
    label: "Income",
  },
  expense: {
    label: "Expense",
  },
} satisfies ChartConfig;

export function TransactionChart() {
  const { data } = api.transactions.getUserLatestTransactions.useQuery({
    transactionAmount: 5,
  });

  const { chartData, maxSum } = useMemo(() => {
    const incomeSum = data?.transactions
      .filter((tran) => tran.type === "income")
      .map((tran) => +tran.amount)
      .reduce((v, acc) => acc + v);

    const expenseSum = data?.transactions
      .filter((tran) => tran.type === "expense")
      .map((tran) => +tran.amount)
      .reduce((v, acc) => acc + v);

    return {
      chartData: [
        {
          type: "income",
          amount: incomeSum,
          fill: "hsl(var(--positive))",
        },
        {
          type: "expense",
          amount: expenseSum,
          fill: "hsl(var(--destructive))",
        },
      ],
      maxSum: Math.max(expenseSum ?? 0, incomeSum ?? 0),
    };
  }, [data]);
  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[300px] min-h-[200px] min-w-[250px]"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <YAxis
          dataKey="amount"
          domain={[0, Math.round(maxSum * 1.1)]}
          axisLine={false}
          tick={false}
          width={0}
        />
        <XAxis
          dataKey="type"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            chartConfig[value as keyof typeof chartConfig]?.label
          }
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar
          dataKey="amount"
          strokeWidth={2}
          radius={8}
          barSize={100}
          // activeIndex={1}
          activeBar={({ ...props }) => {
            return (
              <Rectangle
                {...props}
                fillOpacity={0.8}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                stroke={props.payload.fill as string}
                strokeDasharray={4}
                strokeDashoffset={4}
              />
            );
          }}
        >
          <LabelList position="top" dataKey="amount" fillOpacity={1} />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
