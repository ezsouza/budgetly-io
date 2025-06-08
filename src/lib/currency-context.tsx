"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import type { Currency } from "./types"

const rates: Record<Currency, number> = {
  USD: 1,
  BRL: 5,
  EUR: 0.9,
}

const conversionTax = 0.01

interface CurrencyContextValue {
  currency: Currency
  setCurrency: (c: Currency) => void
  convert: (amount: number, from: Currency, to?: Currency) => number
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(
  undefined,
)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD")

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (localStorage.getItem("currency") as Currency | null)
        : null
    if (stored) setCurrencyState(stored)
  }, [])

  const setCurrency = (c: Currency) => {
    setCurrencyState(c)
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", c)
    }
  }

  const convert = (amount: number, from: Currency, to: Currency = currency) => {
    if (from === to) return amount
    const usd = amount / rates[from]
    const converted = usd * rates[to]
    return converted * (1 + conversionTax)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider")
  return ctx
}
