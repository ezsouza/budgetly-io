"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react"
import type { MonthData } from "@/lib/types"
import { useI18n } from "@/lib/i18n-context"
import { useCurrency } from "@/lib/currency-context"

interface FinancialSummaryProps {
  data: MonthData
}

export function FinancialSummary({ data }: FinancialSummaryProps) {
  const { t, lang } = useI18n()
  const { currency, convert } = useCurrency()

  const totalIncome = data.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + convert(t.amount, t.currency as any, currency), 0)

  const totalFixedExpenses = data.transactions
    .filter((t) => t.type === "fixed")
    .reduce((sum, t) => sum + convert(t.amount, t.currency as any, currency), 0)

  const totalVariableExpenses = data.transactions
    .filter((t) => t.type === "variable")
    .reduce((sum, t) => sum + convert(t.amount, t.currency as any, currency), 0)

  const totalExpenses = totalFixedExpenses + totalVariableExpenses
  const netIncome = totalIncome - totalExpenses

  const formatCurrency = (amount: number) => {
    const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US"
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("financialSummary.totalIncome")}</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("financialSummary.fixedExpenses")}</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalFixedExpenses)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("financialSummary.variableExpenses")}</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{formatCurrency(totalVariableExpenses)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("financialSummary.netIncome")}</CardTitle>
          <PiggyBank className={`h-4 w-4 ${netIncome >= 0 ? "text-green-600" : "text-red-600"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${netIncome >= 0 ? "text-green-600" : "text-red-600"}`}>
            {formatCurrency(netIncome)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
