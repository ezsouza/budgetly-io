export type TransactionType = "income" | "fixed" | "variable"

export type Currency = "USD" | "BRL" | "EUR"

export interface Transaction {
  id: string
  type: TransactionType
  currency: Currency
  amount: number
  description: string
  category: string
  date: Date
  isRecurring?: boolean
  recurringMonths?: number
  recurrencePattern?: "monthly" | "semi-annually" | "annually" | "custom"
  customMonths?: number[]
  startDate?: Date
  endDate?: Date
}

export interface MonthData {
  month: string
  transactions: Transaction[]
  totalIncome: number
  totalExpenses: number
  netIncome: number
}
