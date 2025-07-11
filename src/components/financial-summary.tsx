"use client"

import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react"
import type { MonthData } from "@/lib/types"
import { useI18n } from "@/lib/i18n-context"
import { useCurrency } from "@/lib/currency-context"
import { getCardStyle, getValueColor, getProgressColor, baseCardClasses } from "@/lib/card-styles"

interface FinancialSummaryProps {
  data: MonthData
}

export function FinancialSummary({ data }: FinancialSummaryProps) {
  const { t, lang } = useI18n()
  const { currency, convert } = useCurrency()

  const totalIncome = data.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + convert(t.amount, t.currency as any, currency), 0)

  const totalFixedExpenses = data.transactions
    .filter((t) => t.type === "fixed")
    .reduce((sum, t) => sum + convert(t.amount, t.currency as any, currency), 0)

  const totalVariableExpenses = data.transactions
    .filter((t) => t.type === "variable")
    .reduce((sum, t) => sum + convert(t.amount, t.currency as any, currency), 0)

  const totalExpenses = totalFixedExpenses + totalVariableExpenses
  const netIncome = totalIncome - totalExpenses

  const formatCurrency = (amount: number) => {
    const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US"
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const cards = [
    {
      title: t("financialSummary.totalIncome"),
      value: totalIncome,
      icon: TrendingUp,
      type: 'income' as const,
      maxValue: Math.max(totalIncome, totalExpenses, Math.abs(netIncome))
    },
    {
      title: t("financialSummary.fixedExpenses"),
      value: totalFixedExpenses,
      icon: DollarSign,
      type: 'expense' as const,
      maxValue: Math.max(totalIncome, totalExpenses, Math.abs(netIncome))
    },
    {
      title: t("financialSummary.variableExpenses"),
      value: totalVariableExpenses,
      icon: TrendingDown,
      type: 'expense' as const,
      maxValue: Math.max(totalIncome, totalExpenses, Math.abs(netIncome))
    },
    {
      title: t("financialSummary.netIncome"),
      value: netIncome,
      icon: PiggyBank,
      type: 'net' as const,
      maxValue: Math.max(totalIncome, totalExpenses, Math.abs(netIncome))
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={card.title}
            className={`
              group block
              ${baseCardClasses}
              ${getCardStyle(card.value, card.type)}
            `}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 pointer-events-none" />
            
            {/* Subtle radial gradient for depth */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/5 dark:to-white/5 pointer-events-none" />
            
            {/* Card content */}
            <div className="relative z-10">
              {/* Header with title and icon */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  {card.title}
                </h3>
                <div className="flex items-center space-x-1">
                  <Icon className={`h-5 w-5 ${getValueColor(card.value, card.type)}`} />
                </div>
              </div>
              
              {/* Value display */}
              <div className="space-y-2">
                <p className={`text-2xl font-bold ${getValueColor(card.value, card.type)}`}>
                  {formatCurrency(card.value)}
                </p>
              </div>

              {/* Progress bar indicator */}
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-500 ${getProgressColor(card.value, card.type)}`}
                  style={{ 
                    width: `${card.maxValue > 0 ? Math.min((Math.abs(card.value) / card.maxValue) * 100, 100) : 0}%` 
                  }}
                />
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 dark:group-hover:from-white/5 dark:group-hover:to-white/2 transition-all duration-300 pointer-events-none" />
          </div>
        )
      })}
    </div>
  )
}
