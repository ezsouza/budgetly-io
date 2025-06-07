"use client"

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
import { useSearchParams } from "next/navigation"
import { useI18n } from "@/lib/i18n-context"

function DashboardContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const currentMonth = searchParams.get("month") || getCurrentMonth()
  const monthData = getMonthData(currentMonth)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t("dashboard.title")}</h1>
            <p className="text-slate-600">{t("dashboard.subtitle")}</p>
          </div>
          <Link href="/add-transaction">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {t("dashboard.addTransaction")}
            </Button>
          </Link>
        </div>

          {/* Month Navigation */}
          <Suspense fallback={<div>{t("common.loading")}</div>}>
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
                {t("dashboard.expenseBreakdown")}
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
                {t("dashboard.recentTransactions")}
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
            <CardTitle>{t("dashboard.quickActions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/add-transaction?type=income">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  {t("dashboard.addIncome")}
                </Button>
              </Link>
              <Link href="/add-transaction?type=fixed">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  {t("dashboard.addFixedExpense")}
                </Button>
              </Link>
              <Link href="/add-transaction?type=variable">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                  {t("dashboard.addVariableExpense")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}
