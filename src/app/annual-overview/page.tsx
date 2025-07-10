"use client"

import { Suspense } from "react"
import { MonthNavigation } from "@/components/month-navigation"
import { CalendarMap } from "@/components/calendar-map"
import { ModernYearSummary } from "@/components/modern-year-summary"
import { TransactionList } from "@/components/transaction-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCurrentMonth, getMonthData } from "@/lib/finance-data"
import { useSearchParams, useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n-context"

function OverviewContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentMonth = searchParams.get("month") || getCurrentMonth()
  const currentView = searchParams.get("view") || "daily"
  const monthData = getMonthData(currentMonth)
  const [year] = currentMonth.split("-")

  const setView = (view: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("view", view)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
          {t("overviewCalendar.title")}
        </h1>
        <p className="text-lg text-muted-foreground">
          Track your financial journey with beautiful, interactive insights
        </p>
      </div>
      <Suspense fallback={<div>{t("common.loading")}</div>}>
        <MonthNavigation currentMonth={currentMonth} />
      </Suspense>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant={currentView === "transactions" ? "default" : "outline"}
          size="lg"
          onClick={() => setView("transactions")}
          className="w-full sm:w-auto rounded-xl font-medium"
        >
          {t("overviewCalendar.viewTransactions")}
        </Button>
        <Button
          variant={currentView === "daily" ? "default" : "outline"}
          size="lg"
          onClick={() => setView("daily")}
          className="w-full sm:w-auto rounded-xl font-medium"
        >
          {t("overviewCalendar.viewDaily")}
        </Button>
        <Button
          variant={currentView === "annual" ? "default" : "outline"}
          size="lg"
          onClick={() => setView("annual")}
          className="w-full sm:w-auto rounded-xl font-medium"
        >
          {t("overviewCalendar.viewAnnual")}
        </Button>
      </div>

      {currentView === "transactions" && (
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">
              {t("transactionsPage.transactionsFor")} {currentMonth}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionList transactions={monthData.transactions} />
          </CardContent>
        </Card>
      )}

      {currentView === "daily" && <CalendarMap data={monthData} />}

      {currentView === "annual" && (
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-foreground bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t("overviewCalendar.annualStats")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your financial overview for {year} - Track your progress month by month
            </p>
          </div>
          <ModernYearSummary year={Number(year)} />
        </div>
      )}
    </div>
  )
}

export default function AnnualOverviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <OverviewContent />
      </Suspense>
    </div>
  )
}
