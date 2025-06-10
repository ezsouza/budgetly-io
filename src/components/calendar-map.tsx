"use client"

import { useI18n } from "@/lib/i18n-context"
import type { MonthData } from "@/lib/types"

interface CalendarMapProps {
  data: MonthData
}

export function CalendarMap({ data }: CalendarMapProps) {
  const { lang } = useI18n()
  const [year, month] = data.month.split("-").map(Number)
  const daysInMonth = new Date(year, month, 0).getDate()

  const dailyTotals = Array.from({ length: daysInMonth }, () => 0)
  data.transactions.forEach((t) => {
    const day = t.date.getDate() - 1
    const amount = t.type === "income" ? t.amount : -t.amount
    dailyTotals[day] += amount
  })

  const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US"

  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {Array.from({ length: daysInMonth }, (_, i) => {
        const value = dailyTotals[i]
        const positive = value >= 0
        const color = positive
          ? "bg-green-100 dark:bg-green-900"
          : "bg-red-100 dark:bg-red-900"
        return (
          <div
            key={i}
            className={`p-2 rounded text-xs ${color}`}
            title={new Date(year, month - 1, i + 1).toLocaleDateString(locale)}
          >
            {i + 1}
            <div className="text-[10px] font-medium">
              {value.toFixed(0)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
