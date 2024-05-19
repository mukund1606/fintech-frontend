"use client";
import { api } from "@/trpc/react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart() {
  const { data } = api.user.getBudget.useQuery();
  const { data: data2 } = api.expenses.getExpensesForGraph.useQuery();
  const colors = [
    "#F09EA7",
    "#F6CA94",
    "#FAFABE",
    "#C1EBC0",
    "#C7CAFF",
    "#CDABEB",
    "#F6C2F3",
  ];

  return (
    <div className="flex flex-col xl:flex-row">
      <div className="w-full xl:w-[35%]">
        <ResponsiveContainer width="100%" aspect={1} minHeight={0}>
          <PieChart>
            <Pie data={data} dataKey="budget" nameKey="category">
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-auto w-full xl:w-[64%]">
        <ResponsiveContainer width="99%" aspect={2} minHeight={0}>
          <LineChart
            width={730}
            height={250}
            data={data2}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#C7CAFF"
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#F6C2F3"
              name="Expense"
            />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
