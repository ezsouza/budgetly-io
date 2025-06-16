"use client"
import type { CreditCard } from "@/lib/types"
import { cn } from "@/lib/utils"

interface WalletCardProps {
  card: CreditCard
  className?: string
}

export function WalletCard({ card, className }: WalletCardProps) {
  return (
    <div
      className={cn(
        "relative h-40 w-full rounded-xl p-4 text-white shadow-md bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 flex flex-col justify-between",
        className
      )}
    >
      <div className="flex justify-between text-sm">
        <span className="uppercase font-semibold">{card.brand}</span>
        <span>Limit {card.limit}</span>
      </div>
      <div className="text-lg font-medium">{card.name}</div>
      <div className="flex justify-between text-xs">
        <span>Closing {card.closingDay}</span>
        <span>Due {card.dueDay}</span>
      </div>
    </div>
  )
}
