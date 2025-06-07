import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"
import { MonthNavigation } from "@/components/month-navigation"
import { FinancialSummary } from "@/components/financial-summary"
import { RecentTransactions } from "@/components/recent-transactions"
import { ExpenseChart } from "@/components/expense-chart"
import { getCurrentMonth, getMonthData } from "@/lib/finance-data"

export default function Dashboard() {
  const currentMonth = getCurrentMonth()
  const monthData = getMonthData(currentMonth)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Finance Tracker</h1>
            <p className="text-slate-600">Manage your monthly finances with ease</p>
          </div>
          <Link href="/add-transaction">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          </Link>
        </div>

          {/* Month Navigation */}
          <Suspense fallback={<div>Loading...</div>}>
            <MonthNavigation currentMonth={currentMonth} />
          </Suspense>

        {/* Financial Summary Cards */}
        <FinancialSummary data={monthData} />

        {/* Charts and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div className="h-64 bg-slate-100 animate-pulse rounded" />}>
                <ExpenseChart data={monthData} />
              </Suspense>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecentTransactions transactions={monthData.transactions} />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/add-transaction?type=income">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  Add Income
                </Button>
              </Link>
              <Link href="/add-transaction?type=fixed">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  Add Fixed Expense
                </Button>
              </Link>
              <Link href="/add-transaction?type=variable">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                  Add Variable Expense
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
