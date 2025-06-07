"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { getTransactionById, updateTransaction } from "@/lib/finance-data"
import type { TransactionType } from "@/lib/types"
import { useI18n } from "@/lib/i18n-context"

export default function EditTransactionForm() {
  const router = useRouter()
  const params = useParams()
  const { t } = useI18n()
  const transaction = getTransactionById(params.id as string)

  const [formData, setFormData] = useState({
    type: transaction?.type || "variable",
    amount: transaction?.amount.toString() || "",
    description: transaction?.description || "",
    category: transaction?.category || "",
    date: transaction ? new Date(transaction.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    isRecurring: transaction?.isRecurring || false,
    recurringMonths: transaction?.recurringMonths || 1,
    recurrencePattern: transaction?.recurrencePattern || "monthly",
    customMonths: transaction?.customMonths || ([] as number[]),
    startDate: transaction?.startDate ? transaction.startDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    endDate: transaction?.endDate ? transaction.endDate.toISOString().split("T")[0] : "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!transaction) return

    const updated = {
      type: formData.type as TransactionType,
      amount: Number.parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: new Date(formData.date),
      isRecurring: formData.isRecurring,
      recurringMonths: formData.recurringMonths,
      recurrencePattern: formData.recurrencePattern,
      customMonths: formData.customMonths,
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
    }

    updateTransaction(transaction.id, updated)
    router.push("/")
  }

  const categoryKeys = {
    income: ["Salary", "Freelance", "Investment", "Other"],
    fixed: ["Rent", "Insurance", "Loan Payment", "Subscription", "Utilities"],
    variable: ["Food", "Transportation", "Entertainment", "Shopping", "Healthcare", "Other"],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t("addTransaction.headerTitle")}</h1>
            <p className="text-slate-600">{t("addTransaction.headerSubtitle")}</p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{t("addTransaction.details")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Transaction Type */}
              <div className="space-y-2">
                <Label htmlFor="type">{t("addTransaction.type")}</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: TransactionType) => setFormData({ ...formData, type: value, category: "" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">{t("addTransaction.income")}</SelectItem>
                    <SelectItem value="fixed">{t("addTransaction.fixedExpense")}</SelectItem>
                    <SelectItem value="variable">{t("addTransaction.variableExpense")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">{t("addTransaction.amount")}</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">{t("addTransaction.description")}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t("addTransaction.enterDescription")}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">{t("addTransaction.category")}</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("addTransaction.selectCategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryKeys[formData.type].map((category) => (
                      <SelectItem key={category} value={category}>
                        {t(`category.${category}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">{t("addTransaction.date")}</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              {/* Recurring Options for Incomes and Fixed Expenses */}
              {formData.type !== "variable" && (
                <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="recurring">{t("addTransaction.recurringTransaction")}</Label>
                    <Switch
                      id="recurring"
                      checked={formData.isRecurring}
                      onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: checked })}
                    />
                  </div>

                  {formData.isRecurring && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">{t("addTransaction.startDate")}</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">{t("addTransaction.endDate")}</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pattern">{t("addTransaction.recurrencePattern")}</Label>
                        <Select
                          value={formData.recurrencePattern}
                          onValueChange={(value) => setFormData({ ...formData, recurrencePattern: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">{t("addTransaction.monthly")}</SelectItem>
                            <SelectItem value="semi-annually">{t("addTransaction.semiAnnually")}</SelectItem>
                            <SelectItem value="annually">{t("addTransaction.annually")}</SelectItem>
                            <SelectItem value="custom">{t("addTransaction.custom")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.recurrencePattern === "custom" && (
                        <div className="space-y-2">
                          <Label>{t("addTransaction.selectMonths")}</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {Array.from({ length: 12 }).map((_, idx) => {
                              const monthName = new Date(0, idx).toLocaleString("default", { month: "short" })
                              const checked = formData.customMonths.includes(idx + 1)
                              return (
                                <label key={idx} className="flex items-center gap-1 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => {
                                      const months = [...formData.customMonths]
                                      if (e.target.checked) {
                                        months.push(idx + 1)
                                      } else {
                                        months.splice(months.indexOf(idx + 1), 1)
                                      }
                                      setFormData({ ...formData, customMonths: months })
                                    }}
                                  />
                                  {monthName}
                                </label>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="recurringMonths">{t("addTransaction.numberOfMonths")}</Label>
                        <Input
                          id="recurringMonths"
                          type="number"
                          min="1"
                          value={formData.recurringMonths}
                          onChange={(e) => setFormData({ ...formData, recurringMonths: Number.parseInt(e.target.value) })}
                          placeholder="12"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full flex items-center gap-2">
                <Save className="w-4 h-4" />
                {t("addTransaction.save")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

