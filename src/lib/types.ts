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
  /** Optional credit card this transaction is linked to */
  creditCardId?: string
  /** Whether this amount should be included in card statement calculations */
  includeInStatement?: boolean
  isRecurring?: boolean
  recurringMonths?: number
  recurrencePattern?: "monthly" | "semi-annually" | "annually" | "custom"
  customMonths?: number[]
  startDate?: Date
  endDate?: Date
}

export interface CreditCard {
  id: string
  name: string
  brand: string
  closingDay: number
  dueDay: number
  limit: number
}

export interface MonthData {
  month: string
  transactions: Transaction[]
  totalIncome: number
  totalExpenses: number
  netIncome: number
}
