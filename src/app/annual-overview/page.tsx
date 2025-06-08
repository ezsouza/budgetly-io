"use client"

import { Suspense, useState } from "react"
import { MonthNavigation } from "@/components/month-navigation"
import { CalendarMap } from "@/components/calendar-map"
import { YearSummary } from "@/components/year-summary"
import { getCurrentMonth, getMonthData } from "@/lib/finance-data"
import { useSearchParams } from "next/navigation"
import { useI18n } from "@/lib/i18n-context"

function OverviewContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const currentMonth = searchParams.get("month") || getCurrentMonth()
  const monthData = getMonthData(currentMonth)
  const [year] = currentMonth.split("-")

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        {t("overviewCalendar.title")}
      </h1>
      <Suspense fallback={<div>{t("common.loading")}</div>}>
        <MonthNavigation currentMonth={currentMonth} />
      </Suspense>
      <CalendarMap data={monthData} />
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          {t("overviewCalendar.annualStats")}
        </h2>
        <YearSummary year={Number(year)} />
      </div>
    </div>
  )
}

export default function AnnualOverviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <OverviewContent />
      </Suspense>
    </div>
  )
}
