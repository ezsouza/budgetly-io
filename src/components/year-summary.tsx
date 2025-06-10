"use client"

import { useI18n } from "@/lib/i18n-context"
import { getMonthData } from "@/lib/finance-data"
import Link from "next/link"

interface YearSummaryProps {
  year: number
}

export function YearSummary({ year }: YearSummaryProps) {
  const { lang, t } = useI18n()
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = `${year}-${(i + 1).toString().padStart(2, "0")}`
    const data = getMonthData(month)
    return { month: i + 1, net: data.netIncome }
  })

  const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US"

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {months.map((m) => (
        <Link
          href={`/transactions?month=${year}-${m.month.toString().padStart(2, "0")}`}
          key={m.month}
          className="p-3 bg-card text-card-foreground rounded shadow-sm text-center block"
        >
          <div className="font-medium">
            {new Date(year, m.month - 1).toLocaleDateString(locale, {
              month: "short",
            })}
          </div>
          <div
            className={`text-sm font-semibold ${
              m.net >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {t("overviewCalendar.netIncome")}: {m.net.toFixed(0)}
          </div>
        </Link>
      ))}
    </div>
  )
}
