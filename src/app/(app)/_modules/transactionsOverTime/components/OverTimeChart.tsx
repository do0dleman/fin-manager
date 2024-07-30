import React, { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/app/_components/ui/chart";
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
    const tranData = [...data.transactions];
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
        if (transaction?.createdAt === undefined) continue; // For Typescript
        if (transaction.createdAt.getTime() - date.getTime() < 0) {
          if (transaction.type === "income") incomeSum += +transaction.amount;
          if (transaction.type === "expense") expenseSum += +transaction.amount;
          tranData.pop();
        } else {
          break;
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

  const maxExpense = Math.max(...chartData.map((item) => item.expense));
  const maxIncome = Math.max(...chartData.map((item) => item.income));
  // const maxVal = Math.max(maxExpense, maxIncome);
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[300px] w-full"
    >
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-income)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-income)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-expense)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-expense)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
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
        <Area
          dataKey="expense"
          type="natural"
          fill="url(#fillExpense)"
          stroke="hsl(var(--destructive))"
          stackId="a"
        />
        <Area
          dataKey="income"
          type="natural"
          fill="url(#fillIncome)"
          stroke="hsl(var(--positive))"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}

export default OverTimeChart;
