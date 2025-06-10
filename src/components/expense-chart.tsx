"use client"

import type { MonthData } from "@/lib/types"
import { useI18n } from "@/lib/i18n-context"
import { useCurrency } from "@/lib/currency-context"

interface ExpenseChartProps {
  data: MonthData
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  const { t, lang } = useI18n()
  const { currency, convert } = useCurrency()
  const categoryTotals = data.transactions
    .filter((t) => t.type !== "income")
    .reduce(
      (acc, transaction) => {
        const value = convert(transaction.amount, transaction.currency as any, currency)
        acc[transaction.category] = (acc[transaction.category] || 0) + value
        return acc
      },
      {} as Record<string, number>,
    )

  const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0)

  const formatCurrency = (amount: number) => {
    const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US"
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount)
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
    return <div className="text-center py-8 text-muted-foreground">{t("expenseChart.noExpenses")}</div>
  }

  return (
    <div className="space-y-4">
      {Object.entries(categoryTotals).map(([category, amount], index) => {
        const percentage = (amount / totalExpenses) * 100
        return (
          <div key={category} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">{category}</span>
              <span className="text-sm text-muted-foreground">
                {formatCurrency(amount)} ({percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
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
