"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Transaction } from "@/lib/types"
import { TrendingUp, TrendingDown, DollarSign, Trash2, Pencil } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { useCurrency } from "@/lib/currency-context"
import { useState } from "react"
import { deleteTransaction } from "@/lib/finance-data"
import { getCreditCardById } from "@/lib/credit-cards"

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  const { t, lang } = useI18n()
  const { currency, convert } = useCurrency()
  const [txs, setTxs] = useState(transactions)
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
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value)
  }

  const handleDelete = (id: string) => {
    deleteTransaction(id)
    setTxs((prev) => prev.filter((t) => t.id !== id))
  }

  const sortedTransactions = txs
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (txs.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
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
          className="flex flex-col sm:flex-row justify-between gap-3 p-4 bg-card text-card-foreground border rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4 flex-1">
            {getTypeIcon(transaction.type)}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-foreground">{transaction.description}</h3>
                {transaction.isRecurring && (
                  <Badge variant="outline" className="text-xs">
                    {t("transactionList.recurring")}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className={getTypeColor(transaction.type)}>
                  {transaction.type}
                </Badge>
                <span>{transaction.category}</span>
                <span>•</span>
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
                {transaction.creditCardId && (
                  <>
                    <span>•</span>
                    <Badge variant="outline">
                      {getCreditCardById(transaction.creditCardId)?.name}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:justify-end mt-2 sm:mt-0">
            <div className="text-right">
              <p
                className={`text-lg font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount, transaction.currency)}
                {transaction.currency !== currency && (
                  <Badge variant="outline" className="ml-1 text-xs">
                    {transaction.currency}
                  </Badge>
                )}
              </p>
            </div>
            <Link href={`/edit-transaction/${transaction.id}`}>
              <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700">
                <Pencil className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(transaction.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
