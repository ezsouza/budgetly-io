"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2, Pencil, Plus } from "lucide-react"
import { WalletCard } from "@/components/wallet-card"
import { useState } from "react"
import { useI18n } from "@/lib/i18n-context"
import { getAllCreditCards, deleteCreditCard } from "@/lib/credit-cards"

export default function CreditCardsPage() {
  const { t } = useI18n()
  const [cards, setCards] = useState(getAllCreditCards())

  const handleDelete = (id: string) => {
    deleteCreditCard(id)
    setCards(getAllCreditCards())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{t("wallet.title")}</h1>
          <Link href="/add-card">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> {t("addCard.title")}
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t("wallet.cards")}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div key={card.id} className="space-y-2">
                <WalletCard card={card} />
                <div className="flex justify-end gap-1">
                  <Link href={`/edit-card/${card.id}`}>
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(card.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
