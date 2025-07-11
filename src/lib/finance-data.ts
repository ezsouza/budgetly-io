import type { Transaction, MonthData, Currency } from "./types"
import { getCreditCardById } from "./credit-cards"

const rates: Record<Currency, number> = { USD: 1, BRL: 5, EUR: 0.9 }
const BASE_CURRENCY: Currency = "USD"

function toBase(amount: number, currency: Currency) {
  if (currency === BASE_CURRENCY) return amount
  const usd = amount / rates[currency]
  return usd * rates[BASE_CURRENCY]
}

// Mock data storage - in a real app, this would be a database
let transactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    currency: "USD",
    amount: 5000,
    description: "Monthly Salary",
    category: "Salary",
    date: new Date("2024-01-15"),
    isRecurring: true,
    recurringMonths: 12,
  },
  {
    id: "2",
    type: "fixed",
    currency: "USD",
    amount: 1200,
    description: "Rent Payment",
    category: "Rent",
    date: new Date("2024-01-01"),
    isRecurring: true,
    recurringMonths: 12,
  },
  {
    id: "3",
    type: "fixed",
    currency: "USD",
    amount: 150,
    description: "Car Insurance",
    category: "Insurance",
    date: new Date("2024-01-05"),
    isRecurring: true,
    recurringMonths: 6,
  },
  {
    id: "4",
    type: "variable",
    currency: "USD",
    amount: 85,
    description: "Grocery Shopping",
    category: "Food",
    date: new Date("2024-01-10"),
  },
  {
    id: "5",
    type: "variable",
    currency: "USD",
    amount: 45,
    description: "Gas Station",
    category: "Transportation",
    date: new Date("2024-01-12"),
  },
  {
    id: "6",
    type: "variable",
    currency: "USD",
    amount: 120,
    description: "Dinner Out",
    category: "Entertainment",
    date: new Date("2024-01-14"),
  },
  // Add some current month transactions for July 2025
  {
    id: "7",
    type: "income",
    currency: "USD",
    amount: 5500,
    description: "Freelance Project",
    category: "Freelance",
    date: new Date("2025-07-01"),
  },
  {
    id: "8",
    type: "fixed",
    currency: "USD",
    amount: 1350,
    description: "Monthly Rent",
    category: "Rent",
    date: new Date("2025-07-01"),
  },
  {
    id: "9",
    type: "variable",
    currency: "USD",
    amount: 250,
    description: "Weekly Groceries",
    category: "Food",
    date: new Date("2025-07-05"),
  },
  {
    id: "10",
    type: "variable",
    currency: "USD",
    amount: 80,
    description: "Coffee Shop",
    category: "Food",
    date: new Date("2025-07-08"),
  },
  {
    id: "11",
    type: "income",
    currency: "USD",
    amount: 6000,
    description: "Monthly Salary",
    category: "Salary",
    date: new Date("2025-07-15"),
  },
  {
    id: "12",
    type: "variable",
    currency: "USD",
    amount: 180,
    description: "Movie Night",
    category: "Entertainment",
    date: new Date("2025-07-20"),
  },
]

export function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}`
}

function occursInMonth(transaction: Transaction, year: number, month: number): boolean {
  const startDate = transaction.startDate ?? transaction.date
  const startYear = startDate.getFullYear()
  const startMonth = startDate.getMonth() + 1
  const monthsDiff = (year - startYear) * 12 + (month - startMonth)

  if (monthsDiff < 0) return false
  if (!transaction.isRecurring && monthsDiff !== 0) return false

  if (transaction.endDate) {
    const endYear = transaction.endDate.getFullYear()
    const endMonth = transaction.endDate.getMonth() + 1
    const diffToEnd = (year - endYear) * 12 + (month - endMonth)
    if (diffToEnd >= 0) return false
  }

  if (transaction.isRecurring) {
    if (transaction.recurringMonths && monthsDiff >= transaction.recurringMonths) return false

    switch (transaction.recurrencePattern) {
      case "semi-annually":
        return monthsDiff % 6 === 0
      case "annually":
        return monthsDiff % 12 === 0
      case "custom":
        return transaction.customMonths?.includes(month) ?? false
      default:
        return true
    }
  }

  return monthsDiff === 0
}

export function getMonthData(month: string): MonthData {
  const [year, monthNum] = month.split("-").map(Number)

  const monthTransactions: Transaction[] = []

  transactions.forEach((transaction) => {
    if (occursInMonth(transaction, year, monthNum)) {
      const dateTemplate = transaction.startDate ?? transaction.date
      const date = new Date(year, monthNum - 1, dateTemplate.getDate())
      monthTransactions.push({ ...transaction, date })
    }
  })

  const totalIncome = monthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + toBase(t.amount, t.currency), 0)

  const totalExpenses = monthTransactions
    .filter((t) => t.type !== "income")
    .reduce((sum, t) => sum + toBase(t.amount, t.currency), 0)

  return {
    month,
    transactions: monthTransactions,
    totalIncome,
    totalExpenses,
    netIncome: totalIncome - totalExpenses,
  }
}

export function addTransaction(transaction: Transaction): void {
  transactions.push(transaction)
}

export function getCardMonthlyExpenses(
  cardId: string,
  date: Date,
  excludeId?: string
): number {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return transactions
    .filter(
      (t) =>
        t.creditCardId === cardId &&
        t.id !== excludeId &&
        t.type !== "income" &&
        occursInMonth(t, year, month) &&
        (t.includeInStatement ?? true)
    )
    .reduce((sum, t) => sum + toBase(t.amount, t.currency), 0)
}

export function willExceedCreditLimit(
  cardId: string,
  amount: number,
  date: Date,
  excludeId?: string
): boolean {
  const card = getCreditCardById(cardId)
  if (!card) return false
  const total = getCardMonthlyExpenses(cardId, date, excludeId)
  return total + amount > card.limit
}

export function updateTransaction(id: string, updated: Partial<Transaction>): void {
  transactions = transactions.map((t) =>
    t.id === id ? { ...t, ...updated } : t
  )
}

export function getTransactionById(id: string): Transaction | undefined {
  return transactions.find((t) => t.id === id)
}

export function deleteTransaction(id: string): void {
  transactions = transactions.filter((t) => t.id !== id)
}

export function getAllTransactions(): Transaction[] {
  return transactions
}
