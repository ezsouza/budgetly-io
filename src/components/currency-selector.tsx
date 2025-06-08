"use client"

import { useCurrency, Currency } from "@/lib/currency-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  return (
    <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
      <SelectTrigger className="w-24 sm:w-28">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USD">🇺🇸 USD</SelectItem>
        <SelectItem value="BRL">🇧🇷 BRL</SelectItem>
        <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
      </SelectContent>
    </Select>
  )
}
