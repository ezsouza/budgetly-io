export type TransactionType = "income" | "fixed" | "variable"

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string
  category: string
  date: Date
  isRecurring?: boolean
  recurringMonths?: number
}

export interface MonthData {
  month: string
  transactions: Transaction[]
  totalIncome: number
  totalExpenses: number
  netIncome: number
}
