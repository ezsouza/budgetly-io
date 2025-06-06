import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { TransactionList } from "@/components/transaction-list"
import { MonthNavigation } from "@/components/month-navigation"
import { getCurrentMonth, getMonthData } from "@/lib/finance-data"

export default function TransactionsPage() {
  const currentMonth = getCurrentMonth()
  const monthData = getMonthData(currentMonth)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">All Transactions</h1>
              <p className="text-slate-600">View and manage your transactions</p>
            </div>
          </div>
          <Link href="/add-transaction">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          </Link>
        </div>

        {/* Month Navigation */}
        <MonthNavigation currentMonth={currentMonth} />

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions for {currentMonth}</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionList transactions={monthData.transactions} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
