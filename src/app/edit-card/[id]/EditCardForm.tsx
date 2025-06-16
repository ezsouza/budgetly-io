"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import { getCreditCardById, updateCreditCard, deleteCreditCard } from "@/lib/credit-cards"
import type { CreditCard } from "@/lib/types"
import { useI18n } from "@/lib/i18n-context"

export default function EditCardForm() {
  const router = useRouter()
  const params = useParams()
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    closingDay: 1,
    dueDay: 1,
    limit: "",
  })

  useEffect(() => {
    if (!params.id) return
    const card = getCreditCardById(params.id as string)
    if (card) {
      setFormData({
        name: card.name,
        brand: card.brand,
        closingDay: card.closingDay,
        dueDay: card.dueDay,
        limit: card.limit.toString(),
      })
    }
  }, [params.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!params.id) return
    const updated: Partial<CreditCard> = {
      name: formData.name,
      brand: formData.brand,
      closingDay: formData.closingDay,
      dueDay: formData.dueDay,
      limit: Number(formData.limit),
    }
    updateCreditCard(params.id as string, updated)
    router.push("/credit-cards")
  }

  const handleDelete = () => {
    if (!params.id) return
    deleteCreditCard(params.id as string)
    router.push("/credit-cards")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-4">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/credit-cards">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("addCard.title")}</h1>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t("addCard.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>{t("addCard.name")}</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>{t("addCard.brand")}</Label>
                <Input value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
              </div>
              <div className="flex gap-2">
                <div className="space-y-2 flex-1">
                  <Label>{t("addCard.closing")}</Label>
                  <Input type="number" value={formData.closingDay} onChange={(e) => setFormData({ ...formData, closingDay: Number(e.target.value) })} />
                </div>
                <div className="space-y-2 flex-1">
                  <Label>{t("addCard.due")}</Label>
                  <Input type="number" value={formData.dueDay} onChange={(e) => setFormData({ ...formData, dueDay: Number(e.target.value) })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("addCard.limit")}</Label>
                <Input type="number" value={formData.limit} onChange={(e) => setFormData({ ...formData, limit: e.target.value })} />
              </div>
              <Button type="submit" className="w-full flex items-center gap-2">
                <Save className="w-4 h-4" />
                {t("editTransaction.save")}
              </Button>
              <Button type="button" variant="destructive" onClick={handleDelete} className="w-full flex items-center gap-2">
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
