"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { addTransaction } from "@/lib/finance-data"
import type { TransactionType } from "@/lib/types"
import { useI18n } from "@/lib/i18n-context"

export default function AddTransactionForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = (searchParams.get("type") as TransactionType) || "variable"
  const { t } = useI18n()

  const [formData, setFormData] = useState({
    type: defaultType,
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    isRecurring: false,
    recurringMonths: 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const transaction = {
      id: Date.now().toString(),
      type: formData.type,
      amount: Number.parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: new Date(formData.date),
      isRecurring: formData.isRecurring,
      recurringMonths: formData.recurringMonths,
    }

    addTransaction(transaction)
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
                  required
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

              {/* Recurring Options for Fixed Expenses */}
              {formData.type === "fixed" && (
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

