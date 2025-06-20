"use client"
import type { CreditCard } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

interface WalletCardProps {
  card: CreditCard
  className?: string
}

export function WalletCard({ card, className }: WalletCardProps) {
  const { t } = useI18n()
  return (
    <div
      className={cn(
        "relative h-40 w-full rounded-xl p-4 text-white shadow-md bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 flex flex-col justify-between",
        className
      )}
    >
      <div className="flex justify-between text-sm">
        <span className="uppercase font-semibold">{card.brand}</span>
        <span>
          {t("wallet.limit")} {card.limit}
        </span>
      </div>
      <div className="text-lg font-medium">{card.name}</div>
      <div className="flex justify-between text-xs">
        <span>
          {t("wallet.closing")} {card.closingDay}
        </span>
        <span>
          {t("wallet.due")} {card.dueDay}
        </span>
      </div>
    </div>
  )
}
