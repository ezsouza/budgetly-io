"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { addCreditCard } from "@/lib/credit-cards"
import type { CreditCard } from "@/lib/types"
import { useI18n } from "@/lib/i18n-context"

export default function AddCardForm() {
  const router = useRouter()
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    closingDay: 1,
    dueDay: 1,
    limit: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const card: CreditCard = {
      id: Date.now().toString(),
      name: formData.name,
      brand: formData.brand,
      closingDay: formData.closingDay,
      dueDay: formData.dueDay,
      limit: Number(formData.limit),
    }
    addCreditCard(card)
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
                {t("addCard.save")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
