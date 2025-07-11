"use client"

import { useI18n } from "@/lib/i18n-context"
import { getMonthData } from "@/lib/finance-data"
import Link from "next/link"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface ModernYearSummaryProps {
  year: number
}

export function ModernYearSummary({ year }: ModernYearSummaryProps) {
  const { lang, t } = useI18n()
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = `${year}-${(i + 1).toString().padStart(2, "0")}`
    const data = getMonthData(month)
    return { 
      month: i + 1, 
      net: data.netIncome,
      monthName: new Date(year, i).toLocaleDateString(lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US", {
        month: "short",
      })
    }
  })

  const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US"

  // Calculate trend for each month (comparing to previous month)
  const monthsWithTrend = months.map((m, index) => {
    const prevMonth = index > 0 ? months[index - 1] : null
    let trend: 'up' | 'down' | 'neutral' = 'neutral'
    
    if (prevMonth) {
      if (m.net > prevMonth.net) trend = 'up'
      else if (m.net < prevMonth.net) trend = 'down'
    }
    
    return { ...m, trend }
  })

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getCardStyle = (net: number) => {
    if (net > 0) {
      return "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30 border-green-200 dark:border-green-800 hover:shadow-green-200/50 dark:hover:shadow-green-900/30 hover:border-green-300 dark:hover:border-green-700"
    } else if (net < 0) {
      return "bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/30 border-red-200 dark:border-red-800 hover:shadow-red-200/50 dark:hover:shadow-red-900/30 hover:border-red-300 dark:hover:border-red-700"
    } else {
      return "bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/30 border-gray-200 dark:border-gray-700 hover:shadow-gray-200/50 dark:hover:shadow-gray-900/30 hover:border-gray-300 dark:hover:border-gray-600"
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {monthsWithTrend.map((m, index) => (
        <Link
          href={`/transactions?month=${year}-${m.month.toString().padStart(2, "0")}`}
          key={m.month}
          className="group block"
          style={{
            animationDelay: `${index * 50}ms`,
            animation: 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          <div
            className={`
              relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-2xl hover:-translate-y-1 transform-gpu
              active:scale-95 active:transition-none
              ${getCardStyle(m.net)}
            `}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 pointer-events-none" />
            
            {/* Subtle radial gradient for depth */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/5 dark:to-white/5 pointer-events-none" />
            
            {/* Card content */}
            <div className="relative z-10">
              {/* Header with month and trend */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {m.monthName}
                </h3>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(m.trend)}
                </div>
              </div>
              
              {/* Net income display */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  {t("overviewCalendar.netIncome")}
                </p>
                <p className={`text-2xl font-bold ${
                  m.net > 0 
                    ? "text-green-700 dark:text-green-400" 
                    : m.net < 0 
                      ? "text-red-700 dark:text-red-400" 
                      : "text-gray-700 dark:text-gray-300"
                }`}>
                  {new Intl.NumberFormat(locale, { 
                    style: 'currency', 
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(m.net)}
                </p>
              </div>

              {/* Progress bar indicator */}
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-500 ${
                    m.net > 0 
                      ? "bg-green-500" 
                      : m.net < 0 
                        ? "bg-red-500" 
                        : "bg-gray-400"
                  }`}
                  style={{ width: `${Math.min(Math.abs(m.net) / 1000 * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 dark:group-hover:from-white/5 dark:group-hover:to-white/2 transition-all duration-300 pointer-events-none" />
          </div>
        </Link>
      ))}
    </div>
  )
}