import React, { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/app/_components/ui/chart";
import { type transactions } from "~/server/db/schema";
import { api } from "~/trpc/react";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  income: {
    label: "Income",
    color: "hsl(var(--positive))",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

function OverTimeChart(props: { timeRange: "90d" | "30d" | "7d" }) {
  const { timeRange } = props;

  const endDate = new Date();
  const startDate = new Date();
  let daysToSubtract = 90;
  if (timeRange === "30d") {
    daysToSubtract = 30;
  } else if (timeRange === "7d") {
    daysToSubtract = 7;
  }
  startDate.setDate(startDate.getDate() - daysToSubtract);

  const { data, isFetched } = api.transactions.getPeriodTransactions.useQuery({
    stratDate: startDate.toISOString().split("T")[0]!,
    endDate: endDate.toISOString().split("T")[0]!,
    orderBy: "desc",
  });

  const chartData = useMemo(() => {
    if (data === undefined) return [];
    const chartDataArr = [];
    const tranData: (typeof transactions.$inferSelect | null)[] = [
      ...data.transactions,
    ];
    for (let i = 0; i <= daysToSubtract; i++) {
      const date = new Date();
      date.setDate(date.getDate() - daysToSubtract);
      date.setDate(date.getDate() + i);
      date.setHours(23);
      date.setMinutes(59);
      const dateString = date.toISOString().split("T")[0];

      let incomeSum = 0;
      let expenseSum = 0;
      for (let j = tranData.length; j >= 0; j--) {
        const transaction = tranData[j];
        if (transaction === undefined || transaction === null) continue; // For Typescript
        if (transaction.createdAt.getTime() - date.getTime() < 0) {
          if (transaction.type === "income") incomeSum += +transaction.amount;
          if (transaction.type === "expense") expenseSum += +transaction.amount;
          if (tranData[j]?.createdAt) {
            tranData[j] = null;
          }
        }
      }
      chartDataArr.push({
        date: dateString,
        income: incomeSum,
        expense: expenseSum,
      });
    }
    return chartDataArr;
  }, [data, daysToSubtract]);

  if (!isFetched || data === undefined) {
    return <></>;
  }

  const maxExpense = Math.max(...chartData.map((item) => item.expense), 1);
  const maxIncome = Math.max(...chartData.map((item) => item.income), 1);
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[300px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <YAxis
          domain={[0, Math.round((maxExpense + maxIncome) * 1.1)]}
          axisLine={false}
          tick={false}
          width={0}
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value as string);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value as string).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              indicator="dot"
            />
          }
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="income"
          type="monotone"
          stroke="var(--color-income)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="expense"
          type="monotone"
          stroke="var(--color-expense)"
          strokeWidth={2}
          dot={false}
        />
        <ChartLegend content={<ChartLegendContent />} />;
      </LineChart>
    </ChartContainer>
  );
}

export default OverTimeChart;
