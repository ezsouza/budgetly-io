"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { TransactionList } from "@/components/transaction-list"
import { MonthNavigation } from "@/components/month-navigation"
import { getCurrentMonth, getMonthData } from "@/lib/finance-data"
import { useI18n } from "@/lib/i18n-context"
import { useSearchParams } from "next/navigation"

function TransactionsContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const currentMonth = searchParams.get("month") || getCurrentMonth()
  const monthData = getMonthData(currentMonth)

  return (
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
              <h1 className="text-2xl font-bold text-foreground">{t("transactionsPage.allTransactions")}</h1>
              <p className="text-muted-foreground">{t("transactionsPage.viewManage")}</p>
            </div>
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

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>{t("transactionsPage.transactionsFor")} {currentMonth}</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionList transactions={monthData.transactions} />
          </CardContent>
        </Card>
      </div>
  )
}

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-4">
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <TransactionsContent />
      </Suspense>
    </div>
  )
}
