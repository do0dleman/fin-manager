"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/app/_components/ui/chart";

export function ByCategoryChart(props: {
  chartConfig: ChartConfig;
  chartData: unknown[];
  activeChart: string;
}) {
  const { chartConfig, chartData, activeChart } = props;

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
        />
        <YAxis />
        <ChartTooltip
          content={
            <ChartTooltipContent className="w-[150px]" nameKey="amount" />
          }
        />
        <Bar dataKey="amount" fill={`var(--color-${activeChart})`} />
      </BarChart>
    </ChartContainer>
  );
}
