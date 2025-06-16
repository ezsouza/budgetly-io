"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import { getTransactionById, updateTransaction, deleteTransaction } from "@/lib/finance-data"
import type { TransactionType, Currency, CreditCard } from "@/lib/types"
import { useI18n } from "@/lib/i18n-context"
import { useCurrency } from "@/lib/currency-context"
import { getAllCreditCards, addCreditCard } from "@/lib/credit-cards"

export default function EditTransactionForm() {
  const router = useRouter()
  const params = useParams()
  const { t } = useI18n()
  const { currency } = useCurrency()

  const [creditCards, setCreditCards] = useState<CreditCard[]>(getAllCreditCards())
  const [showNewCard, setShowNewCard] = useState(false)
  const [newCard, setNewCard] = useState({
    name: '',
    brand: '',
    closingDay: 1,
    dueDay: 1,
    limit: '',
  })

  const [formData, setFormData] = useState({
    type: "variable" as TransactionType,
    amount: "",
    currency,
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    creditCardId: undefined as string | undefined,
    includeInStatement: true,
    isRecurring: false,
    recurringMonths: undefined as number | undefined,
    recurrencePattern: "monthly",
    customMonths: [] as number[],
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    noEndDate: true,
  })

  useEffect(() => {
    if (!params.id) return
    const loaded = getTransactionById(params.id as string)
    if (loaded) {
      setFormData({
        type: loaded.type,
        amount: loaded.amount.toString(),
        currency: loaded.currency,
        description: loaded.description,
        category: loaded.category,
        date: new Date(loaded.date).toISOString().split("T")[0],
        creditCardId: loaded.creditCardId,
        includeInStatement: loaded.includeInStatement ?? true,
        isRecurring: loaded.isRecurring || false,
        recurringMonths: loaded.recurringMonths,
        recurrencePattern: loaded.recurrencePattern || "monthly",
        customMonths: loaded.customMonths || [],
        startDate: loaded.startDate
          ? loaded.startDate.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        endDate: loaded.endDate ? loaded.endDate.toISOString().split("T")[0] : "",
      noEndDate: !loaded.endDate,
    })
  }
  }, [params.id])

  useEffect(() => {
    if (formData.noEndDate) {
      setFormData((prev) => ({ ...prev, recurringMonths: undefined }))
      return
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()) +
        1

      if (months > 0) {
        let interval = 1
        switch (formData.recurrencePattern) {
          case "semi-annually":
            interval = 6
            break
          case "annually":
            interval = 12
            break
        }

        const adjusted = Math.ceil(months / interval) * interval

        setFormData((prev) => {
          if (prev.recurringMonths === adjusted && prev.isRecurring) return prev
          return {
            ...prev,
            isRecurring: true,
            recurringMonths: adjusted,
          }
        })
      }
    }
  }, [
    formData.startDate,
    formData.endDate,
    formData.noEndDate,
    formData.recurrencePattern,
  ])

  useEffect(() => {
    setFormData((prev) => ({ ...prev, currency }))
  }, [currency])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!params.id) return

    const updated = {
      type: formData.type as TransactionType,
      amount: Number.parseFloat(formData.amount),
      currency: formData.currency as Currency,
      description: formData.description,
      category: formData.category,
      date: new Date(formData.date),
      creditCardId: formData.creditCardId,
      includeInStatement: formData.includeInStatement,
      isRecurring: formData.isRecurring,
      recurringMonths: formData.recurringMonths,
      recurrencePattern: formData.recurrencePattern,
      customMonths: formData.customMonths,
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.noEndDate
        ? undefined
        : formData.endDate
        ? new Date(formData.endDate)
        : undefined,
    }

    updateTransaction(params.id as string, updated)
    router.push("/")
  }

  const handleDelete = () => {
    if (!params.id) return
    deleteTransaction(params.id as string)
    router.push("/")
  }

  const categoryKeys = {
    income: ["Salary", "Freelance", "Investment", "Other"],
    fixed: ["Rent", "Insurance", "Loan Payment", "Subscription", "Utilities"],
    variable: ["Food", "Transportation", "Entertainment", "Shopping", "Healthcare", "Other"],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("editTransaction.headerTitle")}</h1>
            <p className="text-muted-foreground">{t("editTransaction.headerSubtitle")}</p>
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

              <div className="space-y-2">
                <Label htmlFor="currency">{t("addTransaction.currency")}</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => setFormData({ ...formData, currency: value as Currency })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="BRL">BRL</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
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

              {/* Credit Card Selection */}
              <div className="space-y-2">
                <Label>{t("addTransaction.creditCard")}</Label>
                <Select
                  value={formData.creditCardId || ""}
                  onValueChange={(value) => {
                    if (value === "__new__") {
                      setShowNewCard(true)
                      return
                    }
                    setFormData({ ...formData, creditCardId: value })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("addTransaction.selectCard")} />
                  </SelectTrigger>
                  <SelectContent>
                    {creditCards.map((card) => (
                      <SelectItem key={card.id} value={card.id}>
                        {card.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="__new__">{t("addTransaction.newCard")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {showNewCard && (
                <div className="space-y-2 p-4 border rounded-lg">
                  <Label>{t("addCard.title")}</Label>
                  <Input
                    placeholder={t("addCard.name")}
                    value={newCard.name}
                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                  />
                  <Input
                    placeholder={t("addCard.brand")}
                    value={newCard.brand}
                    onChange={(e) => setNewCard({ ...newCard, brand: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder={t("addCard.closing")}
                      value={newCard.closingDay}
                      onChange={(e) => setNewCard({ ...newCard, closingDay: Number(e.target.value) })}
                    />
                    <Input
                      type="number"
                      placeholder={t("addCard.due")}
                      value={newCard.dueDay}
                      onChange={(e) => setNewCard({ ...newCard, dueDay: Number(e.target.value) })}
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder={t("addCard.limit")}
                    value={newCard.limit}
                    onChange={(e) => setNewCard({ ...newCard, limit: e.target.value })}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const card = {
                        id: Date.now().toString(),
                        name: newCard.name,
                        brand: newCard.brand,
                        closingDay: newCard.closingDay,
                        dueDay: newCard.dueDay,
                        limit: Number(newCard.limit),
                      }
                      addCreditCard(card)
                      setCreditCards(getAllCreditCards())
                      setFormData({ ...formData, creditCardId: card.id })
                      setNewCard({ name: '', brand: '', closingDay: 1, dueDay: 1, limit: '' })
                      setShowNewCard(false)
                    }}
                  >
                    {t("addCard.save")}
                  </Button>
                </div>
              )}

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
                <div className="space-y-4 p-4 bg-muted rounded-lg">
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
                        <div className="flex items-center justify-between">
                          <Label htmlFor="noEndDate">{t("addTransaction.noEndDate")}</Label>
                          <Switch
                            id="noEndDate"
                            checked={formData.noEndDate}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                noEndDate: checked,
                                ...(checked ? { endDate: "" } : {}),
                              })
                            }
                          />
                        </div>
                        <Input
                          id="endDate"
                          type="date"
                          disabled={formData.noEndDate}
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

                      {!formData.noEndDate && (
                        <div className="space-y-2">
                          <Label htmlFor="recurringMonths">{t("addTransaction.numberOfMonths")}</Label>
                          <Input
                            id="recurringMonths"
                            type="number"
                            min="1"
                            value={formData.recurringMonths}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                recurringMonths: Number.parseInt(e.target.value),
                              })
                            }
                            placeholder="12"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full flex items-center gap-2">
                <Save className="w-4 h-4" />
                {t("editTransaction.save")}
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="w-full flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {t("editTransaction.delete")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

