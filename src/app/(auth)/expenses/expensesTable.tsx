"use client";

import { api } from "@/trpc/react";

export default function ExpensesTable() {
  const { data: expenses } = api.expenses.getExpenses.useQuery();
  return <div>{JSON.stringify(expenses)}</div>;
}
