"use client"

import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/lib/types"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const { t, lang } = useI18n()
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
        return "bg-green-100 text-green-800"
      case "fixed":
        return "bg-blue-100 text-blue-800"
      case "variable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US"
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US"
    return new Date(date).toLocaleDateString(locale)
  }

  if (recentTransactions.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        {t("recentTransactions.noTransactions")}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-3">
            {getTypeIcon(transaction.type)}
            <div>
              <p className="font-medium text-slate-900">{transaction.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={getTypeColor(transaction.type)}>
                  {t(`type.${transaction.type}`)}
                </Badge>
                <span className="text-sm text-slate-500">{t(`category.${transaction.category}`)}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>
            <p className="text-sm text-slate-500">{formatDate(transaction.date)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
