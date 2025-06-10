"use client"

import { Suspense } from "react"
import { MonthNavigation } from "@/components/month-navigation"
import { CalendarMap } from "@/components/calendar-map"
import { YearSummary } from "@/components/year-summary"
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
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-foreground">
        {t("overviewCalendar.title")}
      </h1>
      <Suspense fallback={<div>{t("common.loading")}</div>}>
        <MonthNavigation currentMonth={currentMonth} />
      </Suspense>
      <div className="flex gap-2">
        <Button
          variant={currentView === "transactions" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("transactions")}
        >
          {t("overviewCalendar.viewTransactions")}
        </Button>
        <Button
          variant={currentView === "daily" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("daily")}
        >
          {t("overviewCalendar.viewDaily")}
        </Button>
        <Button
          variant={currentView === "annual" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("annual")}
        >
          {t("overviewCalendar.viewAnnual")}
        </Button>
      </div>

      {currentView === "transactions" && (
        <Card>
          <CardHeader>
            <CardTitle>
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
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {t("overviewCalendar.annualStats")}
          </h2>
          <YearSummary year={Number(year)} />
        </div>
      )}
    </div>
  )
}

export default function AnnualOverviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-4">
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <OverviewContent />
      </Suspense>
    </div>
  )
}
