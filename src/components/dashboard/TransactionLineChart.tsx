"use client";

import { formatNumberCompact } from "@/lib/utils/formatNumberCompact";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

type TransactionLineChartProps = {
  chartData: {
    day: number;
    totalIncome: number;
    totalExpense: number;
  }[];
};

const TransactionLineChart = ({ chartData }: TransactionLineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Tooltip content={CustomTooltip as any} />
        <CartesianGrid
          strokeDasharray={"3 3"}
          strokeWidth={2}
          stroke="hsla(var(--border))"
        />
        <YAxis
          width={25}
          fontSize={10}
          stroke="hsla(var(--foreground) / 0.3)"
          tickFormatter={(value: string) => {
            return `${formatNumberCompact(value)}`;
          }}
          style={{
            fill: "hsla(0, 0%, 50%)",
          }}
        />
        <XAxis
          fontSize={10}
          dataKey="day"
          style={{
            fill: "hsla(0, 0%, 50%)",
          }}
        />
        <Line
          type={"monotone"}
          dataKey="totalIncome"
          strokeWidth={1.5}
          stroke="hsla(var(--primary))"
        />
        <Line
          type={"monotone"}
          dataKey="totalExpense"
          strokeWidth={1.5}
          stroke="hsla(var(--destructive))"
        />
        <Legend
          payload={[
            {
              value: "Income",
              type: "line",
              color: "hsla(var(--primary))",
              formatter: () => {
                return <span className="text-sm">Income</span>;
              },
            },
            {
              value: "Expense",
              type: "line",
              color: "hsla(var(--destructive))",
              formatter: () => {
                return <span className="text-sm">Expense</span>;
              },
            },
          ]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

type CustomTooltipProps = {
  active: boolean;
  payload: any;
  label: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 rounded shadow border">
        <p className="text-sm">Date: {label}</p>
        <p className="text-sm text-primary">Income: {payload[0].value}</p>
        <p className="text-sm text-destructive">Expense: {payload[1].value}</p>
      </div>
    );
  }
};

export default TransactionLineChart;
