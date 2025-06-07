import { Suspense } from "react"
import { MonthNavigation } from "@/components/month-navigation"
import { FinancialSummary } from "@/components/financial-summary"
import { ExpenseChart } from "@/components/expense-chart"
import { getCurrentMonth, getMonthData } from "@/lib/finance-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MonthlyBudgetPage() {
  const currentMonth = getCurrentMonth()
  const monthData = getMonthData(currentMonth)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Monthly Budget</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <MonthNavigation currentMonth={currentMonth} />
          </Suspense>
        <FinancialSummary data={monthData} />
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="h-64 bg-slate-100 animate-pulse rounded" />}>
              <ExpenseChart data={monthData} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
