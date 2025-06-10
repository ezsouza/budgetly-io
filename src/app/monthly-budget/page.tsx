"use client"

import { Suspense } from "react"
import { MonthNavigation } from "@/components/month-navigation"
import { FinancialSummary } from "@/components/financial-summary"
import { ExpenseChart } from "@/components/expense-chart"
import { getCurrentMonth, getMonthData } from "@/lib/finance-data"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n-context"

function PageContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const currentMonth = searchParams.get("month") || getCurrentMonth()
  const monthData = getMonthData(currentMonth)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-foreground">{t("monthlyBudgetPage.title")}</h1>
      <Suspense fallback={<div>{t("common.loading")}</div>}>
        <MonthNavigation currentMonth={currentMonth} />
      </Suspense>
      <FinancialSummary data={monthData} />
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.expenseBreakdown")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded" />}>
            <ExpenseChart data={monthData} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

export default function MonthlyBudgetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-4">
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <PageContent />
      </Suspense>
    </div>
  )
}
