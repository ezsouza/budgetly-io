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
import { getCardStyle, getValueColor, baseCardClasses } from "@/lib/card-styles"

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
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "fixed":
        return <DollarSign className="w-5 h-5 text-blue-600" />
      case "variable":
        return <TrendingDown className="w-5 h-5 text-red-600" />
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

  const getTransactionCardType = (type: string) => {
    switch (type) {
      case "income":
        return 'income' as const
      case "fixed":
      case "variable":
        return 'expense' as const
      default:
        return undefined
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
    <div className="grid grid-cols-1 gap-4">
      {sortedTransactions.map((transaction, index) => {
        const cardType = getTransactionCardType(transaction.type)
        const signedAmount = transaction.type === "income" ? transaction.amount : -transaction.amount
        
        return (
          <div
            key={transaction.id}
            className={`
              group
              ${baseCardClasses}
              ${getCardStyle(signedAmount, cardType)}
            `}
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'fadeInUp 0.4s ease-out forwards'
            }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 pointer-events-none" />
            
            {/* Subtle radial gradient for depth */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/5 dark:to-white/5 pointer-events-none" />
            
            {/* Card content */}
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {getTypeIcon(transaction.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground text-lg">{transaction.description}</h3>
                      {transaction.isRecurring && (
                        <Badge variant="outline" className="text-xs">
                          {t("transactionList.recurring")}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                      <Badge variant="secondary" className={getTypeColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                      <span className="font-medium">{transaction.category}</span>
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
                <div className="flex items-center gap-3 sm:justify-end">
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getValueColor(signedAmount, cardType)}`}>
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount, transaction.currency)}
                      {transaction.currency !== currency && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          {transaction.currency}
                        </Badge>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/edit-transaction/${transaction.id}`}>
                      <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
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
