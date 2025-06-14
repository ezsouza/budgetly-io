"use client"

import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/lib/types"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { useCurrency } from "@/lib/currency-context"

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const { t, lang } = useI18n()
  const { currency, convert } = useCurrency()
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "fixed":
        return <DollarSign className="w-4 h-4 text-blue-600" />
      case "variable":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "income":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "fixed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "variable":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const formatCurrency = (amount: number, from: string) => {
    const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US"
    const value = convert(amount, from as any, currency)
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value)
  }

  if (recentTransactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {t("recentTransactions.noTransactions")}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recentTransactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-card text-card-foreground rounded-lg"
        >
          <div className="flex items-start gap-3 flex-1">
            {getTypeIcon(transaction.type)}
            <div>
              <p className="font-medium text-foreground">{transaction.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={getTypeColor(transaction.type)}>
                  {transaction.type}
                </Badge>
                <span className="text-sm text-muted-foreground">{transaction.category}</span>
              </div>
            </div>
          </div>
          <div className="mt-2 sm:mt-0 text-right">
            <p className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount, transaction.currency)}
              {transaction.currency !== currency && (
                <Badge variant="outline" className="ml-1 text-xs">
                  {transaction.currency}
                </Badge>
              )}
            </p>
            <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
