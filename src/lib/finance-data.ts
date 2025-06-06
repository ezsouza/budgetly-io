import type { Transaction, MonthData } from "./types"

// Mock data storage - in a real app, this would be a database
let transactions: Transaction[] = [
  {
    id: "1",
    type: "income",
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
    amount: 85,
    description: "Grocery Shopping",
    category: "Food",
    date: new Date("2024-01-10"),
  },
  {
    id: "5",
    type: "variable",
    amount: 45,
    description: "Gas Station",
    category: "Transportation",
    date: new Date("2024-01-12"),
  },
  {
    id: "6",
    type: "variable",
    amount: 120,
    description: "Dinner Out",
    category: "Entertainment",
    date: new Date("2024-01-14"),
  },
]

export function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}`
}

export function getMonthData(month: string): MonthData {
  const [year, monthNum] = month.split("-").map(Number)

  const monthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date)
    return transactionDate.getFullYear() === year && transactionDate.getMonth() + 1 === monthNum
  })

  const totalIncome = monthTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = monthTransactions.filter((t) => t.type !== "income").reduce((sum, t) => sum + t.amount, 0)

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

export function deleteTransaction(id: string): void {
  transactions = transactions.filter((t) => t.id !== id)
}

export function getAllTransactions(): Transaction[] {
  return transactions
}
