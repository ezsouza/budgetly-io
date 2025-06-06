"use client"

import type { MonthData } from "@/lib/types"

interface ExpenseChartProps {
  data: MonthData
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  const categoryTotals = data.transactions
    .filter((t) => t.type !== "income")
    .reduce(
      (acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
      },
      {} as Record<string, number>,
    )

  const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
  ]

  if (totalExpenses === 0) {
    return <div className="text-center py-8 text-slate-500">No expenses recorded yet.</div>
  }

  return (
    <div className="space-y-4">
      {Object.entries(categoryTotals).map(([category, amount], index) => {
        const percentage = (amount / totalExpenses) * 100
        return (
          <div key={category} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">{category}</span>
              <span className="text-sm text-slate-600">
                {formatCurrency(amount)} ({percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${colors[index % colors.length]}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
