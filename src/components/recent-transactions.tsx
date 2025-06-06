import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/lib/types"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  if (recentTransactions.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No transactions yet. Add your first transaction to get started!
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
                  {transaction.type}
                </Badge>
                <span className="text-sm text-slate-500">{transaction.category}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>
            <p className="text-sm text-slate-500">{new Date(transaction.date).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
