"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Transaction } from "@/lib/types"
import { TrendingUp, TrendingDown, DollarSign, Trash2 } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  const { t, lang } = useI18n()
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

  const sortedTransactions = transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p className="text-lg">{t("transactionList.noTransactions1")}</p>
        <p className="text-sm mt-2">{t("transactionList.noTransactions2")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {sortedTransactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            {getTypeIcon(transaction.type)}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-slate-900">{transaction.description}</h3>
                {transaction.isRecurring && (
                  <Badge variant="outline" className="text-xs">
                    {t("transactionList.recurring")}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Badge variant="secondary" className={getTypeColor(transaction.type)}>
                  {transaction.type}
                </Badge>
                <span>{transaction.category}</span>
                <span>•</span>
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p
                className={`text-lg font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
